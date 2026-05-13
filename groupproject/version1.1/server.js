const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const bookRoutes = require('./routes/haircutRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// ====================== Middleware ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ====================== Routes ======================
app.use('/api/haircut', haircutRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ====================== Error Handling ======================
app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(' Server Error:', err.message);
  res.status(500).json({
    statusCode: 500,
    success: false,
    message: 'Internal Server Error'
  });
});

// ====================== Database Connection ======================
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/haircutDB');
    console.log('MongoDB Connected Successfully to haircutDB');
  } catch (error) {
    console.error(' MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

// ====================== Start Server ======================
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
      console.log(` API endpoint: http://localhost:${PORT}/api/books`);
      console.log(` Frontend: http://localhost:${PORT}`);
      console.log(` Health check: http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
  }
};

startServer();