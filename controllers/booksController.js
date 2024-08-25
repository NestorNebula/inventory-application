const db = require('../db/queries');
const customError = require('../modules/error');

async function getBook(req, res, next) {
  const results = await db.getBookInformations(req.params.book);
  if (!results.length) {
    next(
      new customError(
        "The book you searched doesn't exist.",
        404,
        'Book Not Found'
      )
    );
  }
  res.render('book', { book: results[0], genres: results });
}

function updateBookPost() {}

function deleteBookPost() {}

function createBookPost() {}

module.exports = { getBook, updateBookPost, deleteBookPost, createBookPost };
