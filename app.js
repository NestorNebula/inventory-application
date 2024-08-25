const express = require('express');
require('dotenv').config();
const path = require('node:path');
const app = express();
const indexRouter = require('./routes/indexRouter');
const genresRouter = require('./routes/genresRouter');
const authorsRouter = require('./routes/authorsRouter');
const booksRouter = require('./routes/booksRouter');
const customError = require('./modules/error');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/genre', genresRouter);
app.use('/author', authorsRouter);
app.use('/book', booksRouter);
app.use((req, res, next) => {
  throw new customError("This page doesn't exist.", 404, 'Page not found');
});

app.use((err, req, res, next) => {
  console.error(err);
  err instanceof customError
    ? res.render('error', { error: err })
    : res.status(500).send('Unknown Error');
});

const PORT = process.env.PORT;
app.listen(PORT);
