const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Joi = require("@hapi/joi");
const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {

  const {error} = schema.validate(req.body)
  if(error){
      const toReturn = error.details[0].message.replace('\"name\"', "Name").replace('\"email\"', "Email").replace('\"password\"', "Password")
      return res.status(400).send({error: toReturn})
 }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try{
    const savedUser = await user.save();
    res.send({user: savedUser})
  } catch(err) {
    res.status(400).send(err)
  }
});

module.exports = router;