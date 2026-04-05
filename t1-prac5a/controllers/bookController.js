// Import the service
const bookService = require('../services/bookService');

//Controller uses the service to get data
exports.getAllBook = async (_req, res, next) => {
  try {
    const items = await bookService.getAllBook();
    res.status(200).json({
      statusCode: 200,
      data: items,
      message: 'Book menu retrieved using service'
    });
  } catch (err) {
    next(err);
  }
};