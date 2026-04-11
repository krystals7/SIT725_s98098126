// src/routes/books.js
const express = require('express');
const router = express.Router();

console.log("BOOKS ROUTER LOADED - MINIMAL");

global.books = global.books || [];

router.use((req, res, next) => {
  console.log(` ROUTER HIT → ${req.method} ${req.url}`);
  next();
});

router.post('/', (req, res) => {
  console.log(" POST HANDLER REACHED! Body =", JSON.stringify(req.body));
  const finalId = req.body._id || req.body.id || String(Date.now());
  
  const newBook = {
    _id: finalId,
    title: req.body.title || "Default",
    author: req.body.author || "Unknown",
    price: req.body.price !== undefined ? Number(req.body.price) : 29.99
  };
  
  global.books.push(newBook);
  return res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  console.log(" PUT HANDLER REACHED");
  res.status(400).json({ error: 'ID is immutable' });
});

router.get('/', (req, res) => res.json(global.books));

module.exports = router;