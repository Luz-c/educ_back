/**
 * Service pour le modèle StudentAssessment
 */
const StudentAssessment = require("../models/StudentAssessment")
const { v4: uuidv4 } = require("uuid") // Vous devrez installer cette dépendance

/**
 * Récupère toutes les assignations d'évaluations
 */
const getAllStudentAssessments = async () => {
  const studentAssessments = await StudentAssessment.find()
  return studentAssessments
}

/**
 * Récupère une assignation d'évaluation par son ID
 */
const getStudentAssessmentById = async (id) => {
  const studentAssessment = await StudentAssessment.findById(id)
  return studentAssessment
}

/**
 * Récupère une assignation d'évaluation par son ID unique
 */
const getStudentAssessmentByUniqueId = async (uniqueId) => {
  const studentAssessment = await StudentAssessment.findOne({ uniqueId })
  return studentAssessment
}

/**
 * Récupère les assignations d'évaluations par étudiant
 */
const getStudentAssessmentsByStudent = async (studentId) => {
  const studentAssessments = await StudentAssessment.find({ studentId })
  return studentAssessments
}

/**
 * Récupère les assignations d'évaluations par évaluation
 */
const getStudentAssessmentsByAssessment = async (assessmentId) => {
  const studentAssessments = await StudentAssessment.find({ assessmentId })
  return studentAssessments
}

/**
 * Récupère les assignations d'évaluations par statut
 */
const getStudentAssessmentsByStatus = async (status) => {
  if (!["not_started", "in_progress", "completed"].includes(status)) {
    throw new Error("Invalid status")
  }
  const studentAssessments = await StudentAssessment.find({ status })
  return studentAssessments
}

/**
 * Crée une nouvelle assignation d'évaluation
 */
const createStudentAssessment = async (studentAssessmentData) => {
  // Générer un ID unique pour l'assignation
  const uniqueId = studentAssessmentData.uniqueId || uuidv4()

  // Vérifier si une assignation existe déjà pour cet étudiant et cette évaluation
  const existingAssignment = await StudentAssessment.findOne({
    studentId: studentAssessmentData.studentId,
    assessmentId: studentAssessmentData.assessmentId,
  })

  if (existingAssignment) {
    throw new Error("Student already assigned to this assessment")
  }

  const studentAssessment = await StudentAssessment.create({
    ...studentAssessmentData,
    uniqueId,
    status: "not_started",
  })

  return studentAssessment
}

/**
 * Met à jour une assignation d'évaluation
 */
const updateStudentAssessment = async (id, studentAssessmentData) => {
  const studentAssessmentExists = await getStudentAssessmentById(id)
  if (!studentAssessmentExists) {
    throw new Error("Student assessment not found")
  }

  // Vérifier si le statut est valide
  if (
    studentAssessmentData.status &&
    !["not_started", "in_progress", "completed"].includes(studentAssessmentData.status)
  ) {
    throw new Error("Invalid status")
  }

  const studentAssessment = await StudentAssessment.findByIdAndUpdate(id, studentAssessmentData, { new: true })

  return studentAssessment
}

/**
 * Démarre une évaluation pour un étudiant
 */
const startStudentAssessment = async (id) => {
  const studentAssessment = await getStudentAssessmentById(id)
  if (!studentAssessment) {
    throw new Error("Student assessment not found")
  }

  if (studentAssessment.status !== "not_started") {
    throw new Error("Assessment already started or completed")
  }

  const updatedStudentAssessment = await StudentAssessment.findByIdAndUpdate(
    id,
    {
      status: "in_progress",
      startTime: new Date(),
    },
    { new: true },
  )

  return updatedStudentAssessment
}

/**
 * Termine une évaluation pour un étudiant
 */
const completeStudentAssessment = async (id, score) => {
  const studentAssessment = await getStudentAssessmentById(id)
  if (!studentAssessment) {
    throw new Error("Student assessment not found")
  }

  if (studentAssessment.status !== "in_progress") {
    throw new Error("Assessment not in progress")
  }

  const endTime = new Date()
  const startTime = new Date(studentAssessment.startTime)
  const timeSpent = Math.floor((endTime - startTime) / 1000) // Temps en secondes

  const updatedStudentAssessment = await StudentAssessment.findByIdAndUpdate(
    id,
    {
      status: "completed",
      endTime,
      timeSpent,
      score,
    },
    { new: true },
  )

  return updatedStudentAssessment
}

/**
 * Supprime une assignation d'évaluation
 */
const deleteStudentAssessment = async (id) => {
  const studentAssessmentExists = await getStudentAssessmentById(id)
  if (!studentAssessmentExists) {
    throw new Error("Student assessment not found")
  }
  await StudentAssessment.findByIdAndDelete(id)
  return "Student assessment deleted successfully"
}

module.exports = {
  getAllStudentAssessments,
  getStudentAssessmentById,
  getStudentAssessmentByUniqueId,
  getStudentAssessmentsByStudent,
  getStudentAssessmentsByAssessment,
  getStudentAssessmentsByStatus,
  createStudentAssessment,
  updateStudentAssessment,
  startStudentAssessment,
  completeStudentAssessment,
  deleteStudentAssessment,
}
