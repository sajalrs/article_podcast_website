const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { registerValidation } = require("../validation/validation");
const bcrypt = require('bcryptjs');

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    const toReturn = error.details[0].message
      .replace('"name"', "Name")
      .replace('"email"', "Email")
      .replace('"password"', "Password");
    return res.status(400).send({ error: toReturn });
  }

  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists)
    return res.status(400).send({ error: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    res.send({ user: savedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
