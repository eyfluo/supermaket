<template>
    <div class="add-account">
        <el-card class="box-card">
            <!-- 添加管理员账号 -->
            <div slot="header">
                <h3>添加管理员账号</h3>
            </div>
            <!-- 添加账号表单 -->
            <div>
                <el-form :model="AddAccountForm" status-icon :rules="rules" ref="AddAccountForm" label-width="100px">
                    <el-form-item label="账号" prop="account">
                        <el-input type="text" v-model="AddAccountForm.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="AddAccountForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkpassword">
                        <el-input type="password" v-model="AddAccountForm.checkpassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="选择用户组" prop="userGroup">
                        <el-select v-model="AddAccountForm.userGroup" placeholder="请选择用户组">
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="submitForm()" size="small">添加</el-button>
                        <el-button type="primary" @click="resetForm()" size="small">重置</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </el-card>
    </div>
</template>
<script>
//引入工具函数
import { passwordReg } from "@/utils/validate"
/* //引入request
import request from "@/utils/request" */
export default {
    data () {
        //验证账号 是否存在
        const checkaccount = (rule,value,callback) => {
            //获取账号
            let params = {
                account : this.AddAccountForm.account
            }
            //发送请求
            this.request.get("/account/checkaccount",params)
                .then(res => {
                    //接收参数
                    let {code,reason} = res
                    if(code === 0){
                        callback()
                    }else if(code === 1){
                        callback(new Error(reason))
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        //验证密码
        const checkPassword = (rule,value,callback) => {
            if(value === ""){//非空
                callback(new Error("密码不能为空"))
            }else if(!passwordReg(value)){//工具函数验证密码 调用工具函数并传参
                callback(new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线"))
            }
            else {
                if(this.AddAccountForm.checkpassword !== ""){//确认密码不为空
                    //触发一致性验证
                    this.$refs.AddAccountForm.validateField("checkpassword")
                }
                callback()//成功的回调函数
            }
        }
        //确认密码验证
        const confirmPassword = (rule,value,callback) => {
            if(value === ""){
                callback(new Error("确认密码不能为空"))
            }else if(value !== this.AddAccountForm.password){//验证确认密码与密码是否一致
                callback(new Error("两次密码输入不一致"))
            }else{
                callback()
            }
        }
        return {
            //表单数据
            AddAccountForm : {
                account : "",
                password : "",
                checkpassword : "",
                userGroup : ""
            },
            //表单验证
            rules : {
                // 账号
                account : [
                    // 内置验证方法
                    
                    {min:3,max:6,message:"请输入3~6位字符",trigger:"blur"},//长度
                    {required:true,validator:checkaccount,trigger:"blur"},//非空

                ],
                //密码
                password : [
                    //自定义验证方法
                    {required:true,validator:checkPassword,trigger:"blur"}
                ],
                //确认密码
                checkpassword : [
                    {required:true,validator:confirmPassword,trigger:"blur"}
                ],
                //用户组
                userGroup : [
                    {required:true,message:"请选择分组",trigger:"change"}
                ]
            }
        }
    },
    methods : {
        //添加
        submitForm (){
            // 如果所有前端验证都通过 valid就是true 否则就是false
            this.$refs.AddAccountForm.validate(valid => {
              if(valid){
                     //收集表单数据
                    let parmars = {
                        account : this.AddAccountForm.account,
                        password : this.AddAccountForm.password,
                        userGroup : this.AddAccountForm.userGroup
                    }
                    //发送axios请求
                    this.request.post("/account/accountadd",parmars)
                    .then((response) => {//请求成功
                        //console.log("请求成功",response)
                        //解构响应回来的参数
                        let {code, reason} = response
                        //判断后端数据是否写入数据库
                        if(code === 0){//成功写入数据库
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            //路由跳转 跳转到账号管理页面
                            this.$router.push("/home/accountmanage")

                        }else if(code === 1){//写入数据库失败
                            this.$message({
                                message: '添加失败',
                                type: 'danger'
                            });
                        }
                    })
                    .catch((err) => {//请求失败
                        console.log("请求失败",err)
                    })
                }else{
                    console.log("验证失败")
                    return
                }  
            })
            
           
        },
        //账号验证
        checkAccount(){
            
        },
        //重置
        resetForm (){
            // 重置表单
            this.$refs.AddAccountForm.resetFields()
        }
    }
}






</script>
<style lang="less">
    //引入添加账号样式
    @import "./AddAccount.less";
</style>


