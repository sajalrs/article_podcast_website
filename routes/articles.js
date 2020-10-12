const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/Articles");
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
  await Article.findById(req.body.id, async (err, article) => {
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

module.exports = router;
