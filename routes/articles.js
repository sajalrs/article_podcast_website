const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require('./models/Articles');
const e = require("express");




router.get("/", (req, res) => {
  
    const id = "5f5321393726097c854fe9c1"
    Article.findById(id, (err, data) => {
      if(err){
        res.send(err);
      } else {
        res.json(data);
      }
      
    })
});

router.get("/create", (req,res) => {
    console.log(req.body);
    const article = new Article({
        title: req.title,
        author: req.author,
        date: req.date,
        image: req.image,
        sections: req.sections
    });

    article.save((err, data) => {
      if(err){
        res.send(err);
      } else {
        res.json(data);
      }
    })
    
});
module.exports = router;
