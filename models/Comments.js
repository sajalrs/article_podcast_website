const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    authorID: String,
    content: Object,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comments", CommentSchema);

exports.CommentSchema = CommentSchema;
exports.Comment = Comment;
