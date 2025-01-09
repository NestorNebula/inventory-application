import { Router } from 'express';
const authorsRouter = Router();
import authorsControllers from '../controllers/authorsController';
import { validations } from '../modules/validation';
const { validateUpdatedAuthor, validateNewAuthor } = validations;

authorsRouter.get('/:author', authorsControllers.getAuthor);
authorsRouter.post(
  '/:author',
  validateUpdatedAuthor,
  authorsControllers.updateAuthorPost
);
authorsRouter.post('/:author/delete', authorsControllers.deleteAuthorPost);
authorsRouter.post('/', validateNewAuthor, authorsControllers.createAuthorPost);

export default authorsRouter;
