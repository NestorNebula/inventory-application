import express, { NextFunction, Request, Response } from 'express';
require('dotenv').config();
import path from 'node:path';
const app = express();
import indexRouter from './routes/indexRouter';
import genresRouter from './routes/genresRouter';
import authorsRouter from './routes/authorsRouter';
import booksRouter from './routes/booksRouter';
import CustomError from './modules/error';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/genre', genresRouter);
app.use('/author', authorsRouter);
app.use('/book', booksRouter);
app.use(() => {
  throw new CustomError("This page doesn't exist.", 404, 'Page not found');
});

app.use(
  (
    err: CustomError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    err instanceof CustomError
      ? res.render('error', { error: err })
      : res.status(500).send('Unknown Error');
  }
);

const PORT = process.env.PORT;
app.listen(PORT);
