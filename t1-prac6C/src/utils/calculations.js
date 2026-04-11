// src/utils/calculations.js
function calculateBookTotal(price, quantity, taxRate = 0.1) {
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Price must be a positive number');
  }
  if (typeof quantity !== 'number' || quantity <= 0) {
    throw new Error('Quantity must be a positive number');
  }
  return parseFloat((price * quantity * (1 + taxRate)).toFixed(2));
}

module.exports = { calculateBookTotal };