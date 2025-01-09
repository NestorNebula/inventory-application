import * as db from '../db/queries';
import customError from '../modules/error';
import { NextFunction, Request, Response } from 'express';

function getIndexPage(req: Request, res: Response, next: NextFunction) {
  const genres = db.getAllGenres();
  const authors = db.getAllAuthors();
  Promise.all([genres, authors])
    .then((values) => {
      let letters = values[1].map((author) => author.name[0].toLowerCase());
      letters = letters
        .sort()
        .filter((letter, index) => letters.indexOf(letter) === index);
      res.render('index', {
        title: 'Inventory Homepage',
        genres: values[0],
        authors: values[1],
        letters: letters,
      });
    })
    .catch((error) => {
      console.error(error);
      next(
        new customError(
          "The server couldn't load the data.",
          500,
          'Server Error'
        )
      );
    });
}

export default { getIndexPage };
