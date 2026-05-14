const express = require('express');
const router = express.Router();

const haircutController = require('../controllers/haircutController');
const Haircut = require('../models/haircutModel'); // make sure this is imported

// ==================== Routes ====================

// Debug route
router.get('/_debug', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'Haircut routes are working',
    timestamp: new Date().toISOString()
  });
});

// GET all books
router.get('/', async (req, res) => {
  try {
    const haircuts = await Book.find(); // includes price
    res.json({ data: haircuts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single book by id
router.get('/:id', haircutController.getHaircutById);

module.exports = router;