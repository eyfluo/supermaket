<template>
    <div class="sales-goods">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>商品出库</h3>
            </div>
            <div class="text item">
                <el-form ref="salesform" :model="salesform" label-width="80px">
                    <span class="c666">商品条形码:</span>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                    <span class="c666">数量:</span><el-input v-model="input" placeholder="请输入内容"></el-input>
                    <el-button type="primary" @click="onSubmit" size="small">加入订单</el-button>
                    <el-button size="small" type="primary">重新出库</el-button>
                    <!-- 销售表 -->
                    <el-table
                        :data="salesData"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>

                    </el-table>
                    <div class="total"><span class="c666">总价</span><span></span><span class="c666">优惠</span><span></span><span class="c666">小计</span><span></span></div>
                    <span class="c666">会员卡号:</span><el-input v-model="input" placeholder="请输入内容"></el-input>
                    <el-button type="primary" @click="onSubmit" size="small">确认提交</el-button>
                </el-form>
                
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            salesData : [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            salesform :{
                onSubmit () {}
            }
        }
    },
    methods : {

    }
}
</script>
<style lang="less">
    @import "./salesgoods.less";
</style>


