const mongoose = require("mongoose");

const YoutubeLinksSchema = mongoose.Schema({
  title: String,
  id:String,
  date: Object,
});

module.exports = mongoose.model("YoutubeLinks", YoutubeLinksSchema);