const db = require('../db/queries');
const customError = require('../modules/error');

function getIndexPage(req, res, next) {
  const genres = db.getAllGenres();
  const authors = db.getAllAuthors();
  Promise.all([genres, authors])
    .then((values) => {
      res.render('index', {
        title: 'Inventory Homepage',
        genres: values[0],
        authors: values[1],
      });
    })
    .catch((error) => {
      console.error(error);
      next(
        new customError(
          "The server couldn't load the data.",
          500,
          'Server Error'
        )
      );
    });
}

module.exports = { getIndexPage };
