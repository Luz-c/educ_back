/**
 * Routes pour le modèle Question
 */
const express = require("express")
const router = express.Router()
const questionController = require("../controllers/questionController")
const validateRequest = require("../middlewares/validateRequest")
const { questionValidation } = require("../validations")

// Routes question
router.get("/", questionController.getAll)
router.get("/:id", questionController.getOne)
router.post("/", validateRequest(questionValidation.createQuestionSchema), questionController.create)
router.put("/:id", validateRequest(questionValidation.updateQuestionSchema), questionController.update)
router.delete("/:id", questionController.remove)
router.get("/assessment/:assessmentId", questionController.getByAssessment)
router.get("/type/:type", questionController.getByType)
router.post(
  "/assessment/:assessmentId/reorder",
  validateRequest(questionValidation.reorderQuestionsSchema),
  questionController.reorder,
)

module.exports = router
