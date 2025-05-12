/**
 * Contrôleur pour le modèle StudentAnswer
 */
const studentAnswerService = require("../services/studentAnswerService")

// Récupérer toutes les réponses des étudiants
const getAll = async (req, res) => {
  try {
    const studentAnswers = await studentAnswerService.getAllStudentAnswers()
    res.status(200).json(studentAnswers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer une réponse d'étudiant par ID
const getOne = async (req, res) => {
  try {
    const { id } = req.params
    const studentAnswer = await studentAnswerService.getStudentAnswerById(id)
    if (!studentAnswer) {
      return res.status(404).json({ message: "Student answer not found" })
    }
    res.status(200).json(studentAnswer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les réponses par assignation d'évaluation
const getByStudentAssessment = async (req, res) => {
  try {
    const { studentAssessmentId } = req.params
    const studentAnswers = await studentAnswerService.getStudentAnswersByStudentAssessment(studentAssessmentId)
    res.status(200).json(studentAnswers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les réponses par question
const getByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params
    const studentAnswers = await studentAnswerService.getStudentAnswersByQuestion(questionId)
    res.status(200).json(studentAnswers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer une réponse spécifique d'un étudiant pour une question
const getByStudentAssessmentAndQuestion = async (req, res) => {
  try {
    const { studentAssessmentId, questionId } = req.params
    const studentAnswer = await studentAnswerService.getStudentAnswerByStudentAssessmentAndQuestion(
      studentAssessmentId,
      questionId,
    )
    if (!studentAnswer) {
      return res.status(404).json({ message: "Student answer not found" })
    }
    res.status(200).json(studentAnswer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Sauvegarder une réponse d'étudiant (créer ou mettre à jour)
const save = async (req, res) => {
  try {
    const studentAnswer = await studentAnswerService.saveStudentAnswer(req.body)
    res.status(200).json({
      message: "Answer saved successfully",
      studentAnswer,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Évaluer automatiquement une réponse d'étudiant
const evaluate = async (req, res) => {
  try {
    const { id } = req.params
    const studentAnswer = await studentAnswerService.evaluateStudentAnswer(id)
    res.status(200).json({
      message: "Answer evaluated successfully",
      studentAnswer,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Évaluer manuellement une réponse d'étudiant
const grade = async (req, res) => {
  try {
    const { id } = req.params
    const { score, feedback } = req.body

    if (score === undefined) {
      return res.status(400).json({ message: "Score is required" })
    }

    const studentAnswer = await studentAnswerService.manuallyGradeStudentAnswer(id, score, feedback)
    res.status(200).json({
      message: "Answer graded successfully",
      studentAnswer,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Supprimer une réponse d'étudiant
const remove = async (req, res) => {
  try {
    const { id } = req.params
    await studentAnswerService.deleteStudentAnswer(id)
    res.status(200).json({ message: "Student answer deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getAll,
  getOne,
  getByStudentAssessment,
  getByQuestion,
  getByStudentAssessmentAndQuestion,
  save,
  evaluate,
  grade,
  remove,
}
