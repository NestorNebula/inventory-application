import * as db from '../db/queries';
import customError from '../modules/error';
import { validationResult } from 'express-validator';
import { getErrorMessage } from '../modules/validation';
import { NextFunction, Request, Response } from 'express';
require('dotenv').config();

function getAuthor(req: Request, res: Response, next: NextFunction) {
  const author = db.getAuthor(+req.params.author);
  const books = db.getBooksByAuthor(+req.params.author);
  Promise.all([author, books])
    .then((values) => {
      res.render('author', { author: values[0][0], books: values[1] });
    })
    .catch((error) => {
      console.error(error);
      next(
        new customError(
          "The server couldn't load the data you required.",
          500,
          'Server Error'
        )
      );
    });
}

const updateAuthorPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = getErrorMessage(errors);
    next(
      new customError(
        `The form wasn't submitted correctly. ${message}`,
        400,
        'Incorrect Form'
      )
    );
    return;
  }
  const author = {
    name: req.body.updated_author,
    id: +req.params.author,
  };
  await db.updateAuthor(author);
  res.redirect(`/author/${author.id}`);
};

async function deleteAuthorPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.password !== process.env.PASSWD) {
    next(
      new customError(
        "Can't delete the author, the password is incorrect.",
        400,
        'Incorrect Password'
      )
    );
    return;
  }
  await db.removeAuthorFromBooks(+req.params.author);
  await db.deleteAuthor(+req.params.author);
  res.redirect('/');
}

const createAuthorPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = getErrorMessage(errors);
    next(
      new customError(
        `The form wasn't submitted correctly. ${message}`,
        400,
        'Incorrect Form'
      )
    );
    return;
  }
  const { newauthor } = req.body;
  const same = await db.getAuthorByName(newauthor);
  if (same.length > 0) {
    next(
      new customError(
        'This author already exists.',
        400,
        'Author already exists'
      )
    );
    return;
  }
  await db.insertAuthor(newauthor);
  res.redirect('/');
};

export default {
  getAuthor,
  updateAuthorPost,
  deleteAuthorPost,
  createAuthorPost,
};
