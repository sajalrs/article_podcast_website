import mongoose from "mongoose";
require("dotenv/config");

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) return handler(req, res);
  // Using new database connection
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  return handler(req, res);
};

export default connectDb;
