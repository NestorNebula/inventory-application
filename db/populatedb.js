const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR(20) NOT NULL
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
  genre_id INTEGER REFERENCES genres(id)
);

INSERT INTO genres (genre)
VALUES
  ('Action/Adventure'), ('Biography'), ('Classic'), ('Comic/Graphic Novel'), ('Dystopian'), ('Essay'), ('Fantasy'), ('Historical Fiction'), ('Horror'), ('Mystery'), ('Poetry'), ('Romance'), ('Science Fiction'), ('Suspense/Thriller'); 

INSERT INTO authors (name)
VALUES
  ('Lewis Carroll'), ('Agatha Christie'), ('Paulo Coelho'), ('Ian Fleming'), ('Stephen King'), ('Masashi Kishimoto'), ('C. S. Lewis'), ('Stephenie Meyer'), ('James Patterson'), ('Beatrix Potter'), ('Anne Rice'), ('J. K. Rowling'), ('William Shakespeare'), ('Georges Simenon'), ('J. R. R. Tolkien'), ('Leo Tolstoy'), ('Akira Toriyama');
`;

async function main() {
  const client = new Client({
    connectionString: process.env.LOCAL_DB,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();
