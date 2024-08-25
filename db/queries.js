const pool = require('./pool');

// GENERAL QUERIES
async function getAllGenres() {
  const { rows } = await pool.query('SELECT * FROM genres');
  return rows;
}

async function getAllAuthors() {
  const { rows } = await pool.query('SELECT * FROM authors');
  return rows;
}

// GENRES QUERIES
async function getGenre(id) {
  const { rows } = await pool.query('SELECT * FROM genres WHERE id = $1', [id]);
  return rows;
}

async function getBooksByGenre(id) {
  const { rows } = await pool.query(
    'SELECT * FROM books AS b INNER JOIN books_genres AS bg ON b.id = bg.book_id WHERE bg.genre_id = $1',
    [id]
  );
  return rows;
}
// updateGenre(genre)
// deleteGenre(id)
async function insertGenre(genre) {
  await pool.query(
    "INSERT INTO genres (genre, image) VALUES ($1, 'template.jpg')",
    [genre]
  );
}

// AUTHORS QUERIES
async function getAuthor(id) {
  const { rows } = await pool.query('SELECT * FROM authors WHERE id = $1', [
    id,
  ]);
  return rows;
}

async function getBooksByAuthor(id) {
  const { rows } = await pool.query(
    'SELECT * FROM books AS b INNER JOIN authors AS a ON b.author_id = a.id WHERE b.author_id = $1',
    [id]
  );
  return rows;
}
// updateAuthor(author)
// deleteAuthor(id)
async function insertAuthor(author) {
  await pool.query('INSERT INTO authors (name) VALUES ($1)', [author]);
}

// BOOKS QUERIES
async function getBookInformations(id) {
  const { rows } = await pool.query(
    'SELECT title, pages, plot, author_id, genre_id, genre, name FROM books AS b LEFT JOIN books_genres AS bg ON b.id = bg.book_id LEFT JOIN genres AS g ON bg.genre_id = g.id LEFT JOIN authors AS a ON b.author_id = a.id WHERE b.id = $1',
    [id]
  );
  return rows;
}
// updateBook(book)
// deleteBook(id)
async function insertBook(book) {
  await pool.query(
    'INSERT INTO books (title, pages, plot, author_id) VALUES ($1, $2, $3, $4)',
    [book.title, book.pages, book.plot, book.author_id]
  );
}
// removeAuthorOffBooks(authorId)

// BOOKS_GENRES DB QUERIES
// deleteBookOffGenres(bookId)
// deleteGenreOffBooks(genreId)
async function insertBookGenre(bookId, genreId) {
  await pool.query(
    'INSERT INTO books_genres (book_id, genre_id) VALUES ($1, $2)',
    [bookId, genreId]
  );
}

module.exports = {
  getAllGenres,
  getAllAuthors,
  getGenre,
  getBooksByGenre,
  getAuthor,
  getBooksByAuthor,
  getBookInformations,
  insertGenre,
  insertAuthor,
  insertBook,
  insertBookGenre,
};
