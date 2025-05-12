/**
 * Contrôleur pour le modèle Assessment
 */
const assessmentService = require("../services/assessmentService")

// Récupérer toutes les évaluations
const getAll = async (req, res) => {
  try {
    const assessments = await assessmentService.getAllAssessments()
    res.status(200).json(assessments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer une évaluation par ID
const getOne = async (req, res) => {
  try {
    const { id } = req.params
    const assessment = await assessmentService.getAssessmentById(id)
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" })
    }
    res.status(200).json(assessment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les évaluations par enseignant
const getByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params
    const assessments = await assessmentService.getAssessmentsByTeacher(teacherId)
    res.status(200).json(assessments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les évaluations par classe
const getByClass = async (req, res) => {
  try {
    const { className } = req.params
    const assessments = await assessmentService.getAssessmentsByClass(className)
    res.status(200).json(assessments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les évaluations par statut
const getByStatus = async (req, res) => {
  try {
    const { status } = req.params
    const assessments = await assessmentService.getAssessmentsByStatus(status)
    res.status(200).json(assessments)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Récupérer les évaluations à venir
const getUpcoming = async (req, res) => {
  try {
    const assessments = await assessmentService.getUpcomingAssessments()
    res.status(200).json(assessments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Créer une nouvelle évaluation
const create = async (req, res) => {
  try {
    const newAssessment = await assessmentService.createAssessment(req.body)
    res.status(201).json({
      message: "Assessment created successfully",
      assessment: newAssessment,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Mettre à jour une évaluation
const update = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body
    const assessment = await assessmentService.updateAssessment(id, updateData)
    res.status(200).json({
      message: "Assessment updated successfully",
      assessment,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Mettre à jour le statut d'une évaluation
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    if (!status) {
      return res.status(400).json({ message: "Status is required" })
    }
    const assessment = await assessmentService.updateAssessmentStatus(id, status)
    res.status(200).json({
      message: "Assessment status updated successfully",
      assessment,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Supprimer une évaluation
const remove = async (req, res) => {
  try {
    const { id } = req.params
    await assessmentService.deleteAssessment(id)
    res.status(200).json({ message: "Assessment deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getAll,
  getOne,
  getByTeacher,
  getByClass,
  getByStatus,
  getUpcoming,
  create,
  update,
  updateStatus,
  remove,
}
