const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/users.route')


const app = express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

const MONGO_URI = 'mongodb+srv://root:NHRRa1Z3RcdxNUbV@auth.qld6y.mongodb.net/Users?retryWrites=true&w=majority&appName=Auth';

mongoose.connect(MONGO_URI)


app.use('/', userRoute)

app.listen(3000, () => {
    console.log("Start")
})
