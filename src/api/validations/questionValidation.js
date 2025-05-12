/**
 * Schémas de validation pour le modèle Question
 */
const Joi = require("joi")
const { QuestionType } = require("../models/constants/enums")

// Schéma pour les options des questions QCM
const questionOptionSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "Option ID is required",
  }),
  text: Joi.string().required().messages({
    "string.empty": "Option text is required",
  }),
  correct: Joi.boolean().required().messages({
    "any.required": "Option correct status is required",
  }),
})

// Schéma pour la création d'une question
const createQuestionSchema = Joi.object({
  assessmentId: Joi.string().required().messages({
    "string.empty": "Assessment ID is required",
  }),
  type: Joi.string()
    .valid(...Object.values(QuestionType))
    .required()
    .messages({
      "string.empty": "Question type is required",
      "any.only": `Question type must be one of: ${Object.values(QuestionType).join(", ")}`,
    }),
  content: Joi.string().required().messages({
    "string.empty": "Question content is required",
  }),
  points: Joi.number().integer().min(1).required().messages({
    "number.base": "Points must be a number",
    "number.integer": "Points must be an integer",
    "number.min": "Points must be at least 1",
    "any.required": "Points are required",
  }),
  options: Joi.when("type", {
    is: QuestionType.QCM,
    then: Joi.array().items(questionOptionSchema).min(2).required().messages({
      "array.min": "At least 2 options are required for QCM questions",
      "any.required": "Options are required for QCM questions",
    }),
    otherwise: Joi.array().items(questionOptionSchema).optional(),
  }),
  correctAnswer: Joi.when("type", {
    is: QuestionType.NUMERIC,
    then: Joi.string().required().messages({
      "string.empty": "Correct answer is required for numeric questions",
    }),
    otherwise: Joi.string().optional(),
  }),
  minWordCount: Joi.when("type", {
    is: QuestionType.ESSAY,
    then: Joi.number().integer().min(0).optional(),
    otherwise: Joi.number().optional(),
  }),
  orderIndex: Joi.number().integer().min(0).required().messages({
    "number.base": "Order index must be a number",
    "number.integer": "Order index must be an integer",
    "number.min": "Order index must be at least 0",
    "any.required": "Order index is required",
  }),
})

// Schéma pour la mise à jour d'une question
const updateQuestionSchema = Joi.object({
  assessmentId: Joi.string(),
  type: Joi.string()
    .valid(...Object.values(QuestionType))
    .messages({
      "any.only": `Question type must be one of: ${Object.values(QuestionType).join(", ")}`,
    }),
  content: Joi.string(),
  points: Joi.number().integer().min(1).messages({
    "number.base": "Points must be a number",
    "number.integer": "Points must be an integer",
    "number.min": "Points must be at least 1",
  }),
  options: Joi.array().items(questionOptionSchema).min(2).messages({
    "array.min": "At least 2 options are required for QCM questions",
  }),
  correctAnswer: Joi.string(),
  minWordCount: Joi.number().integer().min(0),
  orderIndex: Joi.number().integer().min(0).messages({
    "number.base": "Order index must be a number",
    "number.integer": "Order index must be an integer",
    "number.min": "Order index must be at least 0",
  }),
})

// Schéma pour la réorganisation des questions
const reorderQuestionsSchema = Joi.object({
  questionOrders: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        orderIndex: Joi.number().integer().min(0).required(),
      }),
    )
    .required()
    .messages({
      "array.base": "Question orders must be an array",
      "any.required": "Question orders are required",
    }),
})

module.exports = {
  createQuestionSchema,
  updateQuestionSchema,
  reorderQuestionsSchema,
}
