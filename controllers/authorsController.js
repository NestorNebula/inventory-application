const db = require('../db/queries');
const customError = require('../modules/error');
const { validationResult } = require('express-validator');
const { validations, getErrorMessage } = require('../modules/validation');
const { validateNewAuthor, validateUpdatedAuthor } = validations;

function getAuthor(req, res, next) {
  const author = db.getAuthor(req.params.author);
  const books = db.getBooksByAuthor(req.params.author);
  Promise.all([author, books])
    .then((values) => {
      res.render('author', { author: values[0][0], books: values[1] });
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

const updateAuthorPost = [
  validateUpdatedAuthor,
  async (req, res) => {
    const author = {
      name: req.body.updated_author,
      id: +req.params.author,
    };
    await db.updateAuthor(author);
    res.redirect(`/author/${author.id}`);
  },
];

function deleteAuthorPost() {}

const createAuthorPost = [
  validateNewAuthor,
  async (req, res, next) => {
    const { newauthor } = req.body;
    await db.insertAuthor(newauthor);
    const same = await db.getAuthorByName(newauthor);
    if (same.length > 0) {
      next(
        new customError(
          'This author already exists.',
          400,
          'Author already exists'
        )
      );
      return;
    }
    await db.insertAuthor(newauthor);
    res.redirect('/');
  },
];

module.exports = {
  getAuthor,
  updateAuthorPost,
  deleteAuthorPost,
  createAuthorPost,
};
