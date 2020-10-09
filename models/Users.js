const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model("Users", UsersSchema)