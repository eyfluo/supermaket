<template>
    <div class="top">
        <el-row :gutter="20">

                <el-col :span="20"><h3><i class="el-icon-menu"></i>超市管理系统</h3></el-col>

                <el-col :span="4">
                    <el-row>
                        <el-col :span="8"><div class="avatar"><img src="./avatar.jpg" alt=""></div></el-col>
                        <el-col :span="16">

                                <el-dropdown @command="handleCommand">
                                    <span class="el-dropdown-link" style="color:#fff;">
                                        {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                
                                    </el-dropdown-menu>
                                </el-dropdown>

                        </el-col>
                    </el-row>
                </el-col>

            
        </el-row>
    </div>
</template>
<script>
//引入local  获取token
import local from "@/utils/local"
export default {
    data () {
        return {
            //个人账号信息
            account :""
        }
    },
    methods : {
        //菜单项触发的回调
        handleCommand(val){
            if(val === "logout"){//退出登录
                //删除token
                local.remove("t_o_k_e_n")
                this.$message({
                        type : "success",
                        message : "已退出登录"
                    })
                setTimeout(() => {
                    //跳转到登陆页面
                    this.$router.push("/login")
                },1000)
                
            }else if(val === "personal"){
                //个人中心页面
                this.$router.push("/home/personal")
            }
        },
        //获取当前用户信息
        getCurrentAccount(){
            //发送请求
            this.request.get("/login/getcurrentaccount")
                .then(res => {
                    //接收参数
                    this.account = res
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    //生命周期 钩子函数 刷新即调用
    created () {
        //获取当前登录名
        this.getCurrentAccount()
    }
}

</script>
<style lang="less">
    //引入头部样式
    @import "./top.less";
</style>
