const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const vibesRouter = require('./routes/vibes');

const app = express();

mongoose.connect(process.env.DB_CONN, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
}, (err) => {
  if (err) {
    console.log('Yhteys ei toimi, tuli virhe' + err);
  } else {
    console.log('Yhteys kantaan toimii');
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cors sallii resurssien jaon kahden eri palvelimilla sijaitsevan
// sovelluksen kesken
// yksinkertaisin tapa ottaa cors käyttöön kaikille reiteille
// on mahdollista tehdä myös rajoituksia siihen mitä reittejä saa käyttää
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vibes', vibesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
