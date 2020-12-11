import connectDb from "../middlewares/dbMiddleware.js";
import { serialize } from "cookie";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../validation/validation");

let User;
try {
  User = mongoose.model("Users");
} catch {
  User = require("../models/Users");
}

const handler = async (req, res) => {
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

  const token = jwt.sign(
    { _id: user._id, tokenCreated: new Date() },
    process.env.TOKEN_SECRET
  );
  // res.header('Auth-Token', token).send({token: token})
  //   res.cookie("token", token, { httpOnly: true }).json({ token: token });

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, { path: "/" }, { httpOnly: true })
  );

  res.json({token: token});

  // res.send({ token: token });
};

export default connectDb(handler);
