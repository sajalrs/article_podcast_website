const mongoose = require("mongoose");
// require("../models/Comments");
// const {CommentSchema} = require("./Comments")
// const CommentSchema = require("./Comments").schema
let CommentSchema
try{
  CommentSchema = mongoose.model("Comments").schema;
} catch{ 
  CommentSchema = require("../models/Comments").schema;
}



const ArticleSchema = mongoose.Schema({
  title: String,
  author: String,
  authorId: String,
  date: Object,
  image: String,
  content: Object,
  isApproved: Boolean,
  comments: [CommentSchema],
});

module.exports = mongoose.model("Articles", ArticleSchema);
// {
//   anyOf: [
//     {
//       paragraph: {
//         text: String,
//       },
//     },
//     {
//       subheading: String,
//     },
//     {
//       image: {
//         src: String,
//         caption: String
//       }
//     }
//   ],
// },
