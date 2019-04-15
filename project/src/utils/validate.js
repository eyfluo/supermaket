/* 工具函数 */ 
// 验证密码 (以字母开头，长度在3~6之间，只能包含字符、数字和下划线)
//使用export可以重复多次暴露  export default 只能暴露一次
export function passwordReg (value){
    //正则表达式
    const reg = /^[a-zA-Z]\w{2,5}$/;
    //返回正则验证结果 值为bollean  test为正则的内置方法
    return reg.test(value)
}
