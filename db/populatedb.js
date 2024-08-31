const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR(20) NOT NULL,
  image VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(50) NOT NULL,
  pages INTEGER NOT NULL,
  plot TEXT,
  author_id INTEGER REFERENCES authors(id)
);

CREATE TABLE IF NOT EXISTS books_genres (
  book_id INTEGER REFERENCES books(id),
  genre_id INTEGER REFERENCES genres(id),
  CONSTRAINT unique_genre_book UNIQUE (book_id, genre_id)
);

INSERT INTO genres (genre, image)
VALUES
  ('Action/Adventure', 'adventure.jpeg'), ('Biography', 'biography.jpg'), ('Classic', 'classic.jpg'), ('Comic/Graphic Novel', 'comics.jpg'), ('Dystopian', 'dystopia.jpg'), ('Essay', 'essay.jpg'), ('Fantasy', 'fantasy.jpg'), ('Historical Fiction', 'historical.jpg'), ('Horror', 'horror.jpg'), ('Mystery', 'mystery.jpg'), ('Poetry', 'poetry.jpg'), ('Romance', 'romance.jpg'), ('Science Fiction', 'sciencefiction.jpg'), ('Suspense/Thriller', 'thriller.jpg'), ('Children\''s Book', 'childrenbook.jpg'); 

INSERT INTO authors (name)
VALUES
  /* Add Authors here */

INSERT INTO books (title, pages, plot, author_id)
VALUES
  /* Add Books here */

INSERT INTO books_genres (book_id, genre_id)
VALUES
  /* Add Books genres here */
`;

async function main() {
  const client = new Client({
    connectionString: process.env.PRODUCTION_DB,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();
