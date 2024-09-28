const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/users.route')
const {verifyUser} = require("./contollers/user.controller");


const app = express()
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ["https://auth-front-wheat.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

const MONGO_URI = 'mongodb+srv://root:NHRRa1Z3RcdxNUbV@auth.qld6y.mongodb.net/Users?retryWrites=true&w=majority&appName=Auth';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
app.use('/', userRoute)

app.listen(3000, () => {
    console.log("Start")
})
