const db = require('../db/queries');
const customError = require('../modules/error');
const { body, validationResult } = require('express-validator');

const alphaErr = 'The genre must only contain letters.';
const lengthErr = "The genre's length must be between 5 and 20 characters.";

const validateNewGenre = [
  body('newgenre')
    .trim()
    .isAlpha()
    .withMessage(alphaErr)
    .isLength({ min: 5, max: 20 })
    .withMessage(lengthErr),
];

const validateUpdatedGenre = [
  body('updated_genre')
    .trim()
    .isAlpha()
    .withMessage(alphaErr)
    .isLength({ min: 5, max: 20 })
    .withMessage(lengthErr),
];

function getGenre(req, res, next) {
  const genre = db.getGenre(req.params.genre);
  const books = db.getBooksByGenre(req.params.genre);
  Promise.all([genre, books])
    .then((values) => {
      res.render('genre', { genre: values[0][0], books: values[1] });
    })
    .catch((error) => {
      console.error(error);
      next(
        new customError(
          "The server couldn't load the data you required.",
          500,
          'Server Error'
        )
      );
    });
}

const updateGenrePost = [
  validateUpdatedGenre,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorList = errors.array();
      const messages = [];
      errorList.forEach((error) => messages.push(error.msg));
      const message = messages.join(' ');
      next(
        new customError(
          `The form wasn't submitted correctly. ${message}`,
          400,
          'Incorrect Form'
        )
      );
      return;
    }
    const genre = {
      genre: req.body.updated_genre,
      id: +req.params.genre,
    };
    await db.updateGenre(genre);
    res.redirect(`/genre/${genre.id}`);
  },
];

function deleteGenrePost() {}

const createGenrePost = [
  validateNewGenre,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorList = errors.array();
      const messages = [];
      errorList.forEach((error) => messages.push(error.msg));
      const message = messages.join(' ');
      next(
        new customError(
          `The form wasn't submitted correctly. ${message}`,
          400,
          'Incorrect Form'
        )
      );
      return;
    }
    const { newgenre } = req.body;
    const same = await db.getGenreByName(newgenre);
    if (same.length > 0) {
      next(
        new customError(
          'This genre already exists.',
          400,
          'Genre already exists'
        )
      );
      return;
    }
    await db.insertGenre(newgenre);
    res.redirect('/');
  },
];

module.exports = {
  getGenre,
  updateGenrePost,
  deleteGenrePost,
  createGenrePost,
};
