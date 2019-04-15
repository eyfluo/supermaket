var express = require('express');
var router = express.Router();
//连接数据库模块
const connection = require("./js/connect")
//解决跨域问题
router.all("*",(req,res,next) => {
    //设置响应头 解决跨域  拦截请求 做响应头处理
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers", "authorization");
    //放行
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

//添加商品
router.post("/addgoods",(req,res) => {
    //接收参数
    let {kind,barcode,goodsname,goodssaleprice,marketprice,commodityprice,stocktotal,goodsweight,goodsbar,vipspecial,special,goodsintroduce}=req.body
    //构造sql
    const sqlstr = `insert into goods(kind,barcode,goodsname,goodssaleprice,marketprice,commodityprice,stocktotal,goodsweight,goodsbar,vipspecial,special,goodsintroduce) values('${kind}','${barcode}','${goodsname}','${goodssaleprice}','${marketprice}','${commodityprice}','${stocktotal}','${goodsweight}','${goodsbar}','${vipspecial}','${special}','${goodsintroduce}')`
    //执行sql
    connection.query(sqlstr,(err,data) => {
        if(err) throw err
        if(data.affectedRows > 0){
            res.send({code:0,reason:"添加商品成功"})
        }else{
            res.send({code:1,reason:"添加商品失败"})
        }


    })

})

//商品管理 列表
router.get("/goodsmanage",(req,res) => {
    //向数据库查数据
    //构造sql
    const sqlstr = `select * from goods`
    //执行sql
    connection.query(sqlstr,(err,data) => {
        if (err) throw err
        res.send(data)
    })
    //res.send("商品管理")
})

//删除商品
router.get("/delgoods",(req,res) => {
    //接收参数
    let {id} = req.query
    //根据id删除对应数据
    //构造sql
    const sqlstr = `delete from goods where id=${id}`
    //执行sql
    connection.query(sqlstr,(err,data) => {
        if(err) throw err
        if(data.affectedRows > 0){
            res.send({code:0,reason:"删除商品成功"})
        }else{
            res.send({code:1,reason:"删除商品失败"})
        }
    })
})
//修改商品
router.get("/editgoods",(req,res) => {
    //接收参数
    let {id} = req.query
    //构造sql
    const sqlstr = `select * from goods where id=${id}`

    //执行sql
    connection.query(sqlstr,(err,data) => {
        if(err) throw err
        res.send(data)
    })
    
})

//保存修改
router.post("/saveeditgoods",(req,res) => {
    //接收参数
    let {barcode,goodsname,goodssaleprice,kind,editgoodsId} = req.body
    //构造sql
    const sqlstr = `update goods set barcode='${barcode}',goodsname='${goodsname}',goodssaleprice='${goodssaleprice}',kind='${kind}' where id=${editgoodsId}` 

    //执行sql
    connection.query(sqlstr,(err,data) => {
        if(err) throw err
        if(data.affectedRows > 0){
            res.send({code:0,reason:"修改成功"})
        }else{
            res.send({code:1,reason:"修改失败"})
        }
    })
    
})

//分页
router.get("/goodspage",(req,res) => {
    //接收参数
    let {pageSize,currentPage,cateName,keyword} = req.query
    //构造sql 查询所有数据
    let sqlstr = `select * from goods where 1=1`
    //根据条件拼接sql
    //分类不为空和全部
    if(cateName !== "全部" && cateName !== ""){
        sqlstr += ` and kind='${cateName}'`
    }
    //关键字包括条形码或商品名称
    if(keyword !== ""){
        sqlstr += ` and(goodsname like '%${keyword}%' or barcode like '%${keyword}%'`
    }
    //按时间排序
    sqlstr += ` order by ctime desc`
    //执行sql
    connection.query(sqlstr,(err,data) => {
        if(err) throw err
        //计算满足搜索条件条数
        let total = data.length
        //计算每页数据
        let n = (currentPage -1 ) * pageSize
        //查询数据 构造sql
        sqlstr += ` limit ${n},${pageSize}`
        //执行sql
        connection.query(sqlstr,(err,data) => {
            if (err) throw err
            res.send({total,data})
        })
        
    })
    
})

/* //搜索关键字
router.get("/searchgoods",(req,res) => {
    //接收参数
    let {cateName,keyword} = req.query
    //构造sql查询所有的数据
    let sqlstr = `select * from goods where 1=1`
    //根据条件拼接sql
    //传入分类的值不为空和不为全部
    if(cateName !== "全部" && cateName !== ""){
        sqlstr += ` and kind='${cateName}'`
    }
    //关键字包含商品名称或商品条形码
    if(keyword !== ""){
        sqlstr += ` and(goodsname like '%${keyword}%' or barcode like '%${keyword}%')`
    }
    //执行sql
    connection.query(sqlstr,(err,data) => {
        if(err) throw err
        //将查询的结果响应给前端
        res.send(data)
    })

}) */


module.exports = router;