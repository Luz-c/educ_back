/**
 * Modèle Assignation d'évaluation à un étudiant pour la plateforme d'évaluations en ligne
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schéma Assignation d'évaluation à un étudiant
const StudentAssessmentSchema = new Schema({
  studentId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  assessmentId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Assessment', 
    required: true 
  },
  uniqueId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['not_started', 'in_progress', 'completed'], 
    default: 'not_started' 
  },
  startTime: { 
    type: Date 
  },
  endTime: { 
    type: Date 
  },
  timeSpent: { 
    type: Number 
  }, // en secondes
  score: { 
    type: Number 
  },
  maxScore: { 
    type: Number, 
    required: true 
  }
});

const StudentAssessment = mongoose.model('StudentAssessment', StudentAssessmentSchema);

module.exports = StudentAssessment;