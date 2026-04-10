const bookService = require('../services/bookService');

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();

    res.status(200).json({
      statusCode: 200,
      success: true,
      data: books,
      message: 'Books retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      data: book,
      message: 'Book retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBooks,
  getBookById
};