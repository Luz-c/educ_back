/**
 * Schémas de validation pour le modèle User
 */
const Joi = require("joi")
const { UserRole } = require("../models/constants/enums")

// Schéma pour la création d'un utilisateur
const createUserSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .required()
    .messages({
      "string.empty": "Role is required",
      "any.only": `Role must be one of: ${Object.values(UserRole).join(", ")}`,
    }),
  class: Joi.string().allow(null, ""),
})

// Schéma pour la mise à jour d'un utilisateur
const updateUserSchema = Joi.object({
  username: Joi.string().messages({
    "string.empty": "Username cannot be empty",
  }),
  password: Joi.string().min(6).messages({
    "string.min": "Password must be at least 6 characters long",
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email",
  }),
  name: Joi.string(),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .messages({
      "any.only": `Role must be one of: ${Object.values(UserRole).join(", ")}`,
    }),
  class: Joi.string().allow(null, ""),
})

// Schéma pour la connexion d'un utilisateur
const loginUserSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
})

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
}
