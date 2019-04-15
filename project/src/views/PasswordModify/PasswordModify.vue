<template>
    <div class="password-modify">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>修改账号密码</h3>
            </div>
            <div class="text item">
                <el-form :model="passwordModifyForm" status-icon :rules="rules" ref="passwordModifyForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="previousPassword">
                        <el-input type="password" v-model="passwordModifyForm.previousPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="currentPassword">
                        <el-input type="password" v-model="passwordModifyForm.currentPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="checkCurrentPassword">
                        <el-input type="password" v-model="passwordModifyForm.checkCurrentPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()" size="small">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
//引入正则验证密码
import { passwordReg } from "@/utils/validate"

export default {
    data () {
        //验证原密码
        const checkpreviousPassword = (rule,value,callback) => {
            if(value === ""){
                callback(new Error("原密码不能为空"))
            }else{
                //发送请求  将输入的新密码发给后台
                this.request.post("/account/checkpreviouspassword",{previousPassword : this.passwordModifyForm.previousPassword})
                    .then(res => {
                        //接收参数
                        let { code,reason } = res
                        if(code === 0){//原密码正确
                            callback()
                        }else if(code === 1){//原密码验证不通过
                            callback(new Error(reason))
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
        //新密码
        const checkPassword = (rule,value,callback) => {
            if(value === ""){
                callback(new Error("请输入新密码"))
            }else if(!passwordReg(value)){
                callback(new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线"))
            }else if(this.passwordModifyForm.checkCurrentPassword !== ""){
                    this.$refs.passwordModifyForm.validateField("checkCurrentPassword")
                    callback()
            }else{
               //验证与原密码是否一致
                //收集信息
                let params = {
                    newpassword : this.passwordModifyForm.currentPassword
                }
                //发送请求
                this.request.post("/account/checkpassword",params)
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
        }
        //确认新密码
        const confirmCurrentPassword = (rule,value,callback) => {
            if(value === ""){
                callback(new Error("确认密码不能为空"))
            }else if(value !== this.passwordModifyForm.currentPassword){
                callback(new Error("两次输入的密码不一致"))
            }else{
                callback()
            }
        }
        
        return {
            //表单数据
            passwordModifyForm : {
                previousPassword : "",
                currentPassword : "",
                checkCurrentPassword : ""
            },
            //验证规则
            rules : {
                //原密码
                previousPassword : [
                    {required : true,validator:checkpreviousPassword,trigger : "blur"}
                ],
                //新密码
                currentPassword : [
                    {required:true,validator:checkPassword,trigger : "blur"}
                ],
                //确认新密码
                checkCurrentPassword : [
                    {required : true,validator:confirmCurrentPassword,trigger : "blur"}
                ]
            }
        }
    },
    
    methods : {
        //保存修改
        submitForm () {
            this.$refs.passwordModifyForm.validate(valid => {
                if(valid){
                    //收集表单数据
                    let params = {
                        currentPassword : this.passwordModifyForm.currentPassword,
                    }
                    //发送请求
                    this.request.post("/account/savepassword",params)
                        .then(res => {
                            //接收参数
                            let {code,reason} = res
                            if(code === 0){//修改成功
                                this.$message({
                                    type:"success",
                                    message:reason 
                                })
                                //路由跳转   跳转到登录页面
                                this.$router.push("/login")
                            }else if(code === 1){//修改失败
                                this.$message.error({
                                    message : reason
                                })
                            }   
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }else{
                    console.log("修改失败")
                }
            })
            
        },
    }
}
</script>
<style lang="less">
    @import "./passwordmodify.less";
</style>

