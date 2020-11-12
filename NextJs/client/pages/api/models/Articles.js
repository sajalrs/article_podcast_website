const mongoose = require("mongoose");
const {CommentSchema} = require("./Comments") 


const ArticleSchema = mongoose.Schema({
  title: String,
  author: String,
  authorId: String,
  date: Object,
  image: String,
  content: Object,
  isApproved: Boolean,
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