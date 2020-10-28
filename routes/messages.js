const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");

router.get("/pages", async (req, res) => {
  const query = Article.find({})
    .select("_id name email subject createdAt updatedAt")
    .sort("-createdAt");
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
  await Message.findById(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

router.post("/create", async (req, res) => {
    const message = new Message({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        content: req.body.content,
      });
    
     await message.save((err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.json({data});
        }
      });
});


module.exports = router;
