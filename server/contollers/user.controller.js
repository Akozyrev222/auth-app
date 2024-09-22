const bcrypt = require("bcrypt");
const User = require("../models/user.module");
const jwt = require("jsonwebtoken");
const moment = require("moment")

const salt = 10
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const createUser = async (req, res) => {
    try {
        if (!req.body.password) {
            res.json({Error: "Password can't be empty"})
        } else {
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
            console.log(user)
            res.json({Status: "Success", user})
        }
    } catch (error) {
        if (error.code === 11000) {
            res.json({Error: 'User with this email already exist'})
        } else {
            res.json({Error: error.message})
        }
    }
}
const authUser = async (req, res) => {
    try {
        const user = await User.findOne(
            {
                email: req.body.email,
            }
        )
        if (!user) {
            return res.json({Error: 'No such user'})
        } else if (user && !user.disable) {
            bcrypt.compare(req.body.password.toString(), user.password, async (err, response) => {
                if (err) return res.json({Error: "Password compare error"})
                if (response) {
                    const currentDate = new Date()
                    const updateUser = await User.findByIdAndUpdate(user.id, {
                        last_login: currentDate.toISOString()
                    }, {new: true})
                    const name = user.name
                    const token = await jwt.sign({name}, 'jwt-secret-key', {expiresIn: '1d'})
                    res.cookie('token', token)
                    return res.json({Status: "Success", user: updateUser, token: token})
                } else {
                    return res.json({Error: 'Password not matched'})
                }
            })
        } else if (user.disable) {
            return res.json({Error: 'Your user disable'})
        } else {
            return res.json({Error: 'Auth error'})
        }
    } catch (error) {
        res.json({Error: error.message})
    }
}
const blockUsers = async (req, res) => {
    try {
        const usersId = req.body
        const updatedUsers = await User.updateMany({
                _id:
                    {
                        $in:
                        usersId
                    }
            },
            {
                $set: {disable: true}

            },{new: true})
        console.log(updatedUsers)
        if (updatedUsers) {
            return res.json({Status: "Success", user: updatedUsers})
        } else {
            return res.json({Error: 'Users not updated'})
        }
    } catch (error) {
        return res.json({Error: error.message})
    }
}
const unblockUsers = async (req, res) => {
    try {
        const usersId = req.body
        const updatedUsers = await User.updateMany({
                _id:
                    {
                        $in:
                        usersId
                    }
            },
            {
                $set: {disable: false}

            },{new: true})
        if (updatedUsers) {
            return res.json({Status: "Success", user: updatedUsers})
        } else {
            return res.json({Error: 'Users not updated'})
        }
    } catch (error) {
        return res.json({Error: error.message})
    }
}
const deleteUsers = async (req, res) => {
    try {
        const usersId = req.body
        const updatedUsers = await User.deleteMany({
                _id:
                    {
                        $in:
                        usersId
                    }
            },{new: true})
        if (updatedUsers) {
            return res.json({Status: "Success", user: updatedUsers})
        } else {
            return res.json({Error: 'Users not updated'})
        }
    } catch (error) {
        return res.json({Error: error.message})
    }
}
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
module.exports = {
    authUser,
    getUsers,
    createUser,
    blockUsers,
    unblockUsers,
    deleteUsers,
    verifyUser
}