import { Router } from 'express';
const genresRouter = Router();
import genresController from '../controllers/genresController';
import { validations } from '../modules/validation';
const { validateUpdatedGenre, validateNewGenre } = validations;

genresRouter.get('/:genre', genresController.getGenre);
genresRouter.post(
  '/:genre',
  validateUpdatedGenre,
  genresController.updateGenrePost
);
genresRouter.post('/:genre/delete', genresController.deleteGenrePost);
genresRouter.post('/', validateNewGenre, genresController.createGenrePost);

export default genresRouter;
