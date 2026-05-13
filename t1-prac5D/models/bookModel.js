const mongoose = require('mongoose');   // ← This line was missing

const bookSchema = new mongoose.Schema({
  id: { 
    type: String, 
    unique: true,
    required: true 
  },
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String },
  price: { type: Number },
  summary: { type: String }
});

module.exports = mongoose.model('Book', bookSchema);