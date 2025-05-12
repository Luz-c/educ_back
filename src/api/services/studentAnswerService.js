/**
 * Service pour le modèle StudentAnswer
 */
const StudentAnswer = require("../models/student.answer")
const Question = require("../models/question")
const { QuestionType } = require("../models/constants/enums")

/**
 * Récupère toutes les réponses des étudiants
 */
const getAllStudentAnswers = async () => {
  const studentAnswers = await StudentAnswer.find()
  return studentAnswers
}

/**
 * Récupère une réponse d'étudiant par son ID
 */
const getStudentAnswerById = async (id) => {
  const studentAnswer = await StudentAnswer.findById(id)
  return studentAnswer
}

/**
 * Récupère les réponses par assignation d'évaluation
 */
const getStudentAnswersByStudentAssessment = async (studentAssessmentId) => {
  const studentAnswers = await StudentAnswer.find({ studentAssessmentId })
  return studentAnswers
}

/**
 * Récupère les réponses par question
 */
const getStudentAnswersByQuestion = async (questionId) => {
  const studentAnswers = await StudentAnswer.find({ questionId })
  return studentAnswers
}

/**
 * Récupère une réponse spécifique d'un étudiant pour une question
 */
const getStudentAnswerByStudentAssessmentAndQuestion = async (studentAssessmentId, questionId) => {
  const studentAnswer = await StudentAnswer.findOne({
    studentAssessmentId,
    questionId,
  })
  return studentAnswer
}

/**
 * Crée ou met à jour une réponse d'étudiant
 */
const saveStudentAnswer = async (answerData) => {
  // Vérifier si une réponse existe déjà
  const existingAnswer = await getStudentAnswerByStudentAssessmentAndQuestion(
    answerData.studentAssessmentId,
    answerData.questionId,
  )

  if (existingAnswer) {
    // Mettre à jour la réponse existante
    const updatedAnswer = await StudentAnswer.findByIdAndUpdate(existingAnswer._id, answerData, { new: true })
    return updatedAnswer
  } else {
    // Créer une nouvelle réponse
    const newAnswer = await StudentAnswer.create(answerData)
    return newAnswer
  }
}

/**
 * Évalue automatiquement une réponse d'étudiant
 */
const evaluateStudentAnswer = async (id) => {
  const studentAnswer = await getStudentAnswerById(id)
  if (!studentAnswer) {
    throw new Error("Student answer not found")
  }

  // Récupérer la question correspondante
  const question = await Question.findById(studentAnswer.questionId)
  if (!question) {
    throw new Error("Question not found")
  }

  let isCorrect = false
  let score = 0

  // Évaluer en fonction du type de question
  switch (question.type) {
    case QuestionType.QCM:
      // Pour les QCM, vérifier si l'option sélectionnée est correcte
      if (studentAnswer.answerOption) {
        const selectedOption = question.options.find((opt) => opt.id === studentAnswer.answerOption)
        if (selectedOption && selectedOption.correct) {
          isCorrect = true
          score = question.points
        }
      }
      break

    case QuestionType.NUMERIC:
      // Pour les questions numériques, vérifier si la réponse correspond exactement
      if (studentAnswer.answer === question.correctAnswer) {
        isCorrect = true
        score = question.points
      }
      break

    // Les questions de type ESSAY et IMAGE nécessitent une évaluation manuelle
    default:
      // Ne pas modifier isCorrect et score
      break
  }

  // Mettre à jour la réponse avec l'évaluation
  const updatedAnswer = await StudentAnswer.findByIdAndUpdate(
    id,
    {
      isCorrect,
      score,
      maxScore: question.points,
    },
    { new: true },
  )

  return updatedAnswer
}

/**
 * Évalue manuellement une réponse d'étudiant (pour les questions de type ESSAY et IMAGE)
 */
const manuallyGradeStudentAnswer = async (id, score, feedback) => {
  const studentAnswer = await getStudentAnswerById(id)
  if (!studentAnswer) {
    throw new Error("Student answer not found")
  }

  // Récupérer la question correspondante
  const question = await Question.findById(studentAnswer.questionId)
  if (!question) {
    throw new Error("Question not found")
  }

  // Vérifier que le score ne dépasse pas le maximum
  if (score > question.points) {
    throw new Error(`Score cannot exceed maximum points (${question.points})`)
  }

  // Déterminer si la réponse est correcte (score > 0)
  const isCorrect = score > 0

  // Mettre à jour la réponse avec l'évaluation
  const updatedAnswer = await StudentAnswer.findByIdAndUpdate(
    id,
    {
      isCorrect,
      score,
      maxScore: question.points,
      feedback,
    },
    { new: true },
  )

  return updatedAnswer
}

/**
 * Supprime une réponse d'étudiant
 */
const deleteStudentAnswer = async (id) => {
  const studentAnswerExists = await getStudentAnswerById(id)
  if (!studentAnswerExists) {
    throw new Error("Student answer not found")
  }
  await StudentAnswer.findByIdAndDelete(id)
  return "Student answer deleted successfully"
}

module.exports = {
  getAllStudentAnswers,
  getStudentAnswerById,
  getStudentAnswersByStudentAssessment,
  getStudentAnswersByQuestion,
  getStudentAnswerByStudentAssessmentAndQuestion,
  saveStudentAnswer,
  evaluateStudentAnswer,
  manuallyGradeStudentAnswer,
  deleteStudentAnswer,
}
