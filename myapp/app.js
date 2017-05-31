var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

//member
var register = require('./routes/member/register');
var login = require('./routes/member/login');
var home = require('./routes/member/home');
var personal_info = require('./routes/member/personal_info');
var purchase_rec = require('./routes/member/purchase_rec');
var shopping_cart = require('./routes/member/shopping_cart');
var store = require('./routes/member/store');
var order_suc = require('./routes/member/order_suc');
var personal_edit = require('./routes/member/personal_edit');

//supplier
var supplier = require('./routes/supplier/supplier');
var supplierlogin = require('./routes/supplier/supplierlogin');
var product = require('./routes/supplier/product');
var supplier_info = require('./routes/supplier/supplier_info');
var order = require('./routes/supplier/order');
var supplier_edit = require('./routes/supplier/supplier_edit');

//third
var third = require('./routes/third/third');
var thirdlogin = require('./routes/third/thirdlogin');
var third_order = require('./routes/third/third_order');
var my_order = require('./routes/third/my_order');
var history = require('./routes/third/history');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({ secret: 'HelloExpressSESSION' }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//member
app.use('/register', register);
app.use('/login', login);
app.use('/home', home);
app.use('/personal_info', personal_info);
app.use('/purchase_rec', purchase_rec);
app.use('/shopping_cart', shopping_cart);
app.use('/store', store);
app.use('/order_suc', order_suc);
app.use('/personal_edit', personal_edit);

//supplier
app.use('/supplier', supplier);
app.use('/supplierlogin', supplierlogin);
app.use('/product', product);
app.use('/supplier_info', supplier_info);
app.use('/order', order);
app.use('/supplier_edit', supplier_edit);

//third
app.use('/third', third);
app.use('/thirdlogin', thirdlogin);
app.use('/third_order', third_order);
app.use('/my_order', my_order);
app.use('/history', history);

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

//ZMQ subscribe
app.ready = function(server) {
    home.prepareSocketIO(server);
};

module.exports = app;
