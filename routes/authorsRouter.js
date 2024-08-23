const { Router } = require('express');
const authorsRouter = Router();
const authorsControllers = require('../controllers/authorsController');

authorsRouter.get('/:author', authorsControllers.getAuthor);
authorsRouter.post('/:author', authorsControllers.updateAuthorPost);
authorsRouter.post('/:author/delete', authorsControllers.deleteAuthorPost);
authorsRouter.post('/', authorsControllers.createAuthorPost);

module.exports = authorsRouter;
