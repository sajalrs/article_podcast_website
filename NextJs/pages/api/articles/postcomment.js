import connectDb from "../middlewares/dbMiddleware.js";
import verify from "../verification/verifyToken.js";
const mongoose = require("mongoose");

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

let Comment;
try {
  Comment = mongoose.model("Comments");
} catch {
  Comment = require("../models/Comments");
}

const handler = async (req, res) => {
    await Article.findById(req.body.id, async (err, article) => {
        if (err) {
          res.send(err);
        } else {
          await User.findById(req.user._id, async (error, user) => {
            if (error) {
              res.send(error);
            } else {
              const comment = new Comment({
                authorID: req.user._id,
                author: `${user.firstName} ${user.lastName}`,
                content: req.body.content,
              });
    
              article.comments.unshift(comment);
    
              await article.save((errors, data) => {
                if (errors) {
                  res.send(errors);
                } else {
                  res.json(data);
    
                  try {
                    const io = req.app.get("socket-io");
                    io.emit("comments changed", { articleId: req.body.id });
                  } catch (err) {
                    console.log(err);
                  }
                }
              });
            }
          });
        }
      });
};

export default verify(connectDb(handler));
