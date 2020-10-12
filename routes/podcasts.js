const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fetch = require("node-fetch");
var parser = require("xml2json");

router.get("/", async (req, res) => {
  await fetch(`https://anchor.fm/s/333e122c/podcast/rss`)
    .then((response) => response.text())
    .then((data) => {
        let json = JSON.parse(parser.toJson(data, {reversible: false}));
        // res.json(json.rss.channel.item);

        const toReturn = json.rss.channel.item.map((element) => {const text = element["description"].replace(/<[^>]+>/g, '').replace(/&nbsp;/, ''); return {
          "title": element["title"],
          "by": element["dc:creator"],
          "link": element["enclosure"]["url"],
          "date": element["pubDate"],
          "image": element["itunes:image"]["href"],
          "description": text.substring(0, text.indexOf("---"))
        }
        })
        
        res.json({items: toReturn});
      });
});

module.exports = router;
