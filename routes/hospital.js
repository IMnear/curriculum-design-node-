var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../DBmysql/DBConfig');
var hospitalSQL = require('../DBmysql/hospitalSQL');
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




// 查询医院
router.get('/get', function (req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.query || req.params;
        connection.query(hospitalSQL.queryAll, function (err, result) {
            console.log(result, '返回结果')
            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});


// 新增医院
router.post('/add', function (req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body;
        console.log(param, '接受数据')
        // 建立连接 增加一个医院信息 
        connection.query(hospitalSQL.insert, [param.name,  param.img, param.address, param.abstract], function (err, result) {
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

// 删除医院
router.delete('/delete', function (req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body;
        console.log('接受到的信息', param)
        // 建立连接 增加一个医院信息 
        connection.query(hospitalSQL.deletehospitalbyId, [param.hsid], function (err, result) {
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
            if (err) data.err = err;
            responseJSON(res, result);
            // 释放连接  
            connection.release();

        });
    });
});

// 查询医院按照（条件）[type: name,hsid,address,abstract]
router.post('/gethospitalBy', function (req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body;
        console.log(param, '接受数据')
        let TypeArr=["hsid"];
        let mohu=["abstract","address","name"];
        // 如果param.type,param.value存在
        // 这里 "abstract","address","name" 是模糊查询
        if(param.type&&param.value){
            if(TypeArr.indexOf(param.type)!='-1'){
                let Sqlstr='gethospitalBy'+param.type
                console.log(Sqlstr)
                connection.query(hospitalSQL[Sqlstr], [param.value], function (err, result) {
                    console.log(result, '返回结果')
                    // 以json形式，把操作结果返回给前台页面 
                    if (result) {
                            result = {
                                code: 200,
                                msg: 'succeed',
                                hospital:result
                            };
                        } else {
                            result = {
                                code: -1,
                                msg: '失败'
                            };
                        }
                        res.result = result;
                    if (err) res.err = err;
                    responseJSON(res, result);
                    // 释放连接  
                    connection.release();
        
                });
            }else if (mohu.indexOf(param.type)!='-1') {
                let Sqlstr='gethospitalBy'+param.type
                console.log(Sqlstr)
                let Sql=hospitalSQL[Sqlstr]+"'%"+param.value+"%'"
                connection.query(Sql, function (err, result) {
                    console.log(result, '返回结果')
                    // 以json形式，把操作结果返回给前台页面 
                    if (result) {
                            result = {
                                code: 200,
                                msg: 'succeed',
                                hospital:result
                            };
                        } else {
                            result = {
                                code: -1,
                                msg: '失败'
                            };
                        }
                        res.result = result;
                    if (err) res.err = err;
                    responseJSON(res, result);
                    // 释放连接  
                    connection.release();
        
                });
            }
            else{
                res.json({
                    code: '-2',
                    msg: '传入类型错误'
                });
            }
            
        }else{
            res.json({
                code: '-2',
                msg: '传入参数缺少'
            });
        }
        
        
    });
});








module.exports = router;