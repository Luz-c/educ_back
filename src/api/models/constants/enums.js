/**
 * Constantes pour les énumérations
 */

const UserRole = {
    TEACHER: "teacher",
    STUDENT: "student",
  };
  
  const QuestionType = {
    QCM: "qcm",
    ESSAY: "essay",
    NUMERIC: "numeric", 
    IMAGE: "image",
  };
  
  const AssessmentStatus = {
    DRAFT: "draft",
    PUBLISHED: "published",
    COMPLETED: "completed",
    GRADED: "graded",
  };
  
  module.exports = {
    UserRole,
    QuestionType,
    AssessmentStatus
  };