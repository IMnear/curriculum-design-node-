var connction = {};

connction.mysql = {

    host: "localhost", //这是数据库的地址

    user: "root", //需要用户的名字

    password: "root", //用户密码 ，如果你没有密码，直接双引号就是

    database: "test", //数据库名字

    port: "3306"

}



module.exports = connction;
//用module.exports暴露出这个接口，