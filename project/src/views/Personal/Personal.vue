<template>
    <div class="stock-total">
        <el-card class="box-card">
            <div slot="header">
                <h3>个人中心</h3>
            </div>
            <div class="text item">
                <div class="personalinfo">
                    <p>账号: {{ personalinfo.account }}</p>
                    <p>用户组: {{ personalinfo.user_group }}</p>
                    <p>创建时间: {{ personalinfo.ctime | filterTime }}</p>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import moment from "moment"
export default {
    data () {
        return {
            personalinfo : {}
        }
    },
    methods : {
        //获取当前用户信息
        getpersonalinfo(){
            //发送请求
            this.request.get("/account/personalinfo")
                .then(res => {
                    //接收参数
                    this.personalinfo = res
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }

    },
    created(){
        this.getpersonalinfo()
    },
    filters : {
        filterTime(time){
            return moment(time).format("YYYY-MM-DD hh:mm:ss")
        }
    }

}
</script>
<style lang="less">

</style>
