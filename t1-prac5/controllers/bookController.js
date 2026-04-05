// Import the service
const bookService = require('../services/bookService');

// Controller uses the service to get data
exports.getAllBook = (req, res) => {
  const items = bookService.getAllBook();
  res.json({
    status: 200,
    data: items,
    message: 'Book list retrieved using service'
  });
};