const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');

const app = express();
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

// Route Middlewares
app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);

// Define Routes
app.get('/', (req, res) => {
  res.send('Welcome to Q.quiz!');
});

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
