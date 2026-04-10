const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const Book = require('../models/bookModel'); // make sure this is imported

// ==================== Routes ====================

// Debug route
router.get('/_debug', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'Book routes are working',
    timestamp: new Date().toISOString()
  });
});

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); // includes price
    res.json({ data: books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single book by id
router.get('/:id', bookController.getBookById);

module.exports = router;