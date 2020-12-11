import connectDb from "../middlewares/dbMiddleware.js";
const mongoose = require("mongoose");
let Message;
try {
  Message = mongoose.model("Messages");
} catch {
  Message = require("../models/Messages");
}

const handler = async (req, res) => {
    const id = req.query.id;
    await Message.findById(id, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
};

export default connectDb(handler);