<template>
  <div class="login">
      <div class="login-wrap">
          <div class="title">
              <span class="el-icon-menu"></span>
              超市管理系统
          </div>
        
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="ruleForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input type="password" v-model="ruleForm.checkPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>
//引入验证
import { passwordReg } from "@/utils/validate"
//引入浏览器本地存储数据
import local from "@/utils/local"
export default {
    data () {
        //密码规则
        const checkPassword = (rule, value, callback) => {
            if (value === ""){//非空
                callback(new Error("密码不能为空"))//错误提示信息
            }else if (!passwordReg(value)) {
                callback(new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线"))//错误提示信息
            }else {
                if ( this.ruleForm.checkPassword !== ""){//确认密码不为空
                    //一致性验证
                    this.$refs.ruleForm.validateField('checkPassword')
                }
                callback() //验证成功的回调函数
            }
        }
        //确认密码的验证规则
        const confirmPassword = (rule, value, callback) => {
            if (value === ""){//非空
                callback(new Error("确认密码不能为空"))
            }else if (value !== this.ruleForm.password){//是否与密码一致
                callback(new Error("两次输入的密码不一致"))
            }else{
                callback()//验证成功的回调函数
            }
        }
        return {
            //表单数据
            ruleForm : {
                account : "",
                password : "",
                checkPassword : ""
            },
           //验证规则
            rules : {
                //账号验证
                account : [
                    //内置验证
                    {required: true, message: '请输入账号', trigger: 'blur'},//非空
                    {min: 3, max: 6, message: '账号长度 3~6 位', trigger: 'blur'}//规定
                ],
                //密码验证
                password : [
                    //自定义验证
                    {required: true, validator: checkPassword, trigger: 'blur'}
                ],
                //确认密码验证
                checkPassword : [
                    {required: true, validator: confirmPassword, trigger: 'blur'}
                ]
            },
        }
    },
    methods : {
        //提交方法
        submitForm () {
            //表单验证全部通过
            this.$refs.ruleForm.validate(( valid ) => {
                //当前路由路径$route.path
                if (valid){//将数据提交给后台  valid的值为true or false 
                    let params = {
                        account : this.ruleForm.account,
                        password : this.ruleForm.password
                    }
                    //发送请求
                    this.request.post("/login/checklogin",params)
                        .then(res => {
                            //接收参数
                            let{code,reason,token} = res
                            //用户是否存在
                            if(code === 0){
                                //将token存入浏览器
                                local.save("t_o_k_e_n",token)
                                this.$message({
                                    type : "success",
                                    message : reason
                                })
                                //页面跳转
                                this.$router.push("/home")
                            }else if(code === 1){
                                this.$message.error({
                                    message : reason
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })

                }else{
                    console.log("前端验证不通过")
                    return
                }
            })
        },
        //重置方法
        resetForm () {
            //重置表单
            this.$refs.ruleForm.resetFields()
        }
    }
}
</script>



<style lang="less">
    //引入登录样式
    @import "./login.less";
</style>




