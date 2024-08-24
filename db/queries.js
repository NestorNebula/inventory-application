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
// getGenre(id)
// getBooksByGenre(id)
// updateGenre(genre)
// deleteGenre(id)
// insertGenre(genre)

// AUTHORS QUERIES
// getAuthor(id)
// getBooksByAuthor(id)
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

module.exports = { getAllGenres, getAllAuthors };
