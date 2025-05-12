/**
 * Routes pour le modèle Assessment
 */
const express = require("express")
const router = express.Router()
const assessmentController = require("../controllers/assessmentController")
const validateRequest = require("../middlewares/validateRequest")
const { assessmentValidation } = require("../validations")

// Routes évaluation
router.get("/", assessmentController.getAll)
router.get("/upcoming", assessmentController.getUpcoming)
router.get("/:id", assessmentController.getOne)
router.post("/", validateRequest(assessmentValidation.createAssessmentSchema), assessmentController.create)
router.put("/:id", validateRequest(assessmentValidation.updateAssessmentSchema), assessmentController.update)
router.delete("/:id", assessmentController.remove)
router.get("/teacher/:teacherId", assessmentController.getByTeacher)
router.get("/class/:className", assessmentController.getByClass)
router.get("/status/:status", assessmentController.getByStatus)
router.patch(
  "/:id/status",
  validateRequest(assessmentValidation.updateAssessmentStatusSchema),
  assessmentController.updateStatus,
)

module.exports = router
