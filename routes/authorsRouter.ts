import { Router } from 'express';
const authorsRouter = Router();
import authorsControllers from '../controllers/authorsController';

authorsRouter.get('/:author', authorsControllers.getAuthor);
authorsRouter.post('/:author', authorsControllers.updateAuthorPost);
authorsRouter.post('/:author/delete', authorsControllers.deleteAuthorPost);
authorsRouter.post('/', authorsControllers.createAuthorPost);

export default authorsRouter;
