const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/users.route')
const db = require('./db')


const app = express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());


app.use('/', userRoute)

app.listen(3000, () => {
    console.log("Start")
})
