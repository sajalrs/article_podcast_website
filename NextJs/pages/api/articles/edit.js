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

const handler = async (req, res) => {
    const user = await User.findById(req.user._id);
    await Article.findById(req.body.id, async (err, article) => {
      if (err) {
        res.send(err);
      } else {
        if(!user || (!user.isModerator && !user._id.equals(article.authorId))){
          res
          .status(401)
          .send({ error: "User not authorized to edit file" });
        } else {
          article.title = req.body.title;
          article.author = req.body.author;
          article.date = req.body.date;
          article.image = req.body.image;
          article.content = req.body.content;
          article.isApproved = user.isModerator;
          await article.save((error, data) => {
            if (error) {
              res.send(error);
            } else {
              res.json(data);
            }
          });
        }
      
      }
    });
};

export default verify(connectDb(handler));
