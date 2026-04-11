// test/setup.cjs
console.log(' Loading test setup...');

const app = require('../server');
const http = require('http');

// Start real HTTP server for SIT725 validation tests
const server = http.createServer(app);

server.listen(3000, () => {
  console.log(' TEST SERVER STARTED on http://localhost:3000');
});

const chai = require('chai');
const chaiHttp = require('chai-http');

console.log('✓ Chai version:', chai.version);
console.log('✓ Chai-HTTP type:', typeof chaiHttp);

chai.use(chaiHttp);

global.expect = chai.expect;
global.chai = chai;

console.log(' Setup completed successfully! Chai-HTTP is ready.');

// Close server when tests finish (using process hook instead of Mocha hook)
process.on('exit', () => {
  server.close(() => {
    console.log(' Test server closed');
  });
});
