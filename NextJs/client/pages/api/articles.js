import connectDb from "../middlewares/dbMiddleware.js";
const Article = require("../models/Articles");

const handler = async (req, res) => {
  const id = req.query.id;
  await Article.findById(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

export default connectDb(handler);
