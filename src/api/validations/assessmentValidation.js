/**
 * Schémas de validation pour le modèle Assessment
 */
const Joi = require("joi")
const { AssessmentStatus } = require("../models/constants/enums")

// Schéma pour la création d'une évaluation
const createAssessmentSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().allow(null, ""),
  teacherId: Joi.string().required().messages({
    "string.empty": "Teacher ID is required",
  }),
  class: Joi.string().required().messages({
    "string.empty": "Class is required",
  }),
  type: Joi.string().required().messages({
    "string.empty": "Type is required",
  }),
  duration: Joi.number().integer().min(1).required().messages({
    "number.base": "Duration must be a number",
    "number.integer": "Duration must be an integer",
    "number.min": "Duration must be at least 1 minute",
    "any.required": "Duration is required",
  }),
  date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid date",
    "date.format": "Date must be in ISO format",
    "any.required": "Date is required",
  }),
  status: Joi.string()
    .valid(...Object.values(AssessmentStatus))
    .default(AssessmentStatus.DRAFT)
    .messages({
      "any.only": `Status must be one of: ${Object.values(AssessmentStatus).join(", ")}`,
    }),
  blockCopyPaste: Joi.boolean().default(true),
  autoFinish: Joi.boolean().default(true),
  shuffleQuestions: Joi.boolean().default(false),
  ipRestriction: Joi.boolean().default(false),
})

// Schéma pour la mise à jour d'une évaluation
const updateAssessmentSchema = Joi.object({
  title: Joi.string().messages({
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().allow(null, ""),
  teacherId: Joi.string(),
  class: Joi.string(),
  type: Joi.string(),
  duration: Joi.number().integer().min(1).messages({
    "number.base": "Duration must be a number",
    "number.integer": "Duration must be an integer",
    "number.min": "Duration must be at least 1 minute",
  }),
  date: Joi.date().iso().messages({
    "date.base": "Date must be a valid date",
    "date.format": "Date must be in ISO format",
  }),
  status: Joi.string()
    .valid(...Object.values(AssessmentStatus))
    .messages({
      "any.only": `Status must be one of: ${Object.values(AssessmentStatus).join(", ")}`,
    }),
  blockCopyPaste: Joi.boolean(),
  autoFinish: Joi.boolean(),
  shuffleQuestions: Joi.boolean(),
  ipRestriction: Joi.boolean(),
})

// Schéma pour la mise à jour du statut d'une évaluation
const updateAssessmentStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(AssessmentStatus))
    .required()
    .messages({
      "string.empty": "Status is required",
      "any.only": `Status must be one of: ${Object.values(AssessmentStatus).join(", ")}`,
      "any.required": "Status is required",
    }),
})

module.exports = {
  createAssessmentSchema,
  updateAssessmentSchema,
  updateAssessmentStatusSchema,
}
