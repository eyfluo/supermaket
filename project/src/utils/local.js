// 浏览器本地数据库
export default {
    //存数据
    save(key,value){
        window.localStorage.setItem(key,JSON.stringify(value))//存入的键值只能是字符串
    },
    //取数据
    get(key){
        //返回读取到的数据  并将读取到的数据转为对象
        return JSON.parse(window.localStorage.getItem(key))
    },
    //删除指定键名的数据
    remove(key){
        window.localStorage.removeItem(key)
    },
    //删除所有数据
    clear(){
        window.localStorage.clear()
    }
}