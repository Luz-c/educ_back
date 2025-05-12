/**
 * Point d'entrée pour les services
 * Permet d'importer tous les services depuis un seul fichier
 */

const userService = require("./userService")
const assessmentService = require("./assessmentService")
const questionService = require("./questionService")
const studentAssessmentService = require("./studentAssessmentService")
const studentAnswerService = require("./studentAnswerService")

module.exports = {
  userService,
  assessmentService,
  questionService,
  studentAssessmentService,
  studentAnswerService,
}
