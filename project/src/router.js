import Vue from 'vue'
import Router from 'vue-router'

//注册路由
Vue.use(Router)

export default new Router({
  routes : [
    //根目录重定向
    {
      path : "/",
      redirect : "/login"
    },
    //登录
    {
      path : "/login",
      component : () => import("@/views/Login/Login.vue")
    },
    //主页面
    {
      path : "/home",
      //路由重定向 到系统信息
      redirect : "/home/systeminfo",
      component : () => import("@/views/Home/Home.vue"),
      children : [
        //系统信息
        {
          path : "/home/systeminfo",//路径
          component : () => import("@/views/SystemInfo/SystemInfo.vue")//组件
        },
        //个人中心
        {
          path : "/home/personal",//路径
          component : () => import("@/views/Personal/Personal.vue")//组件
        },
        //进货统计
        {
          path : "/home/stocktotal",
          component : () => import("@/views/StockTotal/StockTotal.vue")
        },
        
        //商品出库
        {
          path : "/home/salesgoods",
          component : () => import("@/views/SalesGoods/SalesGoods.vue")
        },
        //销售统计
        {
          path : "/home/salestotal",
          component : () => import("@/views/SalesTotal/SalesTotal.vue")
        },
        //添加账号
        {
          path : "/home/addaccount",
          component : () => import("@/views/AddAccount/AddAccount.vue")
        },

        //账号管理
        {
          path: '/home/accountmanage',
          component: () => import('@/views/AccountManage/AccountManage.vue'),
        },
        //添加商品
        {
          path: '/home/addgoods',
          component: () => import('@/views/AddGoods/AddGoods.vue'),
        },
        //商品管理
        {
          path : "/home/goodsmanage",
          component: () => import('@/views/GoodsManage/GoodsManage.vue'),
        },
        //修改密码
        {
          path : "/home/passwordmodify",
          component: () => import('@/views/PasswordModify/PasswordModify.vue'),
        },
        //会员管理
        {
          path : "/home/vipmanage",
          component: () => import('@/views/VipManage/VipManage.vue'),
        },
        //商品入库
        {
          path : "/home/stockgoods",
          component : () => import("@/views/StockGoods/StockGoods.vue")
        }
      ]
    }
  ]
})