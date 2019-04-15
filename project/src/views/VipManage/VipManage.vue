<template>
    <div class="vipmanage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>会员管理</h3>
            </div>
            <div class="text item">
                <el-form :inline="true" :model="vipForm" class="demo-form-inline">
                    <el-form-item label="搜索">
                        <el-input v-model="vipForm.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()" size="small">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    :data="vipData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="会员卡卡号">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="会员姓名">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="会员等级">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="会员积分">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="折扣">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="管理">
                        
                    </el-table-column>

                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[100,200,300,400]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
          vipData : [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            vipForm : {

            },
            //分页

        }
        
    },
    methods : {
        //查询
        onSubmit () {},
        //分页
        handleSizeChange () {},
        handleCurrentChange () {}
    }
}
</script>
<style lang="less">
    @import "./VipManage.less";
</style>


