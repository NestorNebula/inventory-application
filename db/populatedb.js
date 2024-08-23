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
