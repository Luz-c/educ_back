/**
 * Service pour le modèle Question
 */
const Question = require("../models/question")
const { QuestionType } = require("../models/constants/enums")

/**
 * Récupère toutes les questions
 */
const getAllQuestions = async () => {
  const questions = await Question.find()
  return questions
}

/**
 * Récupère une question par son ID
 */
const getQuestionById = async (id) => {
  const question = await Question.findById(id)
  return question
}

/**
 * Récupère les questions par évaluation
 */
const getQuestionsByAssessment = async (assessmentId) => {
  const questions = await Question.find({ assessmentId }).sort({ orderIndex: 1 })
  return questions
}

/**
 * Récupère les questions par type
 */
const getQuestionsByType = async (type) => {
  if (!Object.values(QuestionType).includes(type)) {
    throw new Error("Invalid question type")
  }
  const questions = await Question.find({ type })
  return questions
}

/**
 * Crée une nouvelle question
 */
const createQuestion = async (questionData) => {
  // Vérifier si le type est valide
  if (!Object.values(QuestionType).includes(questionData.type)) {
    throw new Error("Invalid question type")
  }

  // Vérifier si les options sont fournies pour les questions QCM
  if (questionData.type === QuestionType.QCM && (!questionData.options || questionData.options.length === 0)) {
    throw new Error("Options are required for QCM questions")
  }

  // Vérifier si la réponse correcte est fournie pour les questions numériques
  if (questionData.type === QuestionType.NUMERIC && !questionData.correctAnswer) {
    throw new Error("Correct answer is required for numeric questions")
  }

  const question = await Question.create(questionData)
  return question
}

/**
 * Met à jour une question
 */
const updateQuestion = async (id, questionData) => {
  const questionExists = await getQuestionById(id)
  if (!questionExists) {
    throw new Error("Question not found")
  }

  // Vérifier si le type est valide
  if (questionData.type && !Object.values(QuestionType).includes(questionData.type)) {
    throw new Error("Invalid question type")
  }

  const question = await Question.findByIdAndUpdate(id, questionData, {
    new: true,
  })
  return question
}

/**
 * Réorganise l'ordre des questions
 */
const reorderQuestions = async (assessmentId, questionOrders) => {
  // questionOrders est un tableau d'objets { id: questionId, orderIndex: newIndex }
  const updatePromises = questionOrders.map((item) =>
    Question.findByIdAndUpdate(item.id, { orderIndex: item.orderIndex }),
  )

  await Promise.all(updatePromises)

  // Récupérer les questions mises à jour dans le bon ordre
  const questions = await getQuestionsByAssessment(assessmentId)
  return questions
}

/**
 * Supprime une question
 */
const deleteQuestion = async (id) => {
  const questionExists = await getQuestionById(id)
  if (!questionExists) {
    throw new Error("Question not found")
  }
  await Question.findByIdAndDelete(id)
  return "Question deleted successfully"
}

module.exports = {
  getAllQuestions,
  getQuestionById,
  getQuestionsByAssessment,
  getQuestionsByType,
  createQuestion,
  updateQuestion,
  reorderQuestions,
  deleteQuestion,
}
