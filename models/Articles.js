const mongoose = require("mongoose");
const Comment = require("./Comments")

const ArticleSchema = mongoose.Schema({
  title: String,
  author: String,
  date: Object,
  image: String,
  content: Object,
  comments: [Comment]
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