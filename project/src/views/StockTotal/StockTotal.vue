<template>
    <div class="stock-total">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>进货统计</h3>
            </div>
            <div class="text item">
                <el-form :inline="true" :model="salesTotalForm" class="demo-form-inline">
                    <el-form-item label="时间">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="salesTotalForm.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="salesTotalForm.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="success" @click="onSubmit" size="small">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        
    </div>
</template>
<script>
export default {
    data () {
        return {
           salesTotalForm : {} 
        }
        
    },
    methods : {
        onSubmit () {}
    }
   
}
</script>
<style lang="less">
    @import "./stocktotal.less";
</style>


