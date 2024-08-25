const db = require('../db/queries');
const customError = require('../modules/error');

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

function updateAuthorPost() {}

function deleteAuthorPost() {}

async function createAuthorPost(req, res) {
  const { newauthor } = req.body;
  await db.insertAuthor(newauthor);
  const same = await db.getAuthorByName(newauthor);
  if (same.length > 0) {
    alert('This author already exists.');
  } else {
    await db.insertAuthor(newauthor);
  }
  res.redirect('/');
}

module.exports = {
  getAuthor,
  updateAuthorPost,
  deleteAuthorPost,
  createAuthorPost,
};
