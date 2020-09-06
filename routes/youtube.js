const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const YoutubeLink = require("../models/YoutubeLinks");
const e = require("express");

router.get("/", (req, res) => {
  YoutubeLink.find({}, (err, data) => {
    if(err){
      res.send(err);
    } else {
      res.send({"items": data});
    }
  } )


  // fetch("https://www.googleapis.com/youtube/v3/search?part=id&channelId=UCV2Y62okiOmoXzYIh_xAcGw&maxResults=10&order=date&key=" + process.env.YOUTUBE_API)
  //   .then(response => response.json())
  //     .then(data => res.json({"items": data.items}))
     
    
})



module.exports = router;