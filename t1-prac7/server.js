const express = require('express');
const app = express();
const http = require('http').createServer(app); 
const io = require('socket.io')(http);         

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  const interval = setInterval(() => {
    const now = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    socket.emit('time', now);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    clearInterval(interval);
  });
});

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
