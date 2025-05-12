/**
 * Modèle Réponse d'un étudiant pour la plateforme d'évaluations en ligne
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schéma Réponse d'un étudiant
const StudentAnswerSchema = new Schema({
  studentAssessmentId: { 
    type: Schema.Types.ObjectId, 
    ref: 'StudentAssessment', 
    required: true 
  },
  questionId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Question', 
    required: true 
  },
  answer: { 
    type: String 
  },
  answerOption: { 
    type: String 
  }, // Pour les QCM
  isCorrect: { 
    type: Boolean 
  },
  score: { 
    type: Number 
  },
  maxScore: { 
    type: Number 
  },
  feedback: { 
    type: String 
  }
});

const StudentAnswer = mongoose.model('StudentAnswer', StudentAnswerSchema);

module.exports = StudentAnswer;