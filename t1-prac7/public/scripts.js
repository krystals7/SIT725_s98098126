const socket = io();   

const timeElement = document.getElementById('time'); 

// Listen for server time
socket.on('time', (serverTime) => {
  if (timeElement) {
    timeElement.textContent = serverTime;
  }
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});