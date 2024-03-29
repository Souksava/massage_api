var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var employeeRouter = require('./routes/employee');
var exchangeRouter = require('./routes/exchange');
var massageTypeRouter = require('./routes/massage_category');
var packageMassageRouter = require('./routes/package_massage');
var payMassageRouter = require('./routes/pay_massage');
var roomTypeRouter = require('./routes/room_type');
var roomRouter = require('./routes/room');
var usernameRouter = require('./routes/username');
var authenRouter = require('./routes/authen');
var shopsRouter = require('./routes/shop');
var reportRouter = require('./routes/report');
var perzenEmpRouter = require('./routes/perzen_emp');
var billRouter = require('./routes/bill');

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
app.use('/api/v1/exchange', exchangeRouter);
app.use('/api/v1/massagecategory', massageTypeRouter);
app.use('/api/v1/package', packageMassageRouter);
app.use('/api/v1/pay', payMassageRouter);
app.use('/api/v1/roomtype', roomTypeRouter);
app.use('/api/v1/room', roomRouter);
app.use('/api/v1/username', usernameRouter);
app.use('/api/v1/authen', authenRouter);
app.use('/api/v1/shop', shopsRouter);
app.use('/api/v1/report', reportRouter);
app.use('/api/v1/perzenemp', perzenEmpRouter);
app.use('/api/v1/bill', billRouter);



app.get('*', function (req, res) {
  let resp = {
    status: 404,
    msg: "path not found"
  }
  res.status(404).send(resp);
});
app.post('*', function (req, res) {
  let resp = {
    status: 404,
    msg: "path not found"
  }
  res.status(404).send(resp);
});
app.put('*', function (req, res) {
  let resp = {
    status: 404,
    msg: "path not found"
  }
  res.status(404).send(resp);
});
app.patch('*', function (req, res) {
  let resp = {
    status: 404,
    msg: "path not found"
  }
  res.status(404).send(resp);
});
app.delete('*', function (req, res) {
  let resp = {
    status: 404,
    msg: "path not found"
  }
  res.status(404).send(resp);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
