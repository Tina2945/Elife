var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/member/register');
var login = require('./routes/member/login');
var supplier = require('./routes/supplier/supplier');
var third = require('./routes/third/third');
var namelist = require('./routes/third/namelist');
var product = require('./routes/supplier/product');
var home = require('./routes/member/home');
var thirdlogin = require('./routes/third/thirdlogin');
var supplierlogin = require('./routes/supplier/supplierlogin');
var personal_info = require('./routes/member/personal_info');
var purchase_rec = require('./routes/member/purchase_rec');
var shopping_cart = require('./routes/member/shopping_cart');
var fruits_store = require('./routes/member/fruits_store');
var order_suc = require('./routes/member/order_suc');
var zmq = require('zeromq');
var zreq = zmq.socket('req');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret : 'HelloExpressSESSION'}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/supplier', supplier);
app.use('/third', third);
app.use('/namelist', namelist);
app.use('/login', login);
app.use('/supplierlogin', supplierlogin);
app.use('/thirdlogin', thirdlogin);
app.use('/personal_info', personal_info);
app.use('/purchase_rec', purchase_rec);
app.use('/shopping_cart', shopping_cart);
app.use('/fruits_store', fruits_store);
app.use('/order_suc', order_suc);
app.use('/home', home);
app.use('/product', product);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
