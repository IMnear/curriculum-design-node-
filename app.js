var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorRouter = require('./routes/doctor');
var hospitalRouter = require('./routes/hospital');
var reptile = require('./routes/reptile');


//引入jwt token验证中间件
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 处理跨域请求
//处理跨域请求
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


// token验证校验
//定义签名
const secret = 'zhangruiwen';
// 使用中间件验证token合法性
app.use(expressJwt ({
  secret: secret 
}).unless({
  path: ['/users/login','/users/reg']  //除了这些地址，其他的URL都需要验证
}));


//拦截器
app.use(function (err, req, res, next) {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
      res.status(401).send('invalid token...token验证失败');
  }
});

// 接口路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctor', doctorRouter);
app.use('/hospital', hospitalRouter);
app.use('/reptile', reptile);




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