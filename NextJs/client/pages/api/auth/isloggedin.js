import connectDb from "../middlewares/dbMiddleware.js";
import verify from "../verification/verifyToken.js";
const mongoose = require("mongoose");

let User;
try {
  User = mongoose.model("Users");
} catch {
  User = require("../models/Users");
}

const handler = async (req, res) => {
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
          tokenCreated: req.user.tokenCreated,
        },
      });
    } catch (err) {
      res.send(err);
    }
  };

  export default verify(connectDb(handler));