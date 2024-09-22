const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://root:NHRRa1Z3RcdxNUbV@auth.qld6y.mongodb.net/Users?retryWrites=true&w=majority&appName=Auth';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });