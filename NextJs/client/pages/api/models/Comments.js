const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {  
    authorID: String,
    author: String,
    content: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentSchema);

// exports.CommentSchema = CommentSchema;
// exports.Comment = Comment;
