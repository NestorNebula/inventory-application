import { Router } from 'express';
const genresRouter = Router();
import genresController from '../controllers/genresController';

genresRouter.get('/:genre', genresController.getGenre);
genresRouter.post('/:genre', genresController.updateGenrePost);
genresRouter.post('/:genre/delete', genresController.deleteGenrePost);
genresRouter.post('/', genresController.createGenrePost);

export default genresRouter;
