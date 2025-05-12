/**
 * Point d'entrée pour les validations
 * Permet d'importer toutes les validations depuis un seul fichier
 */

const userValidation = require("./userValidation")
const assessmentValidation = require("./assessmentValidation")
const questionValidation = require("./questionValidation")
const studentAssessmentValidation = require("./studentAssessmentValidation")
const studentAnswerValidation = require("./studentAnswerValidation")

module.exports = {
  userValidation,
  assessmentValidation,
  questionValidation,
  studentAssessmentValidation,
  studentAnswerValidation,
}
