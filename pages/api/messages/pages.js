import connectDb from "../middlewares/dbMiddleware.js";
const mongoose = require("mongoose");
let Message;
try {
  Message = mongoose.model("Messages");
} catch {
  Message = require("../models/Messages");
}

const handler = async (req, res) => {
  const query = Message.find({})
    .sort("-createdAt");
  await query.exec((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ links: data });
    }
  });
};

export default connectDb(handler);