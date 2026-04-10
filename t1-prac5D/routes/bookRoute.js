const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

// ==================== Routes ====================

// Debug route (must come before /:id)
router.get('/_debug', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'Book routes are working',
    timestamp: new Date().toISOString()
  });
});

// GET all books
router.get('/', bookController.getAllBooks);

// GET single book by id
router.get('/:id', bookController.getBookById);

module.exports = router;