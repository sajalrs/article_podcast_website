import connectDb from "../middlewares/dbMiddleware.js";
const { messageValidation } = require("../validation/validation");
let Message;
try {
  Message = mongoose.model("Messages");
} catch {
  Message = require("../models/Messages");
}

const handler = async (req,res) => {
    const { error } = messageValidation(req.body);
    if (error) {
      const toReturn = error.details[0].message
        .replace('"firstName"', "First Name")
        .replace('"lastName"', "Last Name")
        .replace('"email"', "Email")
        .replace('"subject"', "Subject");
      return res.status(400).send({ error: toReturn });
    }
  
    const message = new Message({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      subject: req.body.subject,
      content: req.body.content,
    });
  
    await message.save((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ data });
      }
    });
}

export default connectDb(handler);