const mongoose = require("mongoose");
let YoutubeLink;
try {
  YoutubeLink = mongoose.model("YoutubeLinks");
} catch {
  YoutubeLink = require("../models/YoutubeLinks");
}

export const resolvers = {
  Query: {
    youtubeLinks: () => YoutubeLink.find({}).sort("-date"),
  },
};
