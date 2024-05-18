// QuizResult model
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  quizName: String,
  name: String,
  marks: Number,
  // Add more fields as needed
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
