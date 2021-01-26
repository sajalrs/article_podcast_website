import connectDb from "../middlewares/dbMiddleware.js";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {
  resetPasswordValidation
} = require("../validation/validation");

let User;
try {
  User = mongoose.model("Users");
} catch {
  User = require("../models/Users");
}

const handler = async (req, res) => {
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
        const passwordResetLink =
          process.env.NODE_ENV === "production"
            ? `www.thefalseninepodcast.com/resetpassword?id=${user._id}&token=${token}`
            : `localhost:3000/resetpassword?id=${user._id}&token=${token}`;
  
        const msg = {
          from: `The False 9 Podcast <${process.env.EMAIL}>`,
          to: user.email,
          subject: "Password Reset Link",
          text: `Password Reset Link: ${passwordResetLink}`,
        };
  
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
            res.json({ message: "Mail sent" });
          })
          .catch((error) => {
            console.error(error);
            res.status(400).send({ error: error });
          });
      }
    });
};

export default connectDb(handler);
