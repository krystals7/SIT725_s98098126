const mongoose = require('mongoose');

const haircutSchema = new mongoose.Schema({
  id: { 
    type: String, 
    unique: true,     
    required: true 
  },
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
}, { timestamps: true });   

module.exports = mongoose.model('Haircut', haircutSchema);