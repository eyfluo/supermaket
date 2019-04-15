<template>
    <div class="systeminfo">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>系统信息</h3>
            </div>
            <div class="text item">
                <el-alert
                    title="商品总数  已经销售的总金额   库存商品总价"
                    type="info"
                    show-icon>
                </el-alert>
                <el-alert
                    title="导入数据"
                    type="info"
                    :closable="false"
                    show-icon>
                </el-alert>
                <el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <h4>销售排行</h4>
                                </div>
                                <div class="text item">
                                    <el-table
                                        :data="salesRankData"
                                        stripe
                                        style="width: 100%">
                                        <el-table-column
                                        prop="GoodsName"
                                        label="商品名称">
                                        </el-table-column>
                                        <el-table-column
                                        prop="salesCount"
                                        label="销量">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <h4>缺货的商品</h4>
                                </div>
                                <div class="text item">
                                    <el-table
                                        :data="defectGoodsData"
                                        stripe
                                        style="width: 100%">
                                        <el-table-column
                                        prop="GoodsName"
                                        label="商品名称">
                                        </el-table-column>
                                        <el-table-column
                                        prop="stock"
                                        label="库存">
                                        </el-table-column>
                                        <el-table-column
                                        prop="operate"
                                        label="操作">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>      
                        </el-col>
                    </el-row>
                   
                </el-row>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            salesRankData : [{
                GoodsName: '2016-05-02',
                salesCount: '王小虎',
            }],
            defectGoodsData : [{
                GoodsName: '2016-05-02',
                stock: '王小虎',
                operate: '上海市普陀区金沙江路 1518 弄'
            }]
        }
    }
}
</script>
<style lang="less">
    @import "./systeminfo.less";
</style>


