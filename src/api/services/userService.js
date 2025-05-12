/**
 * Service pour le modèle User
 */
const User = require("../models/user.model")
const { UserRole } = require("../models/constants/enums")

/**
 * Récupère tous les utilisateurs
 */
const getAllUsers = async () => {
  const users = await User.find()
  return users
}

/**
 * Récupère un utilisateur par son ID
 */
const getUserById = async (id) => {
  const user = await User.findById(id)
  return user
}

/**
 * Récupère un utilisateur par son nom d'utilisateur
 */
const getUserByUsername = async (username) => {
  const user = await User.findOne({ username })
  return user
}

/**
 * Récupère un utilisateur par son email
 */
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

/**
 * Récupère tous les utilisateurs par rôle
 */
const getUsersByRole = async (role) => {
  if (!Object.values(UserRole).includes(role)) {
    throw new Error("Invalid role")
  }
  const users = await User.find({ role })
  return users
}

/**
 * Récupère tous les utilisateurs d'une classe
 */
const getUsersByClass = async (className) => {
  const users = await User.find({ class: className })
  return users
}

/**
 * Crée un nouvel utilisateur
 */
const createUser = async (userData) => {
  // Vérifier si l'utilisateur existe déjà
  const userExistsByEmail = await getUserByEmail(userData.email)
  if (userExistsByEmail) {
    throw new Error("Email already exists")
  }

  const userExistsByUsername = await getUserByUsername(userData.username)
  if (userExistsByUsername) {
    throw new Error("Username already exists")
  }

  const user = await User.create(userData)
  return user
}

/**
 * Met à jour un utilisateur
 */
const updateUser = async (id, userData) => {
  const userExists = await getUserById(id)
  if (!userExists) {
    throw new Error("User not found")
  }

  // Vérifier si l'email est déjà utilisé par un autre utilisateur
  if (userData.email) {
    const userWithEmail = await getUserByEmail(userData.email)
    if (userWithEmail && userWithEmail._id.toString() !== id) {
      throw new Error("Email already in use by another user")
    }
  }

  // Vérifier si le nom d'utilisateur est déjà utilisé par un autre utilisateur
  if (userData.username) {
    const userWithUsername = await getUserByUsername(userData.username)
    if (userWithUsername && userWithUsername._id.toString() !== id) {
      throw new Error("Username already in use by another user")
    }
  }

  const user = await User.findByIdAndUpdate(id, userData, {
    new: true,
  })
  return user
}

/**
 * Supprime un utilisateur
 */
const deleteUser = async (id) => {
  const userExists = await getUserById(id)
  if (!userExists) {
    throw new Error("User not found")
  }
  await User.findByIdAndDelete(id)
  return "User deleted successfully"
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUsersByRole,
  getUsersByClass,
  createUser,
  updateUser,
  deleteUser,
}
