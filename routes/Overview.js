var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../DBmysql/DBConfig');
var Overviewsql = require('../DBmysql/Overviewsql');
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

// 查询挂号单
router.get('/get', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.query || req.params;
    connection.query(Overviewsql.queryAll, function (err, result) {
      console.log(result, '返回结果')
      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);

      // 释放连接  
      connection.release();

    });
  });
});


// 新增挂号单
router.post('/add', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body;
    console.log(param, '接受数据')
    // 建立连接 增加一个医院信息 
    connection.query(Overviewsql.insert, [param.ysid, param.userid, param.time], function (err, result) {
      // 以json形式，把操作结果返回给前台页面 
      console.log(result)
      if (result) {
        console.log(result, '返回结果')
        console.log(result.affectedRows, '返回结果')
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


// 按照用户id查询挂号信息
router.post('/my', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.body;
    console.log(param, '接受数据')
    // 建立连接 增加一个医院信息 
    connection.query(Overviewsql.getOverviewByuserId, [param.userid], function (err, result) {
      // 以json形式，把操作结果返回给前台页面 
      console.log(result)
      if (result) {
        console.log(result, '返回结果')
        console.log(result.affectedRows, '返回结果')
        res.result = result.affectedRows;
      }
      if (err) res.err = err;
      responseJSON(res, result);
      // 释放连接  
      connection.release();

    });
  });
});


module.exports = router;