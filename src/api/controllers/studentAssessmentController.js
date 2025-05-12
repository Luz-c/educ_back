/**
 * Contrôleur pour le modèle StudentAssessment
 */
const studentAssessmentService = require("../services/studentAssessmentService")

// Récupérer toutes les assignations d'évaluations
const getAll = async (req, res) => {
  try {
    const studentAssessments = await studentAssessmentService.getAllStudentAssessments()
    res.status(200).json(studentAssessments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer une assignation d'évaluation par ID
const getOne = async (req, res) => {
  try {
    const { id } = req.params
    const studentAssessment = await studentAssessmentService.getStudentAssessmentById(id)
    if (!studentAssessment) {
      return res.status(404).json({ message: "Student assessment not found" })
    }
    res.status(200).json(studentAssessment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer une assignation d'évaluation par ID unique
const getByUniqueId = async (req, res) => {
  try {
    const { uniqueId } = req.params
    const studentAssessment = await studentAssessmentService.getStudentAssessmentByUniqueId(uniqueId)
    if (!studentAssessment) {
      return res.status(404).json({ message: "Student assessment not found" })
    }
    res.status(200).json(studentAssessment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les assignations d'évaluations par étudiant
const getByStudent = async (req, res) => {
  try {
    const { studentId } = req.params
    const studentAssessments = await studentAssessmentService.getStudentAssessmentsByStudent(studentId)
    res.status(200).json(studentAssessments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les assignations d'évaluations par évaluation
const getByAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params
    const studentAssessments = await studentAssessmentService.getStudentAssessmentsByAssessment(assessmentId)
    res.status(200).json(studentAssessments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les assignations d'évaluations par statut
const getByStatus = async (req, res) => {
  try {
    const { status } = req.params
    const studentAssessments = await studentAssessmentService.getStudentAssessmentsByStatus(status)
    res.status(200).json(studentAssessments)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Créer une nouvelle assignation d'évaluation
const create = async (req, res) => {
  try {
    const newStudentAssessment = await studentAssessmentService.createStudentAssessment(req.body)
    res.status(201).json({
      message: "Student assessment created successfully",
      studentAssessment: newStudentAssessment,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Mettre à jour une assignation d'évaluation
const update = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body
    const studentAssessment = await studentAssessmentService.updateStudentAssessment(id, updateData)
    res.status(200).json({
      message: "Student assessment updated successfully",
      studentAssessment,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Démarrer une évaluation pour un étudiant
const start = async (req, res) => {
  try {
    const { id } = req.params
    const studentAssessment = await studentAssessmentService.startStudentAssessment(id)
    res.status(200).json({
      message: "Assessment started successfully",
      studentAssessment,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Terminer une évaluation pour un étudiant
const complete = async (req, res) => {
  try {
    const { id } = req.params
    const { score } = req.body

    if (score === undefined) {
      return res.status(400).json({ message: "Score is required" })
    }

    const studentAssessment = await studentAssessmentService.completeStudentAssessment(id, score)
    res.status(200).json({
      message: "Assessment completed successfully",
      studentAssessment,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Supprimer une assignation d'évaluation
const remove = async (req, res) => {
  try {
    const { id } = req.params
    await studentAssessmentService.deleteStudentAssessment(id)
    res.status(200).json({ message: "Student assessment deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getAll,
  getOne,
  getByUniqueId,
  getByStudent,
  getByAssessment,
  getByStatus,
  create,
  update,
  start,
  complete,
  remove,
}
