const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/Articles");
const HomepageLink = require("../models/HomepageLinks");
// const e = require("express");

router.get("/pages", (req, res) => {
  HomepageLink.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json({links: data});
    }
  });
});

router.get("/", (req, res) => {
  const id = req.query.id;
  Article.findById(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});


router.post("/create", (req, res) => {

  const homepageLink = new HomepageLink({
    title: req.title,
    author: req.author,
    date: req.date,
    image: req.image,
    description: req.description,
    to: req.to,
    LinkType: req.LinkType,
  });

  homepageLink.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

router.post("/create/page", (req, res) => {
  const article = new Article({
    title: req.title,
    author: req.author,
    date: req.date,
    image: req.image,
    sections: req.sections,
  });

  article.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});
module.exports = router;
