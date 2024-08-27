const { body } = require('express-validator');

const errorsMessage = {
  genreAlphaErr: 'The genre must only contain letters.',
  genreLengthErr: "The genre's length must be between 5 and 20 characters.",
  authorAlphaErr: 'The author must only contain letters.',
  authorLengthErr:
    'The author name length must be between 5 and 25 characters.',
  titleLengthErr: 'The book title length must be between 5 and 50 characters.',
  plotLengthErr: 'The plot length must be between 1000 characters maximum.',
  pagesNumErr: 'Pages must be a number.',
};

const validations = {
  validateNewGenre: [
    body('newgenre')
      .trim()
      .isAlpha()
      .withMessage(errorsMessage.genreAlphaErr)
      .isLength({ min: 5, max: 20 })
      .withMessage(errorsMessage.genreLengthErr),
  ],
  validateUpdatedGenre: [
    body('updated_genre')
      .trim()
      .isAlpha()
      .withMessage(errorsMessage.genreAlphaErr)
      .isLength({ min: 5, max: 20 })
      .withMessage(errorsMessage.genreLengthErr),
  ],
  validateNewAuthor: [
    body('newauthor')
      .trim()
      .isAlpha()
      .withMessage(errorsMessage.authorAlphaErr)
      .isLength({ min: 5, max: 25 })
      .withMessage(errorsMessage.authorLengthErr),
  ],
  validateUpdatedAuthor: [
    body('updated_author')
      .trim()
      .isAlpha()
      .withMessage(errorsMessage.authorAlphaErr)
      .isLength({ min: 5, max: 25 })
      .withMessage(errorsMessage.authorLengthErr),
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
    body('book_genres').not().isEmpty(),
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
