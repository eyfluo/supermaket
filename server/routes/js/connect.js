//引入数据库
const mysql = require("mysql")
//创建连接
const connection = mysql.createConnection({
    host : "localhost", //服务器地址
    user : "root", //用户名
    password : "root", //密码
    database : "project" //连接数据库名
})
//执行连接
connection.connect()
console.log("数据库连接成功")
//暴露模块
module.exports  = connection

