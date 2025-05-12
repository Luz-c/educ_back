/**
 * Contrôleur pour le modèle User
 */
const userService = require("../services/userService")

// Récupérer tous les utilisateurs
const getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer un utilisateur par ID
const getOne = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userService.getUserById(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer un utilisateur par email
const getByEmail = async (req, res) => {
  try {
    const { email } = req.params
    const user = await userService.getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer un utilisateur par nom d'utilisateur
const getByUsername = async (req, res) => {
  try {
    const { username } = req.params
    const user = await userService.getUserByUsername(username)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les utilisateurs par rôle
const getByRole = async (req, res) => {
  try {
    const { role } = req.params
    const users = await userService.getUsersByRole(role)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Récupérer les utilisateurs par classe
const getByClass = async (req, res) => {
  try {
    const { className } = req.params
    const users = await userService.getUsersByClass(className)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Créer un nouvel utilisateur
const create = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body)
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Mettre à jour un utilisateur
const update = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body
    const user = await userService.updateUser(id, updateData)
    res.status(200).json({
      message: "User updated successfully",
      user,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Supprimer un utilisateur
const remove = async (req, res) => {
  try {
    const { id } = req.params
    await userService.deleteUser(id)
    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getAll,
  getOne,
  getByEmail,
  getByUsername,
  getByRole,
  getByClass,
  create,
  update,
  remove,
}
