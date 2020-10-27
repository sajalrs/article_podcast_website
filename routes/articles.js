const express = require("express");
const router = express.Router();
const Article = require("../models/Articles");
const User = require("../models/Users");
const { Comment } = require("../models/Comments");
const verify = require("../verification/verifyToken");

router.get("/pages", async (req, res) => {
  const query = Article.find({})
    .select("_id title author date image")
    .sort("-date");
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
  await Article.findById(req.body.articleId, async (err, article) => {
    if (err) {
      res.send(err);
    } else {
      article.title = req.body.title;
      article.author = req.body.author;
      article.date = req.body.date;
      article.image = req.body.image;
      article.content = req.body.content;

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
            author: user.name,
            content: req.body.content,
          });

          article.comments.push(comment);

          await article.save((errors, data) => {
            if (errors) {
              res.send(errors);
            } else {
              res.json(data);

              try {
                const io = req.app.get("socketio");
                io.emit("comments changed");
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
