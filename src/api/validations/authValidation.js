const Joi = require("joi");

const registerSchema = Joi.object({
  fullName: Joi.string().required().messages({
    "string.empty": "Full name is required",
  }),
  userName: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.empty": "Password is required",
    }),
  role: Joi.string()
    .valid("user", "teacher", "admin")
    .default("user")
    .messages({
      "any.only": 'Role must be one of: ["user", "teacher", "admin"]',
    }),
  class: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.empty": "Password is required",
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
};