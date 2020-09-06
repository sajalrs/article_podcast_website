const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  fetch(process.env.YOUTUBE_URL)
    .then(response => response.json())
      .then(data => res.json({"items": data.items}))
     
    
})

module.exports = router;