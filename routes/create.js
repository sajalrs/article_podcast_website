const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/Articles");
const User = require("../models/Users");
const verify = require("../verification/verifyToken");

router.get("/articles", verify, async (req, res) => {
  await User.findById(req.user._id, async (err, user) => {
    if (err) {
      res.send(err);
    } else {
      const article = new Article({
        title: "To be edited",
        author: `${user.firstName} ${user.lastName}`,
        authorId: user._id,
        date: new Date(),
        image:
          "data:image/png;base64,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",
        content: {},
        isApproved: user.isModerator,
      });

      await article.save((err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.json({ data });
        }
      });
    }
  });
});
module.exports = router;
