/**
 * Routes pour le modèle StudentAssessment
 */
const express = require("express")
const router = express.Router()
const studentAssessmentController = require("../controllers/studentAssessmentController")
const validateRequest = require("../middlewares/validateRequest")
const { studentAssessmentValidation } = require("../validations")

// Routes assignation d'évaluation
router.get("/", studentAssessmentController.getAll)
router.get("/:id", studentAssessmentController.getOne)
router.post(
  "/",
  validateRequest(studentAssessmentValidation.createStudentAssessmentSchema),
  studentAssessmentController.create,
)
router.put(
  "/:id",
  validateRequest(studentAssessmentValidation.updateStudentAssessmentSchema),
  studentAssessmentController.update,
)
router.delete("/:id", studentAssessmentController.remove)
router.get("/unique/:uniqueId", studentAssessmentController.getByUniqueId)
router.get("/student/:studentId", studentAssessmentController.getByStudent)
router.get("/assessment/:assessmentId", studentAssessmentController.getByAssessment)
router.get("/status/:status", studentAssessmentController.getByStatus)
router.post("/:id/start", studentAssessmentController.start)
router.post(
  "/:id/complete",
  validateRequest(studentAssessmentValidation.completeStudentAssessmentSchema),
  studentAssessmentController.complete,
)

module.exports = router
