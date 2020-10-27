const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  author: String,
  authorID: String,
  content: Object
}, {timestamps: true})


const ArticleSchema = mongoose.Schema({
  title: String,
  author: String,
  date: Object,
  image: String,
  content: Object,
  comments: [CommentSchema]
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