import connectDb from "../middlewares/dbMiddleware.js";
import verify from "../verification/verifyToken.js";
const mongoose = require("mongoose");
require("dotenv/config");
const { registerValidation } = require("../validation/validation");
const bcrypt = require("bcryptjs");
let User;
try {
  User = mongoose.model("Users");
} catch {
  User = require("../models/Users");
}

const handler = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    const toReturn = error.details[0].message
      .replace('"firstName"', "First Name")
      .replace('"lastName"', "Last Name")
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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    isModerator: false,
    isSubscribed: req.body.isSubscribed || false,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

export default connectDb(handler);
