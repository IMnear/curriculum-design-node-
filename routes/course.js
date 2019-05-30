var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../DBmysql/DBConfig');
var courseSQL = require('../DBmysql/coursesql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);




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





// 查询course
router.get('/get', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.query || req.params;
    // 建立连接 增加一个course信息 
    connection.query(courseSQL.queryAll, function (err, result) {
      console.log(result, '返回结果')
      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);

      // 释放连接  
      connection.release();

    });
  });
});

// 查询course通过id
router.post('/getcourseById', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body;
    // 建立连接 增加一个course信息 
    connection.query(courseSQL.getcourseById, [param.openid], function (err, result) {
      console.log(result, '返回结果')
      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);
      // 释放连接  
      connection.release();

    });
  });
});

// 新增course
router.post('/add', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body;
    // 建立连接 增加一个course信息 
    connection.query(courseSQL.insert, [param.id, param.weekth, param.day, param.start, param.end, param.coursename, param.teacher, param.address, param.openid], function (err, result) {
      console.log(result, '返回结果')
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
      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);
      // 释放连接  
      connection.release();

    });
  });
});


// 修改course通过id
router.post('/update', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body;
    let updateArr = [];
    // 建立连接 增加一个course信息 
    connection.query(courseSQL.putcourseById, [param.id, param.weekth, param.day, param.start, param.end, param.coursename, param.teacher, param.address, param.openid], function (err, result) {
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


// 删除course
router.delete('/delete', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body;
    console.log('接受到的信息', param)
    // 建立连接 增加一个course信息 
    connection.query(courseSQL.deletecoursebyId, [param.openid], function (err, result) {
      console.log(result, '返回结果')
      console.log(result.affectedRows, '返回结果')
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
      if (err) res.err = err;
      responseJSON(res, result);
      // 释放连接  
      connection.release();

    });
  });
});





module.exports = router;