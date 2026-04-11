const Book = require('../models/bookModel');

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ data: book }); // 👈 IMPORTANT: consistent structure
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};