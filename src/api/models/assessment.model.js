/**
 * Modèle Évaluation pour la plateforme d'évaluations en ligne
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { AssessmentStatus } = require('./constants/enums');

// Schéma Évaluation
const AssessmentSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  teacherId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  class: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    required: true, 
    enum: Object.values(AssessmentStatus), 
    default: AssessmentStatus.DRAFT 
  },
  blockCopyPaste: { 
    type: Boolean, 
    default: true 
  },
  autoFinish: { 
    type: Boolean, 
    default: true 
  },
  shuffleQuestions: { 
    type: Boolean, 
    default: false 
  },
  ipRestriction: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);

module.exports = Assessment;