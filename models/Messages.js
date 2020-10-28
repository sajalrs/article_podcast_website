const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    content: Object,
},
{ timestamps: true })

module.exports = mongoose.model("Messages", MessageSchema)