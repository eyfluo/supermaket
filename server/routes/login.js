var express = require('express');
var router = express.Router();
//引入数据模块
var connection = require("./js/connect")
//引入jwt
var jwt = require("jsonwebtoken")
//跨域
router.all("*",(req,res,next) => {
    //设置响应头解决跨域 拦截请求路由做响应头处理
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
    //将拦截的请求放行
    next()
})


/*----------验证token合法性开始------------- */

//准备密钥 (签名)
const secretKey = "zheshimiyue"
//验证token的合法性  在跨域之后  接收请求之前
//引入express-jwt
const expressJwt = require("express-jwt")
//验证token的合法性
router.use(expressJwt({
    //设置的密钥
    secret: secretKey
}).unless({
    //除了下面的地址都要验证(其他所有请求都需要带上token)
    path : ["/login/checklogin"]
}))
//路由拦截器
router.use(function (err,req,res,next) {
    //前段没有token或者为错误的token 抛出错误
    if(err.name === "UnauthorizedError"){
        res.staus(401).send("token不合法")
    }
})

/*--------------验证token合法性结束 ---------------*/


/* GET users listing. */
//登录检测用户名密码是否正确
router.post("/checklogin",(req,res) => {
    //接收参数
    let {account,password} = req.body
    //构造sql 查询用户名和密码是否在数据库中存在
    const sqlstr = `select * from account where account='${account}' and password='${password}'`
    //执行sql
    connection.query(sqlstr,(err,data) => {
        if(err) throw err
        //接收的数据在数据库中是否存在
        if(data.length){
            //登陆成功 生成 token
            const token = jwt.sign(Object.assign({},data[0]),secretKey,{expiresIn : 60*60})
            res.send({code:0,reason:"登陆成功",token})
        }else{
            res.send({code:1,reason:"请输入正确的账号和密码"})
        }
        
    })
   
})

//获取当前登录用户名
router.get('/getcurrentaccount', (req, res) => {
	// 响应当前登录的账号名给前端 （使用express-jwt验证token合法后 会把token的值 存入 req.user 其实就是当前登录账号数据对象）
    res.send(req.user.account)
})
module.exports = router;