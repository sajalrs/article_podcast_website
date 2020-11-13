import connectDb from "../middlewares/dbMiddleware.js";
const sgMail = require("@sendgrid/mail");
require("dotenv/config");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User;
try {
  User = mongoose.model("Users");
} catch {
  User = require("../models/Users");
}

const handler = async (req, res) => {
    await User.findById(req.body.id, async (err, user) => {
        if (err) {
          res.send(err);
        } else {
          const secret = `${user.password}-${user.updatedAt}`;
    
          try {
            const verified = jwt.verify(req.body.token, secret);
            if (verified) {
              const salt = await bcrypt.genSalt(10);
              const hashPassword = await bcrypt.hash(req.body.password, salt);
              user.password = hashPassword;
              await user.save((error, data) => {
                if (error) {
                  res.send(error);
                } else {
                  res.json(data);
                }
              });
            }
          } catch (err) {
            res.status(400).send({ error: "Invalid Token" });
          }
        }
      });
};

export default connectDb(handler);
