const mongoose = require("mongoose");

const HomepageLinksSchema = mongoose.Schema({
  title: String,
  author: String,
  date: String,
  image: String,
  description: String,
  to: String,
  LinkType: {type: Number, enum: [1, 2, 3, 4], default: 1}
});

module.exports = mongoose.model("HomepageLinks", HomepageLinksSchema);