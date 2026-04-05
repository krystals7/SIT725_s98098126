const bookItems = require('../models/bookModel');

async function getAllBook() {
  return bookItems.find({}).lean({ getters: true }); // price becomes "12.50"
}
  
  module.exports = {
    getAllBook
  };