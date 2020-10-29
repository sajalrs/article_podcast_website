const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    isSubscribed: Boolean,
    isModerator: Boolean,
    password: String
}, {timestamps: true})

module.exports = mongoose.model("Users", UserSchema)