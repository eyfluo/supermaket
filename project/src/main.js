
//引入vue
import Vue from 'vue'
//引入顶级组件 app.vue
import App from './App.vue'
//引入路由
import router from './router'
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入重置样式表
import "./assets/css/base.css"
//引入request
import request from "@/utils/request"
//将request挂载在vue的原型上  在所有组件都能用
Vue.prototype.request = request

//引入echarts 
import echarts from "echarts"
Vue.prototype.echarts = echarts

//注册element-ui
Vue.use(ElementUI)
//阻止开发提示
Vue.config.productionTip = false
//引入local文件 获取浏览器本地数据库
import local from "@/utils/local"
//路由守卫 拦截所有路由
router.beforeEach((to,from,next) => {
  //to 要进入的目标路由对象 from 要去的路由 next进入下步一函数
  //获取token
  const token = local.get("t_o_k_e_n")
  //判断token是否存在
  if(token){//token存在
    //放行
    next()
  }else{
    if(to.path === "/login"){//要去登录页面
      //放行
      next()
    }else{//直接跳转到登录页面
      next("/login")
    }

  }
})
//实例化vue对象
new Vue({
  router,//路由
  render: h => h(App)//app组件
}).$mount('#app')//挂载视图
