const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const verify = require("../verification/verifyToken");
const nodemailer = require("nodemailer");
require("dotenv/config");
const {
  registerValidation,
  loginValidation,
  resetPasswordValidation,
} = require("../validation/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

router.post("/register", async (req, res) => {
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

router.post("/forgotpassword", async (req, res) => {
  const { error } = resetPasswordValidation(req.body);
  if (error) {
    const toReturn = error.details[0].message.replace('"email"', "Email");
    return res.status(400).send({ error: toReturn });
  }

  await User.findOne({ email: req.body.email }, async (err, user) => {
    if (err || !user) {
      if (err) {
        res.send(err);
      } else if (!user) {
        res
          .status(400)
          .send({ error: "Cannot find account matching given email" });
      }
    } else {
      const secret = `${user.password}-${user.updatedAt}`;
      const token = jwt.sign({ id: user._id, email: user.email }, secret);
      const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3'
        },
        requireTLS: true,
      });

      const passwordResetLink = (process.env.NODE_ENV === "production") ? `localhost:3000/resetpassword/${user._id}/${token}`: `thefalseninepodcast.com/resetpassword/${user._id}/${token}`;  
      

      const mailOptions = {
        from: `The False 9 Podcast <${process.env.EMAIL}>`,
        to: user.email,
        subject: "Password Reset Link",
        text: `Password Reset Link: ${passwordResetLink}`,
      };


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).send({ error: error });
        } else {
          console.log("Email sent: " + info.response);
          res.json({ message: "Mail sent" });
        }
      });

      // console.log(jwt.verify(token, secret));
    }
  });
});

router.post('/resetpassword', async (req, res) => {
  await User.findById(req.body.id, async (err, user) => {
    if(err){
      res.send(err);
    } else {
      console.log(user);
    }
  })
})

router.post("/subscribe", verify, async (req, res) => {
  await User.findById(req.user._id, async (err, user) => {
    if (err) {
      res.send(err);
    } else {
      user.isSubscribed = req.body.isSubscribed;
      await user.save((error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.json(data);
        }
      });
    }
  });
});

router.get("/isloggedin", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isModerator: user.isModerator,
        isSubscribed: user.isSubscribed,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/logout", verify, (req, res) => {
  try {
    res
      .cookie("token", { httpOnly: true, expires: Date.now() })
      .json({ token: token });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
