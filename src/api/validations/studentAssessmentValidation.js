/**
 * Schémas de validation pour le modèle StudentAssessment
 */
const Joi = require("joi")

// Schéma pour la création d'une assignation d'évaluation
const createStudentAssessmentSchema = Joi.object({
  studentId: Joi.string().required().messages({
    "string.empty": "Student ID is required",
  }),
  assessmentId: Joi.string().required().messages({
    "string.empty": "Assessment ID is required",
  }),
  uniqueId: Joi.string(),
  maxScore: Joi.number().integer().min(0).required().messages({
    "number.base": "Max score must be a number",
    "number.integer": "Max score must be an integer",
    "number.min": "Max score must be at least 0",
    "any.required": "Max score is required",
  }),
})

// Schéma pour la mise à jour d'une assignation d'évaluation
const updateStudentAssessmentSchema = Joi.object({
  studentId: Joi.string(),
  assessmentId: Joi.string(),
  uniqueId: Joi.string(),
  status: Joi.string().valid("not_started", "in_progress", "completed").messages({
    "any.only": "Status must be one of: not_started, in_progress, completed",
  }),
  startTime: Joi.date().iso().messages({
    "date.base": "Start time must be a valid date",
    "date.format": "Start time must be in ISO format",
  }),
  endTime: Joi.date().iso().messages({
    "date.base": "End time must be a valid date",
    "date.format": "End time must be in ISO format",
  }),
  timeSpent: Joi.number().integer().min(0).messages({
    "number.base": "Time spent must be a number",
    "number.integer": "Time spent must be an integer",
    "number.min": "Time spent must be at least 0",
  }),
  score: Joi.number().min(0).messages({
    "number.base": "Score must be a number",
    "number.min": "Score must be at least 0",
  }),
  maxScore: Joi.number().integer().min(0).messages({
    "number.base": "Max score must be a number",
    "number.integer": "Max score must be an integer",
    "number.min": "Max score must be at least 0",
  }),
})

// Schéma pour la complétion d'une assignation d'évaluation
const completeStudentAssessmentSchema = Joi.object({
  score: Joi.number().min(0).required().messages({
    "number.base": "Score must be a number",
    "number.min": "Score must be at least 0",
    "any.required": "Score is required",
  }),
})

module.exports = {
  createStudentAssessmentSchema,
  updateStudentAssessmentSchema,
  completeStudentAssessmentSchema,
}
