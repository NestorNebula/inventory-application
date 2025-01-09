import { Router } from 'express';
const booksRouter = Router();
import booksController from '../controllers/booksController';

booksRouter.get('/:book', booksController.getBook);
booksRouter.post('/:book', booksController.updateBookPost);
booksRouter.post('/:book/delete', booksController.deleteBookPost);
booksRouter.post('/', booksController.createBookPost);

export default booksRouter;
