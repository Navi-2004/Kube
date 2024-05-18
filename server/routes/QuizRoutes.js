const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

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

module.exports = router;
