const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const moment = require('moment')
const User = require('./models/user.module.js')
const {hash} = require("bcrypt");
const {response} = require("express");
const salt = 10


const app = express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

mongoose.connect('mongodb+srv://root:NHRRa1Z3RcdxNUbV@auth.qld6y.mongodb.net/Users?retryWrites=true&w=majority&appName=Auth')
    .then(() => console.log('Connected!'))
    .catch(() => {
        console.log("Connection failed")
    })
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Error: 'You are not authenticated'})
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json({Error: 'Token is not matched'})
            } else {
                req.name = decoded.name
                next()
            }
        })
    }
}
app.get('/', verifyUser, (req, res) => {
    return res.json({Status: 'Success', name: req.name})
})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: 'Success'})
})
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                last_login: moment().format('YYYY-MM-DDTHH:MM:SS'),
                disable: false

            }
        )
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne(
            {
                email: req.body.email,
            }
        )
        if (user && !user.disable) {
            bcrypt.compare(req.body.password.toString(), user.password, async (err, response) => {
                if (err) return res.json({Error: "Password compare error"})
                if (response) {
                    const updateUser = await User.findByIdAndUpdate(user.id, {last_login: moment().format('YYYY-MM-DDTHH:MM:SS')}, {new: true})
                    const name = user.name
                    const token = jwt.sign({name}, 'jwt-secret-key', {expiresIn: '1d'})
                    res.cookie('token', token)
                    return res.json({Status: "Success", user: updateUser})
                } else {
                    return res.json({Error: 'Password not matched'})
                }
            })
        }else if(user.disable){
            return res.json({Error: 'Your user disable'})
        }else {
            return res.json({Error: 'Auth error'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(8082, () => {
    console.log("Start")
})
