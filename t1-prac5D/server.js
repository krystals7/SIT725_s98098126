// server.js
const express = require('express');
const mongoose = require('mongoose');

const booksRouter = require('./src/routes/books');

const app = express();

console.log("=== SERVER.JS LOADED ===");

app.use(express.json());

// VERY LOUD GLOBAL DEBUG MIDDLEWARE
app.use((req, res, next) => {
  console.log(` GLOBAL [${req.method}] ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`   BODY:`, JSON.stringify(req.body));
  }
  next();
});

app.use('/api/books', booksRouter);

app.get('/', (req, res) => res.send('Book API is running...'));

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));
}

// ... (keep everything above)

// Start server only if run directly (not in tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;