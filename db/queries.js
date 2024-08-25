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
// insertGenre(genre)

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
// insertAuthor(author)

// BOOKS QUERIES
// getBook(id)
// getBookInformation(id)
// updateBook(book)
// deleteBook(id)
// insertBook(book)
// removeAuthorOffBooks(authorId)

// BOOKS_GENRES DB QUERIES
// deleteBookOffGenres(bookId)
// deleteGenreOffBooks(genreId)
// insertBookGenre(bookId, genreId)

module.exports = {
  getAllGenres,
  getAllAuthors,
  getGenre,
  getBooksByGenre,
  getAuthor,
  getBooksByAuthor,
};
