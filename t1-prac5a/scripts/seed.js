const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/foodDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

  mongoose.connect('mongodb://127.0.0.1:27017/bookDB');

const bookItems = require('../models/bookModel');

const sampleData = [
  {
    id: "b1",
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2008,
    genre: "Science Fiction",
    // summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy. The series portrays a fictional past, present, and future wherein Earth encounters an alien civilization from a nearby system of three Sun-like stars orbiting one another, a representative example of the three-body problem in orbital mechanics"
  }
];

(async () => {
  try {
    // ensure unique on id (good practice)
    await bookItems.collection.createIndex({ id: 1 }, { unique: true });

    // clear and insert
    await bookItems.deleteMany({});
    await bookItems.insertMany(sampleData);

    console.log('Seeded 5 book items.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();