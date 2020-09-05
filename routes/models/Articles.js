const mongoose = require("mongoose");
const { text } = require("body-parser");

const ArticleSchema = mongoose.Schema({
  title: String,
  author: String,
  date: String,
  image: String,
  sections: [Object],
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