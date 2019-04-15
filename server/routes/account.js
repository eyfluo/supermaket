var express = require('express');
var router = express.Router();
//连接数据库
var connection = require("./js/connect")

//统一设置响应头
router.all("*",(req,res,next) => {
    //设置响应头解决跨域 拦截请求路由做响应头处理
    res.setHeader("Access-Control-Allow-Origin","*")
    //设置响应头 允许前端请求 携带token
    res.setHeader("Access-Control-Allow-Headers", "authorization");
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


//添加账号请求
router.post("/accountadd",(req,res) => {
  //res.setHeader("Access-Control-Allow-Origin","*")
  //res.send("响应成功")
  //接收数据
  let{ account, password, userGroup} = req.body
      //写sql
  const sqlstr = `insert into account(account,password,user_group) values('${account}','${password}','${userGroup}')`
  //执行sql
  connection.query(sqlstr,(err,data) => {
      if (err) throw err
      //受影响的行数大于0 说明写入数据库成功
      if(data.affectedRows > 0){
        //响应成功的消息给前端
        res.send({code:0,reason:"写入数据库成功"})
      }else{
        res.send({code:1,reason:"写入数据库失败"})
      } 
    })
})

//验证账号是否存在
router.get("/checkaccount",(req,res) => {
  //接收参数
  let {account} = req.query
  //向数据库查数据
  const sqlstr = `select * from account where account='${account}'`

  //执行sql
  connection.query(sqlstr,(err,data) => {
    if(data.length){
      res.send({code :1 ,reason:"账户名已存在"})
    }else{
      res.send({code:0,rason:"账户名验证通过"})
    }
  })
  
})

//账号管理请求
router.get("/accountmanage",(req,res) => {
  //接收请求  向数据库拿数据
  //写sql
  const sqlstr = `select * from account order by ctime desc`
  //执行sql
  connection.query (sqlstr,(err,data) => {
    if (err) throw err
    res.send(data)
  })
  //res.send("响应成功")
})

//删除账号
router.get("/deleteaccount",(req,res) => {
  //接收参数
  let { id } = req.query
  //根据id向数据库查数据，并将对应id的数据删除
  //构造sql
  const sqlstr = `delete from account where id=${ id }`
  //执行sql
  connection.query(sqlstr,(err,data) => {
    if (err) throw err
    //受影响的行数大于0 删除成功
    if(data.affectedRows > 0 ){
      res.send({code : 0,reason : "删除账号成功"})
    }else{
      res.send({code : 0,reason : "删除账号失败"})
    }
  })
})

//批量删除
router.get("/batchdel",(req,res) => {
  //接收参数
  let { selectedId } = req.query
  //根据接收的id向数据库查找数据并删除
  //写sql
  const sqlstr = `delete from account where id in (${selectedId})`
  //执行sql
  connection.query(sqlstr,(err,data) => {
    if (err) throw err
    //数据库受影响的行数大于0  表示删除成功
    if(data.affectedRows > 0){
      res.send({code:0,reason:"批量删除成功"})
    }else{
      res.send({code:0,reason:"批量删除失败"})
    }
  })

})


//修改账号
router.get("/editaccount",(req,res) => {
  //接收参数
  let { id } = req.query
  //构造sql
  const sqlstr = `select * from account where id=${id}`
  //执行sql
  connection.query(sqlstr,(err,data) => {
    if (err) throw err
    res.send(data)
  })
})

//保存修改
router.post("/saveedit",(req,res) => {
  //接收参数
  let { account,userGroup,editId } = req.body
  //构造sql
  const sqlstr = `update account set account='${account}',user_group='${userGroup}' where id=${editId}`
  //执行sql 
  connection.query(sqlstr,(err,data) => {
    if (err) throw err
    if(data.affectedRows > 0){//操作数据库成功
      res.send({code:0,reason:"修改成功"})
    }else{
      res.send({code:1,reason:"修改失败"})
    }
  })

})


//分页
router.get("/accountpage",(req,res) => {
  //接收参数
  let {currentPage,pageSize} = req.query
  //构造sql 向数据库查所有数据
  let sqlstr = `select * from account order by ctime desc`
  //执行sql
  connection.query(sqlstr,(err,data) => {
    if(err) throw err
    //获取数据总条数
    let total = data.length
    //计算跳过多少条
    let n = (currentPage - 1) * pageSize
    //拼接sql 计算跳过多少条 输出多少条
    sqlstr += ` limit ${n},${pageSize}`
    //执行sql
    connection.query(sqlstr,(err,data) => {
      if (err) throw err
      //将总条数和数据发送给前端
      res.send({total,data})
    })
   
  })
})

//验证原密码
router.post("/checkpreviouspassword",(req,res) => {
  //接收参数
  let { previousPassword } = req.body
  //获取当前用户的密码  路由拦截器生成的req.user 保存了当前用户的所有信息
  let { password } = req.user
  if (previousPassword !== password){
    res.send({code : 1,reason: "原密码输入不正确"})
  }else{
    res.send({code:0,reason:"原密码验证通过"})
  }
  
})

//保存修改密码
router.post("/savepassword",(req,res) => {
  //接收参数
  let { currentPassword } = req.body
  //获取当前用户的id
  let { id } = req.user
  //构造sql
  const sqlstr = `update account set password='${currentPassword}' where id=${id}`
  //执行sql
  connection.query(sqlstr,(err,data) => {
    if(err) throw err
    if(data.affectedRows > 0){
      res.send({code:0,reason:"修改密码成功 请重新登录"})
    }else{
      res.send({code:1,reason:"修改密码失败"})
    }
  })
})

//验证新密码与原密码是否一致
router.post("/checkpassword",(req,res) => {
  //接收参数
  let { newpassword } = req.body
  //获取当前用户原来的密码
  let { password } = req.user
  //判断当前密码与原密码是否一致
  if(newpassword !== password){
    res.send({code:0,reason:"新密码与原密码不一致"})
  }else{
    res.send({code:1,reason:"新密码与原密码一致"})
  }
})

//个人中心
router.get("/personalinfo",(req,res) => {
  res.send(req.user)
})
module.exports = router;
