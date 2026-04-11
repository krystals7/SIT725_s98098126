const Book = require('../models/bookModel');

exports.getAllBooks = async () => {
  try {
    return await Book.find()
      .sort({ title: 1 })           // Sort alphabetically by title
      .select('id title author year genre summary'); // Optional: limit returned fields
  } catch (error) {
    console.error('Error in getAllBooks service:', error);
    throw error;
  }
};

exports.getBookById = async (id) => {
  try {
    return await Book.findOne({ id: id })
      .select('id title author year genre summary');
  } catch (error) {
    console.error(`Error in getBookById service for id ${id}:`, error);
    throw error;
  }
};

// Future methods you can add later:
exports.createBook = async (bookData) => {
  return await Book.create(bookData);
};

exports.deleteBook = async (id) => {
  return await Book.deleteOne({ id: id });
};