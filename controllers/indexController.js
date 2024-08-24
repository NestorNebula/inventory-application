const db = require('../db/queries');

function getIndexPage(req, res) {
  const genres = db.getAllGenres();
  const authors = db.getAllAuthors();
  Promise.all([genres, authors]).then((values) => {
    res.render('index', {
      title: 'Inventory Homepage',
      genres: values[0],
      authors: values[1],
    });
  });
}

module.exports = { getIndexPage };
