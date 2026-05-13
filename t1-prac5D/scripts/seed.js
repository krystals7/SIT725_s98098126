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
  },
  {
    id: "b6",
    title: "random book",
    author: "kathrine petersen",
    year: 2010,
    genre: "romance",
    price: 19.50,
    summary: "random book"
  },
  {
    id: "b7",
    title: "random book 2",
    author: "some person",
    year: 2012,
    genre: "adventure",
    price: 25.40,
    summary: "random book 2"
  },
  {
    id: "b8",
    title: "random book 3",
    author: "random person",
    year: 2025,
    genre: "comedy",
    price: 16.95,
    summary: "random book 3"
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bookDB');
    console.log('Connected to MongoDB');

    // Clear existing data
    const deleteResult = await Book.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing books`);

    // Insert new data
    const result = await Book.insertMany(booksData);
    console.log(`Successfully seeded ${result.length} books`);

    // Verify by counting
    const count = await Book.countDocuments();
    console.log(`Total books in DB after seeding: ${count}`);

  } catch (error) {
    console.error('Seeding failed:');
    console.error(error);           // Full error
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

seedDatabase();