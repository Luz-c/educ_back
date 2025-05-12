/**
 * Point d'entrée pour exporter tous les modèles Mongoose
 * et les constantes pour la plateforme d'évaluations en ligne
 */

const User = require('./User');
const Assessment = require('./Assessment');
const Question = require('./Question');
const StudentAssessment = require('./StudentAssessment');
const StudentAnswer = require('./StudentAnswer');
const { UserRole, QuestionType, AssessmentStatus } = require('./constants/enums');

// Exemple d'utilisation pour la connexion à MongoDB
/**
 * Fonction pour se connecter à la base de données MongoDB
 * @returns {Promise} Une promesse qui se résout lorsque la connexion est établie
 */
/*
const mongoose = require('mongoose');
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/evaluation_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connecté à la base de données MongoDB');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
  }
}
*/

module.exports = {
  User,
  Assessment,
  Question,
  StudentAssessment,
  StudentAnswer,
  UserRole,
  QuestionType,
  AssessmentStatus
};