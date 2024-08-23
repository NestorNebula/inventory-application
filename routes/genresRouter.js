const { Router } = require('express');
const genresRouter = Router();
const genresController = require('../controllers/genresController');

genresRouter.get('/:genre', genresController.getGenre);
genresRouter.post('/:genre', genresController.updateGenrePost);
genresRouter.post('/:genre/delete', genresController.deleteGenrePost);
genresRouter.post('/', genresController.createGenrePost);

module.exports = genresRouter;
