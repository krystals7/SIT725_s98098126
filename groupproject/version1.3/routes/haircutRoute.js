const express = require('express');
const router = express.Router();

const haircutController = require('../controllers/haircutController');

router.get('/_debug', (req, res) => {
  res.json({
    ok: true,
    message: 'Haircut routes are working',
    timestamp: new Date().toISOString()
  });
});

router.get('/_seed-check', async (req, res) => {
  try {
    const Haircut = require('../models/haircutModel');
    const count = await Haircut.countDocuments();
    const sample = await Haircut.find().limit(5);
    
    res.json({
      totalHaircuts: count,
      sampleData: sample
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Main routes - put these AFTER debug routes
router.get('/', haircutController.getAllHaircuts);
router.get('/:id', haircutController.getHaircutById);

module.exports = router;