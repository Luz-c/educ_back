/**
 * Schéma pour les options des questions QCM
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionOptionSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  correct: { type: Boolean, required: true }
}, { _id: false });

module.exports = QuestionOptionSchema;