const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {unique: true}
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
        type: Boolean,
    }
}).set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});
const User = mongoose.model("User", UserSchema);

module.exports = User