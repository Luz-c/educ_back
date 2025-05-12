/**
 * Schémas de validation pour le modèle StudentAnswer
 */
const Joi = require("joi")

// Schéma pour la sauvegarde d'une réponse d'étudiant
const saveStudentAnswerSchema = Joi.object({
  studentAssessmentId: Joi.string().required().messages({
    "string.empty": "Student assessment ID is required",
  }),
  questionId: Joi.string().required().messages({
    "string.empty": "Question ID is required",
  }),
  answer: Joi.string().allow(null, ""),
  answerOption: Joi.string().allow(null, ""),
  isCorrect: Joi.boolean(),
  score: Joi.number().min(0),
  maxScore: Joi.number().min(0),
  feedback: Joi.string().allow(null, ""),
})

// Schéma pour la notation manuelle d'une réponse d'étudiant
const gradeStudentAnswerSchema = Joi.object({
  score: Joi.number().min(0).required().messages({
    "number.base": "Score must be a number",
    "number.min": "Score must be at least 0",
    "any.required": "Score is required",
  }),
  feedback: Joi.string().allow(null, ""),
})

module.exports = {
  saveStudentAnswerSchema,
  gradeStudentAnswerSchema,
}
