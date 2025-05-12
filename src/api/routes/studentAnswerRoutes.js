/**
 * Routes pour le modèle StudentAnswer
 */
const express = require("express")
const router = express.Router()
const studentAnswerController = require("../controllers/studentAnswerController")
const validateRequest = require("../middlewares/validateRequest")
const { studentAnswerValidation } = require("../validations")

// Routes réponse d'étudiant
router.get("/", studentAnswerController.getAll)
router.get("/:id", studentAnswerController.getOne)
router.post("/", validateRequest(studentAnswerValidation.saveStudentAnswerSchema), studentAnswerController.save)
router.delete("/:id", studentAnswerController.remove)
router.get("/student-assessment/:studentAssessmentId", studentAnswerController.getByStudentAssessment)
router.get("/question/:questionId", studentAnswerController.getByQuestion)
router.get(
  "/student-assessment/:studentAssessmentId/question/:questionId",
  studentAnswerController.getByStudentAssessmentAndQuestion,
)
router.post("/:id/evaluate", studentAnswerController.evaluate)
router.post(
  "/:id/grade",
  validateRequest(studentAnswerValidation.gradeStudentAnswerSchema),
  studentAnswerController.grade,
)

module.exports = router
