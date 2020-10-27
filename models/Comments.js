const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema{
    author: String,
    authorID: String,
    content: Object
}, {timestamps = true}

module.exports = mongoose.model("Comments", CommentSchema);