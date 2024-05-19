const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuizResult = require('../models/QuizResult');


router.post('/', async (req, res) => {
    const { title, questions } = req.body;

    try {
        const questionDocs = await Promise.all(questions.map(async q => {
            const question = new Question({
                text: q.text,
                options: q.options,
                correctAnswer: q.correctAnswer
            });
            return await question.save();
        }));

        const quiz = new Quiz({
            title,
            questions: questionDocs.map(q => q._id)
        });

        const savedQuiz = await quiz.save();
        res.status(201).json(savedQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        res.json(quiz);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/:id/submit', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        const { answers } = req.body;
        let score = 0;

        quiz.questions.forEach((question) => {
            if (question.correctAnswer === answers[question._id]) {
                score++;
            }
        });

        res.json({ score, total: quiz.questions.length });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/quiz-results", async (req, res) => {
    try {

      const { userId, quizId, quizName,  marks,total } = req.body;
  
      const quizResult = new QuizResult({
        userId,
        quizId,
        quizName,
        marks,
        total
      });
  
      await quizResult.save();
  
      res.status(201).json({ message: "Quiz result stored successfully" });
    } catch (error) {
      console.error("Error storing quiz result:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get('/report/:quizId', async (req, res) => {
    const { quizId } = req.params;
  
    try {
      const quizReport = await QuizResult.find({ quizId });
  
      const attendees = quizReport.map((result) => ({
        userId: result.userId,
        marks: result.marks,
        total: result.total
      }));
  
      const quizData = {
        quizId,
        quizName: quizReport.length > 0 ? quizReport[0].quizName : '',
        attendees
      };
  
      res.json(quizData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/attended/:userId/:id', async (req, res) => {
    console.log(req.params);
    const { userId, id } = req.params;
    console.log("Value", userId, id);

    try {
        const quizResults = await QuizResult.find({ userId: userId, quizId: id });
        res.json(quizResults);
    } catch (err) {
        console.error('Error retrieving quiz results:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
