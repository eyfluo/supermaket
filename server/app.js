var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入数据库连接
var connection = require("./routes/js/connect")
//引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//引入账号路由
var account = require("./routes/account");
//引入商品路由
var goods = require("./routes/goods")
//引入登录路由
var login = require("./routes/login")

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//分配路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
//分配账号路由
app.use("/account",account);
//分配商品路由
app.use("/goods",goods)
//分配登录路由
app.use("/login",login)


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
//监听端口
app.listen(504,() => {
  console.log("服务器地址是:127.0.0.1:504")
})
module.exports = app;
