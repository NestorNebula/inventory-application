const { body } = require('express-validator');
require('dotenv').config();

const errorsMessage = {
  genreAlphaErr: 'The genre must only contain letters.',
  genreLengthErr: "The genre's length must be between 5 and 20 characters.",
  authorAlphaErr: 'The author must only contain letters.',
  authorLengthErr:
    'The author name length must be between 5 and 25 characters.',
  titleLengthErr: 'The book title length must be between 5 and 50 characters.',
  plotLengthErr: 'The plot length must be between 1000 characters maximum.',
  pagesNumErr: 'Pages must be a number.',
  passwordErr: 'Password is incorrect.',
  noGenreErr: 'You must select at least one genre.',
};

const validations = {
  validateNewGenre: [
    body('newgenre')
      .trim()
      .isAlpha('en-US', { ignore: ' ' })
      .withMessage(errorsMessage.genreAlphaErr)
      .isLength({ min: 5, max: 20 })
      .withMessage(errorsMessage.genreLengthErr),
  ],
  validateUpdatedGenre: [
    body('updated_genre')
      .trim()
      .isAlpha('en-US', { ignore: ' ' })
      .withMessage(errorsMessage.genreAlphaErr)
      .isLength({ min: 5, max: 20 })
      .withMessage(errorsMessage.genreLengthErr),
    body('password')
      .equals(process.env.PASSWD)
      .withMessage(errorsMessage.passwordErr),
  ],
  validateNewAuthor: [
    body('newauthor')
      .trim()
      .isAlpha('en-US', { ignore: ' ' })
      .withMessage(errorsMessage.authorAlphaErr)
      .isLength({ min: 5, max: 25 })
      .withMessage(errorsMessage.authorLengthErr),
  ],
  validateUpdatedAuthor: [
    body('updated_author')
      .trim()
      .isAlpha('en-US', { ignore: ' ' })
      .withMessage(errorsMessage.authorAlphaErr)
      .isLength({ min: 5, max: 25 })
      .withMessage(errorsMessage.authorLengthErr),
    body('password')
      .equals(process.env.PASSWD)
      .withMessage(errorsMessage.passwordErr),
  ],
  validateBook: [
    body('title')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage(errorsMessage.titleLengthErr)
      .blacklist('<>'),
    body('pages').trim().isNumeric().withMessage(errorsMessage.pagesNumErr),
    body('plot')
      .trim()
      .blacklist('<>')
      .isLength({ max: 1000 })
      .withMessage(errorsMessage.plotLengthErr),
    body('book_genres').not().isEmpty().withMessage(errorsMessage.noGenreErr),
  ],
  validateUpdatedBook: [
    body('title')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage(errorsMessage.titleLengthErr)
      .blacklist('<>'),
    body('pages').trim().isNumeric().withMessage(errorsMessage.pagesNumErr),
    body('plot')
      .trim()
      .blacklist('<>')
      .isLength({ max: 1000 })
      .withMessage(errorsMessage.plotLengthErr),
    body('book_genres').not().isEmpty().withMessage(errorsMessage.noGenreErr),
    body('password')
      .equals(process.env.PASSWD)
      .withMessage(errorsMessage.passwordErr),
  ],
};

const getErrorMessage = (errors) => {
  const errorList = errors.array();
  const messages = errorList.map((error) => error.msg);
  return messages.join(' ');
};

module.exports = {
  validations,
  getErrorMessage,
};
