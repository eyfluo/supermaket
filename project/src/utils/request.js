//封装axios
//引入axios
import axios from "axios"
//引入qs
import qs from "qs"
//引入local
import local from '@/utils/local'
//统一设置请求地址  设置请求服务器的根目录
axios.defaults.baseURL = "http://127.0.0.1:504"
// axios请求拦截器  在发送所有请求之前拦截请求 并给请求 带上token
axios.interceptors.request.use(config => {
    // 获取token
    const token = local.get('t_o_k_e_n');
    config.headers.authorization = `Bearer ${token}` 
    return config;
})
//暴露方法
export default {
    get (url,params={}) {
        return new Promise((resolve,reject) => {
            axios.get(url,{
                params : params
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })

    },
    post (url,params={}) {
        return new Promise((resolve,reject) => {
            axios.post(url,qs.stringify(params))
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
        })
        
    }
} 