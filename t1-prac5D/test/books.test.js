// test/books.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');   // Import the Express app

const expect = chai.expect;

chai.use(chaiHttp);

describe('SIT725 Book API Tests', () => {

  // Clean up in-memory data before each test
  beforeEach(() => {
    global.books = [];   // Reset storage for test isolation
  });

  // =======================
  // CALCULATION FUNCTION TESTS
  // =======================
  describe('Book Calculation Function - calculateBookTotal()', () => {

    const { calculateBookTotal } = require('../src/utils/calculations');

    it('Valid behaviour: should correctly calculate total with default tax', () => {
      const result = calculateBookTotal(20, 5);
      expect(result).to.equal(110);
    });

    it('Valid behaviour: should accept custom tax rate', () => {
      const result = calculateBookTotal(10, 3, 0.2);
      expect(result).to.equal(36);
    });

    it('Error behaviour: should throw error for negative price', () => {
      expect(() => calculateBookTotal(-10, 2)).to.throw('Price must be a positive number');
    });

    it('Edge case: should handle zero tax rate', () => {
      const result = calculateBookTotal(25, 4, 0);
      expect(result).to.equal(100);
    });
  });

  // =======================
  // REST API ENDPOINT TESTS
  // =======================
  describe('Books REST API', () => {

    it('T01 | Valid create | POST /api/books | expected 201', (done) => {
      chai.request(app)
        .post('/api/books')
        .send({ title: "Test Book", price: 29.99 })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('title', 'Test Book');
          expect(res.body).to.have.property('id');
          done();
        });
    });

    it('T02 | Duplicate ID | POST /api/books | expected 409', (done) => {
      const bookData = { id: "duplicate123", title: "Duplicate Book", price: 19.99 };

      // First create
      chai.request(app)
        .post('/api/books')
        .send(bookData)
        .end(() => {
          // Try to create again with same ID
          chai.request(app)
            .post('/api/books')
            .send(bookData)
            .end((err, res) => {
              expect(res).to.have.status(409);
              done();
            });
        });
    });

    it('T03 | Immutable ID on update | PUT /api/books/:id | expected 400', (done) => {
      const bookData = { id: "immutable123", title: "Original", price: 25 };

      chai.request(app)
        .post('/api/books')
        .send(bookData)
        .end((err, res) => {
          const bookId = res.body.id;

          chai.request(app)
            .put(`/api/books/${bookId}`)
            .send({ id: "newId456", title: "Changed" })   // trying to change ID
            .end((err, res) => {
              expect(res).to.have.status(400);
              done();
            });
        });
    });

    it('T04 | Unknown field CREATE | POST /api/books | expected 400', (done) => {
      chai.request(app)
        .post('/api/books')
        .send({ 
          title: "Bad Book", 
          price: 15.99,
          secretField: "hacked"   // unknown field
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('T05 | Unknown field UPDATE | PUT /api/books/:id | expected 400', (done) => {
      chai.request(app)
        .post('/api/books')
        .send({ title: "Update Test", price: 30 })
        .end((err, res) => {
          const bookId = res.body.id;

          chai.request(app)
            .put(`/api/books/${bookId}`)
            .send({ 
              title: "Updated",
              price: 35,
              hackField: "bad" 
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              done();
            });
        });
    });

  });

});

// Close mongoose connection after all tests (safe even if not connected)
after(async () => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  } catch (e) {
    // ignore if mongoose not used
  }
});