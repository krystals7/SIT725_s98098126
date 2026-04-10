const mongoose = require('mongoose');
const Book = require('../models/bookModel');

const booksData = [
  {
    id: "b1",
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2008,
    genre: "Science Fiction",
    price: 17.25,
    summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy. The series portrays a fictional past, present, and future wherein Earth encounters an alien civilization from a nearby system of three Sun-like stars orbiting one another, a representative example of the three-body problem in orbital mechanics."
  },
  {
    id: "b2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    price: 15.75,
    summary: "An orphaned governess confronts class, morality, and love at Thornfield Hall, uncovering Mr. Rochester’s secret and forging her own independence."
  },
  {
    id: "b3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Classic",
    price: 12.99,
    summary: "Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations in a sharp study of manners and marriage."
  },
  {
    id: "b4",
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    price: 19.99,
    summary: "In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts confront memory, identity, and loss."
  },
  {
    id: "b5",
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    price: 14.50,
    summary: "In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma, empire, and the nature of belief. The Discworld is flat and is orbited by its sun, but Omnian"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/bookDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(' Connected to MongoDB');

    // Create unique index on id (if not exists)
    await Book.collection.createIndex({ id: 1 }, { unique: true });

    // Delete existing books and insert new ones
    await Book.deleteMany({});
    console.log('  Cleared existing books');

    const result = await Book.insertMany(booksData);
    console.log(` Successfully seeded ${result.length} books into the database`);

  } catch (error) {
    console.error(' Seeding failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seeder
seedDatabase();