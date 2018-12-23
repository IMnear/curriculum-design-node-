var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../DBmysql/DBConfig');
var userSQL = require('../DBmysql/usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);

//引入jwt token验证
const jwt = require('jsonwebtoken');



// 响应一个JSON数据
var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 用户注册
router.post('/reg', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    var UserName = param.username;
    var Password = param.password;
    var _res = res;
    connection.query(userSQL.queryAll, function (err, res) {
      var isTrue = false;
      if (res) { //获取用户列表，循环遍历判断当前用户是否存在
        for (var i = 0; i < res.length; i++) {
          if (res[i].username == UserName && res[i].password == Password) {
            isTrue = true;
          }
        }
      }
      var data = {};
      data.isreg = !isTrue; //如果isTrue布尔值为true则登陆成功 有false则失败
      if (isTrue) {
        data.result = {
          code: 1,
          msg: '用户已存在'
        }; //登录成功返回用户信息
      } else {
        connection.query(userSQL.insert, [param.username, param.password], function (err, result) {
          if (result) {
            data.result = {
              code: 200,
              msg: '注册成功'
            };
          } else {
            data.result = {
              code: -1,
              msg: '注册失败'
            };
          }
        });
      }

      if (err) data.err = err;
      // 以json形式，把操作结果返回给前台页面
      setTimeout(function () {
        responseJSON(_res, data)
      }, 300);
      // responseJSON(_res, data);
      // 释放链接
      connection.release();

    });
  });
});


// 用户登录
router.post('/login', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    var UserName = param.username;
    var Password = param.password;
    var _res = res;
    console.log(param, '前端传递信息')
    connection.query(userSQL.queryAll, function (err, res, result) {
      var isTrue = false;
      if (res) { //获取用户列表，循环遍历判断当前用户是否存在
        for (var i = 0; i < res.length; i++) {
          if (res[i].username == UserName && res[i].password == Password) {
            isTrue = true;
          }
        }
      }
      var data = {};
      data.isLogin = isTrue; //如果isTrue布尔值为true则登陆成功 有false则失败
      if (isTrue) {
        data.userInfo = {};
        data.userInfo.uid = UserName;
        data.userInfo.userName = Password;
      } //登录成功返回用户信息
      if (result) {
        //生成token
        //定义签名
        const secret = 'zhangruiwen';
        const token = jwt.sign({
          name: UserName
        }, secret, {
          expiresIn: 12000 //秒到期时间
        });

        result = {
          code: 200,
          token: token,
          msg: 'succeed'
        };
        data.result = result;
      }
      if (err) data.err = err;
      // 以json形式，把操作结果返回给前台页面
      responseJSON(_res, data);

      // 释放链接
      connection.release();

    });
  });
});



// 查询用户
router.get('/get', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.query || req.params;
    // 建立连接 增加一个用户信息 
    connection.query(userSQL.queryAll, function (err, result) {
      console.log(result, '返回结果')
      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);

      // 释放连接  
      connection.release();

    });
  });
});


// 新增用户
router.post('/add', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body;
    // 建立连接 增加一个用户信息 
    connection.query(userSQL.insert, [param.username, param.password], function (err, result) {
      console.log(result, '返回结果')
      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);
      // 释放连接  
      connection.release();

    });
  });
});


// 修改用户
router.post('/update', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body;
    let updateArr=[];
    // 建立连接 增加一个用户信息 
    connection.query(userSQL.putUserById, [param.username, param.password, param.rfid, param.age, param.adress, param.sex, param.phone,param.id], function (err, result) {
      console.log(result, '返回结果')
      // 以json形式，把操作结果返回给前台页面    
      if (result) {
        if (result.affectedRows == 1) {
            result = {
                code: 200,
                msg: 'succeed'
            };
        } else {
            result = {
                code: -1,
                msg: '失败'
            };
        }


        res.result = result;
    }   
      responseJSON(res, result);
      // 释放连接  
      connection.release();

    });
  });
});


// 删除用户
router.delete('/delete', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body;
    console.log('接受到的信息', param)
    // 建立连接 增加一个用户信息 
    connection.query(userSQL.deleteUserbyId, [param.id], function (err, result) {
      console.log(result, '返回结果')
      console.log(result.affectedRows, '返回结果')
      // 以json形式，把操作结果返回给前台页面 
      if (result) {
        if (result.affectedRows==1) {
          result = {
            code: 200,
            msg: 'succeed'
          };
        }
        else {
          result = {
            code: -1,
            msg: '失败'
          };
        }


        res.result = result;
      }
      if (err) res.err = err;
      responseJSON(res, result);
      // 释放连接  
      connection.release();

    });
  });
});





module.exports = router;