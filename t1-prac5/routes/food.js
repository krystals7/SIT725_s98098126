const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');
router.get('/', 
Controllers.foodController.getAllFood);

module.exports = router;