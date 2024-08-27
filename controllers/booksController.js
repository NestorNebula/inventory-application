const db = require('../db/queries');
const customError = require('../modules/error');
const { body, validationResult } = require('express-validator');

const titleLengthErr =
  'The book title length must be between 5 and 50 characters.';
const plotLengthErr =
  'The plot length must be between 1000 characters maximum.';
const numErr = 'Pages must be a number.';

const validateBook = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage(titleLengthErr)
    .blacklist('<>'),
  body('pages').trim().isNumeric().withMessage(numErr),
  body('plot')
    .trim()
    .blacklist('<>')
    .isLength({ max: 1000 })
    .withMessage(plotLengthErr),
  body('book_genres').not().isEmpty(),
];

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
  const genres = db.getAllGenres();
  const authors = db.getAllAuthors();
  Promise.all([genres, authors])
    .then((values) => {
      res.render('book', {
        id: req.params.book,
        book: results[0],
        book_genres: results,
        genres: values[0],
        authors: values[1],
      });
    })
    .catch((error) => {
      console.error(error);
      next(
        new customError(
          "The server couldn't load the data you required",
          500,
          'Server error'
        )
      );
    });
}

const updateBookPost = [
  validateBook,
  async (req, res) => {
    const book = {
      id: +req.params.book,
      title: req.body.title,
      pages: +req.body.pages,
      plot: req.body.plot,
      author_id: req.body.author_id === 'none' ? null : +req.body.author_id,
      genres: Array.isArray(req.body.book_genres)
        ? req.body.book_genres
        : [req.body.book_genres],
    };
    await db.updateBook(book);
    await db.deleteOldGenre(book.id, book.genres);
    for (let i = 0; i < book.genres.length; i++) {
      await db.insertBookGenre(book.id, +book.genres[i]);
    }
    res.redirect('/');
  },
];

function deleteBookPost() {}

const createBookPost = [
  validateBook,
  async (req, res, next) => {
    const book = {
      title: req.body.title,
      pages: +req.body.pages,
      plot: req.body.plot || null,
      author_id: req.body.author_id === 'none' ? null : +req.body.author_id,
      genres: Array.isArray(req.body.book_genres)
        ? req.body.book_genres
        : [req.body.book_genres],
    };
    const same = await db.getBookByTitle(book.title);
    if (same.length > 0) {
      next(
        new customError('The book already exists.', 400, 'Book already exists')
      );
      return;
    }
    await db.insertBook(book);
    const [bookId] = await db.getBookByTitle(book.title);
    if (!bookId) {
      next(
        new customError(
          'There was an error when the book was included in the database.',
          500,
          'Server Error'
        )
      );
      return;
    }
    for (let i = 0; i < book.genres.length; i++) {
      await db.insertBookGenre(bookId.id, +book.genres[i]);
    }
    res.redirect('/');
  },
];

module.exports = { getBook, updateBookPost, deleteBookPost, createBookPost };
