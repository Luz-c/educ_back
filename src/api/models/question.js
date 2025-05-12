/**
 * Modèle Question pour la plateforme d'évaluations en ligne
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { QuestionType } = require('./constants/enums');
const QuestionOptionSchema = require('./schemas/questionOption');

// Schéma Question
const QuestionSchema = new Schema({
  assessmentId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Assessment', 
    required: true 
  },
  type: { 
    type: String, 
    required: true, 
    enum: Object.values(QuestionType) 
  },
  content: { 
    type: String, 
    required: true 
  },
  points: { 
    type: Number, 
    required: true 
  },
  options: [QuestionOptionSchema], // Pour les questions QCM
  correctAnswer: { 
    type: String 
  }, // Pour les questions numériques
  minWordCount: { 
    type: Number 
  }, // Pour les questions de rédaction
  orderIndex: { 
    type: Number, 
    required: true 
  }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;