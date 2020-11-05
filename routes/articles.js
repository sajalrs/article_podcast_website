const express = require("express");
const router = express.Router();
const Article = require("../models/Articles");
const User = require("../models/Users");
const { Comment } = require("../models/Comments");
const verify = require("../verification/verifyToken");
const jwt = require("jsonwebtoken");

router.get("/pages", async (req, res) => {
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
        .select("_id title author date image")
        .sort("-date");
    } else{
      query = Article.find({})
      .where("isApproved")
      .equals(true)
      .select("_id title author date image")
      .sort("-date");
    }
  } else {
    query = Article.find({})
      .where("isApproved")
      .equals(true)
      .select("_id title author date image")
      .sort("-date");
  }

  await query.exec((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ links: data });
    }
  });
});

router.get("/", async (req, res) => {
  const id = req.query.id;
  await Article.findById(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

router.post("/edit", verify, async (req, res) => {
  await Article.findById(req.body.id, async (err, article) => {
    if (err) {
      res.send(err);
    } else {
      article.title = req.body.title;
      article.author = req.body.author;
      article.date = req.body.date;
      article.image = req.body.image;
      article.content = req.body.content;
      article.isApproved = false;
      await article.save((error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.json(data);
        }
      });
    }
  });
});

router.post("/postcomment", verify, async (req, res) => {
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
                const io = req.app.get("socketio");
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
});

module.exports = router;
