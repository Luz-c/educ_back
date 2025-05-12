/**
 * Service pour le modèle Assessment
 */
const Assessment = require("../models/assessment.model")
const { AssessmentStatus } = require("../models/constants/enums")

/**
 * Récupère toutes les évaluations
 */
const getAllAssessments = async () => {
  const assessments = await Assessment.find()
  return assessments
}

/**
 * Récupère une évaluation par son ID
 */
const getAssessmentById = async (id) => {
  const assessment = await Assessment.findById(id)
  return assessment
}

/**
 * Récupère les évaluations par enseignant
 */
const getAssessmentsByTeacher = async (teacherId) => {
  const assessments = await Assessment.find({ teacherId })
  return assessments
}

/**
 * Récupère les évaluations par classe
 */
const getAssessmentsByClass = async (className) => {
  const assessments = await Assessment.find({ class: className })
  return assessments
}

/**
 * Récupère les évaluations par statut
 */
const getAssessmentsByStatus = async (status) => {
  if (!Object.values(AssessmentStatus).includes(status)) {
    throw new Error("Invalid status")
  }
  const assessments = await Assessment.find({ status })
  return assessments
}

/**
 * Récupère les évaluations à venir (date future)
 */
const getUpcomingAssessments = async () => {
  const now = new Date()
  const assessments = await Assessment.find({ date: { $gt: now } })
  return assessments
}

/**
 * Crée une nouvelle évaluation
 */
const createAssessment = async (assessmentData) => {
  const assessment = await Assessment.create(assessmentData)
  return assessment
}

/**
 * Met à jour une évaluation
 */
const updateAssessment = async (id, assessmentData) => {
  const assessmentExists = await getAssessmentById(id)
  if (!assessmentExists) {
    throw new Error("Assessment not found")
  }

  // Vérifier si le statut est valide
  if (assessmentData.status && !Object.values(AssessmentStatus).includes(assessmentData.status)) {
    throw new Error("Invalid status")
  }

  const assessment = await Assessment.findByIdAndUpdate(id, assessmentData, {
    new: true,
  })
  return assessment
}

/**
 * Change le statut d'une évaluation
 */
const updateAssessmentStatus = async (id, status) => {
  if (!Object.values(AssessmentStatus).includes(status)) {
    throw new Error("Invalid status")
  }

  const assessmentExists = await getAssessmentById(id)
  if (!assessmentExists) {
    throw new Error("Assessment not found")
  }

  const assessment = await Assessment.findByIdAndUpdate(id, { status }, { new: true })
  return assessment
}

/**
 * Supprime une évaluation
 */
const deleteAssessment = async (id) => {
  const assessmentExists = await getAssessmentById(id)
  if (!assessmentExists) {
    throw new Error("Assessment not found")
  }
  await Assessment.findByIdAndDelete(id)
  return "Assessment deleted successfully"
}

module.exports = {
  getAllAssessments,
  getAssessmentById,
  getAssessmentsByTeacher,
  getAssessmentsByClass,
  getAssessmentsByStatus,
  getUpcomingAssessments,
  createAssessment,
  updateAssessment,
  updateAssessmentStatus,
  deleteAssessment,
}
