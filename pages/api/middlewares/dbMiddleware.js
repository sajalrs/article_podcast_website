const mongoose = require("mongoose");
require("dotenv/config");

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) return handler(req, res);
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });
  return handler(req, res);
};

export default connectDb;
