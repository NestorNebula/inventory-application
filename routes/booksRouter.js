const { Router } = require('express');
const booksRouter = Router();
const booksController = require('../controllers/booksController');

booksRouter.get('/:book', booksController.getBook);
booksRouter.post('/:book', booksController.updateBookPost);
booksRouter.post('/:book/delete', booksController.deleteBookPost);
booksRouter.post('/', booksController.createBookPost);

module.exports = booksRouter;
