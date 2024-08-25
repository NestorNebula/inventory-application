const db = require('../db/queries');
const customError = require('../modules/error');

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

function updateGenrePost() {}

function deleteGenrePost() {}

function createGenrePost() {}

module.exports = {
  getGenre,
  updateGenrePost,
  deleteGenrePost,
  createGenrePost,
};
