/**
 * Point d'entrée pour les routes
 */
const express = require("express")
const router = express.Router()

const userRoutes = require("./userRoutes")
const assessmentRoutes = require("./assessmentRoutes")
const questionRoutes = require("./questionRoutes")
const studentAssessmentRoutes = require("./studentAssessmentRoutes")
const studentAnswerRoutes = require("./studentAnswerRoutes")

// Montage des routes
router.use("/users", userRoutes)
router.use("/assessments", assessmentRoutes)
router.use("/questions", questionRoutes)
router.use("/student-assessments", studentAssessmentRoutes)
router.use("/student-answers", studentAnswerRoutes)

module.exports = router
