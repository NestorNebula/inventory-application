const db = require('../db/queries');
const customError = require('../modules/error');

function getAuthor(req, res) {
  const author = db.getAuthor(req.params.author);
  const books = db.getBooksByAuthor(req.params.author);
  Promise.all([author, books])
    .then((values) => {
      res.render('author', { author: values[0][0], books: values[1] });
    })
    .catch((error) => {
      console.error(error);
      throw new customError(
        "The server couldn't load the data you required.",
        500,
        'Server Error'
      );
    });
}

function updateAuthorPost() {}

function deleteAuthorPost() {}

function createAuthorPost() {}

module.exports = {
  getAuthor,
  updateAuthorPost,
  deleteAuthorPost,
  createAuthorPost,
};
