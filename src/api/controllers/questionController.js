/**
 * Contrôleur pour le modèle Question
 */
const questionService = require("../services/questionService")

// Récupérer toutes les questions
const getAll = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions()
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer une question par ID
const getOne = async (req, res) => {
  try {
    const { id } = req.params
    const question = await questionService.getQuestionById(id)
    if (!question) {
      return res.status(404).json({ message: "Question not found" })
    }
    res.status(200).json(question)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les questions par évaluation
const getByAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params
    const questions = await questionService.getQuestionsByAssessment(assessmentId)
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les questions par type
const getByType = async (req, res) => {
  try {
    const { type } = req.params
    const questions = await questionService.getQuestionsByType(type)
    res.status(200).json(questions)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Créer une nouvelle question
const create = async (req, res) => {
  try {
    const newQuestion = await questionService.createQuestion(req.body)
    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Mettre à jour une question
const update = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body
    const question = await questionService.updateQuestion(id, updateData)
    res.status(200).json({
      message: "Question updated successfully",
      question,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Réorganiser l'ordre des questions
const reorder = async (req, res) => {
  try {
    const { assessmentId } = req.params
    const { questionOrders } = req.body

    if (!questionOrders || !Array.isArray(questionOrders)) {
      return res.status(400).json({ message: "Question orders array is required" })
    }

    const questions = await questionService.reorderQuestions(assessmentId, questionOrders)
    res.status(200).json({
      message: "Questions reordered successfully",
      questions,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Supprimer une question
const remove = async (req, res) => {
  try {
    const { id } = req.params
    await questionService.deleteQuestion(id)
    res.status(200).json({ message: "Question deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getAll,
  getOne,
  getByAssessment,
  getByType,
  create,
  update,
  reorder,
  remove,
}
