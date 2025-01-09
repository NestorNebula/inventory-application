import { Router } from 'express';
const booksRouter = Router();
import booksController from '../controllers/booksController';
import { validations } from '../modules/validation';
const { validateUpdatedBook, validateBook } = validations;

booksRouter.get('/:book', booksController.getBook);
booksRouter.post('/:book', validateUpdatedBook, booksController.updateBookPost);
booksRouter.post('/:book/delete', booksController.deleteBookPost);
booksRouter.post('/', validateBook, booksController.createBookPost);

export default booksRouter;
