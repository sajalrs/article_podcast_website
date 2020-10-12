const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const verify = require("../verification/verifyToken");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

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
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    const toReturn = error.details[0].message
      .replace('"email"', "Email")
      .replace('"password"', "Password");
    return res.status(400).send({ error: toReturn });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res
      .status(400)
      .send({ error: "The email or password is incorrect" });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .send({ error: "The email or password is incorrect" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  // res.header('Auth-Token', token).send({token: token})
  res.cookie("token", token, { httpOnly: true }).json({ token: token });
  // res.send({ token: token });
});

router.post("/isloggedin", verify, (req, res) => {
  try {
    res.json(res.user._id);
  } catch(err){
    res.send(err)
  }
});

module.exports = router;
