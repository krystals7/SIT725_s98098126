const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  author: String,
  year: Number,
  genre: String,
  price: { 
    type: Number, 
    required: true 
  },
  summary: String
});

module.exports = mongoose.model('Book', bookSchema);