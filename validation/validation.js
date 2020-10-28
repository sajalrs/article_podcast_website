const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(6).required(),
    lastName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const messageValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(6).required(),
    lastName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    subject: Joi.string().min(6).required(),
    content: Joi.required()
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.messageValidation = messageValidation;
