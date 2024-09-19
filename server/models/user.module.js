const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    last_login: {
        type: String,
        required: true
    },
    disable: {
        type: String,
        required: true
    }
})
const User = mongoose.model("User", UserSchema);

module.exports = User