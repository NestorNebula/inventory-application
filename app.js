const express = require('express');
require('dotenv').config();
const path = require('node:path');
const app = express();
const indexRouter = require('./routes/indexRouter');
const genresRouter = require('./routes/genresRouter');
const authorsRouter = require('./routes/authorsRouter');
const booksRouter = require('./routes/booksRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/genre', genresRouter);
app.use('/author', authorsRouter);
app.use('/book', booksRouter);

const PORT = process.env.PORT;
app.listen(PORT);
