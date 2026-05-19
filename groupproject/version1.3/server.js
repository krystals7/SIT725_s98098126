const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const haircutRoutes = require('./routes/haircutRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/haircuts', haircutRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

mongoose.connect('mongodb://127.0.0.1:27017/haircutDB')
  .then(() => {
    console.log('MongoDB connected to haircutDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Haircut API: http://localhost:${PORT}/api/haircuts`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });