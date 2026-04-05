const express = require('express');
const router = express.Router();

// Import all controllers via index.js
const Controllers = require('../controllers');

router.get('/', Controllers.bookController.getAllBook);

module.exports = router;

router.get('/_debug', (_req, res) => res.json({ ok: true }));