// controllers/index.js

const bookController = require('./bookController');

module.exports = {
    // Books
    getAllBooks: bookController.getAllBooks,
    getBookById: bookController.getBookById,
    
    // Add more controllers here later
    // userController: require('./userController'),
};