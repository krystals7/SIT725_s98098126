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

router.get('/', haircutController.getAllHaircuts);
router.get('/:id', haircutController.getHaircutById);

module.exports = router;