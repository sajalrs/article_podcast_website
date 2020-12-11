import connectDb from "../middlewares/dbMiddleware.js";
import verify from "../verification/verifyToken.js";
const mongoose = require("mongoose");
require("dotenv/config");
let User;
try {
  User = mongoose.model("Users");
} catch {
  User = require("../models/Users");
}

const handler = async (req, res) => {
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
};

export default verify(connectDb(handler));