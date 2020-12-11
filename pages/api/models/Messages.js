const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    subject: String,
    content: Object,
},
{ timestamps: true })

module.exports = mongoose.model("Messages", MessageSchema)