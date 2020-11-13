const express = require("express");
const router = express.Router();
const Message = require("../client/pages/api/models/Messages");
const { messageValidation } = require("../validation/validation");

router.get("/pages", async (req, res) => {
  const query = Article.find({})
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
  const { error } = messageValidation(req.body);
  if (error) {
    const toReturn = error.details[0].message
      .replace('"firstName"', "First Name")
      .replace('"lastName"', "Last Name")
      .replace('"email"', "Email")
      .replace('"subject"', "Subject");
    return res.status(400).send({ error: toReturn });
  }

  const message = new Message({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    content: req.body.content,
  });

  await message.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ data });
    }
  });
});

module.exports = router;
