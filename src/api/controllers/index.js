/**
 * Point d'entrée pour les contrôleurs
 * Permet d'importer tous les contrôleurs depuis un seul fichier
 */

const userController = require("./userController")
const assessmentController = require("./assessmentController")
const questionController = require("./questionController")
const studentAssessmentController = require("./studentAssessmentController")
const studentAnswerController = require("./studentAnswerController")

module.exports = {
  userController,
  assessmentController,
  questionController,
  studentAssessmentController,
  studentAnswerController,
}
