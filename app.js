var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var employeeRouter = require('./routes/employee');
var massageTypeRouter = require('./routes/massage_category');
var packageMassageRouter = require('./routes/package_massage');
var payMassageRouter = require('./routes/pay_massage');
var roomTypeRouter = require('./routes/room_type');
var roomRouter = require('./routes/room');
var usernameRouter = require('./routes/username');
var authenRouter = require('./routes/authen');
var reportRouter = require('./routes/report');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/massagecategory', massageTypeRouter);
app.use('/api/v1/package', packageMassageRouter);
app.use('/api/v1/pay', payMassageRouter);
app.use('/api/v1/roomtype', roomTypeRouter);
app.use('/api/v1/room', roomRouter);
app.use('/api/v1/username', usernameRouter);
app.use('/api/v1/authen', authenRouter);
app.use('/api/v1/report', reportRouter);

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
