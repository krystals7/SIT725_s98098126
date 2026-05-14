const mongoose = require('mongoose');

const haircutSchema = new mongoose.Schema({
  id: String,
  salonType: String,
  name: String,
  stylist: String,
  location: String,
  postcode: String,
  phone: String,
  service: String,
  price: Number,
  duration: String,
  description: String
});

module.exports = mongoose.model('Haircut', haircutSchema);