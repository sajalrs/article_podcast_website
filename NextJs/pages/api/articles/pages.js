import connectDb from "../middlewares/dbMiddleware.js";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let Article;
try {
  Article = mongoose.model("Articles");
} catch {
  Article = require("../models/Articles");
}

let User;
try {
  User = mongoose.model("Users");
} catch {
  User = require("../models/Users");
}

// const { Comment } = require("../models/Comments");
// const verify = require("../verification/verifyToken");

const handler = async (req, res) => {
  let user;
  const token = req.cookies.token;
  if (token) {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      user = await User.findById(verified._id);
    } catch (err) {
      console.log(err);
    }
  }

  let query;
  if (user) {
    if (user.isModerator) {
      query = Article.find({})
        .select("_id title author date image authorId isApproved")
        .sort("-date");
    } else {
      query = Article.find({
        $or: [{ isApproved: true }, { authorId: user._id }],
      })
        .select("_id title author date image authorId isApproved")
        .sort("-date");
    }
  } else {
    query = Article.find({})
      .where("isApproved")
      .equals(true)
      .select("_id title author date image authorId isApproved")
      .sort("-date");
  }

  await query.exec((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ links: data });
    }
  });
};
export default connectDb(handler);
