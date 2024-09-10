const express = require('express');
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');
const quizController = require('../controllers/quizController');


const router = express.Router();

// Create a quiz (Protected route)
router.post('/', auth, async (req, res) => {
  const { title, description, questions } = req.body;
  try {
    const quiz = new Quiz({
      title,
      description,
      questions,
      creator: req.user,
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: 'Error creating quiz' });
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to create a new quiz
router.post('/', quizController.createQuiz);

// Route to get all quizzes
router.get('/', quizController.getAllQuizzes);

// Route to get a specific quiz by ID
router.get('/:id', quizController.getQuizById);

// Route to update a quiz by ID
router.put('/:id', quizController.updateQuiz);

// Route to delete a quiz by ID
router.delete('/:id', quizController.deleteQuiz);

// Get a single quiz
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a quiz (Protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz || quiz.creator.toString() !== req.user) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    await quiz.remove();
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
