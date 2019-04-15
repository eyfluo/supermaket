<template>
    <div class="sales-total">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>销售统计</h3>
            </div>
            <div class="text item">
                <el-date-picker
                    v-model="value"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    @blur="getSaleData"
                    end-placeholder="结束日期">
                </el-date-picker>

                <div id="box" style="height:400px"></div>
            </div>
        </el-card>
        
    </div>
</template>
<script>
export default {
    data () {
        return {
           salesTotalForm : {} ,
           value : ""
        }
        
    },

    methods : {
        onSubmit () {},
        getSaleData(){
            console.log(val)
        }
    },
    mounted () {
         // 基于准备好的dom，初始化echarts图表
        var myChart = this.echarts.init(document.getElementById('box')); 
        
        var option = {
            tooltip: {
                show: true
            },
            legend: {
                data:['销量']
            },
            xAxis : [
                {
                    type : 'category',
                    data : ["2019-04-15","2019-04-16","2019-04-17","2019-04-18","2019-04-19","2019-04-20"]
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    "name":"销量",
                    "type":"line",
                    "data":[54, 19, 87, 32, 180, 120]
                }
            ]
        };

        // 为echarts对象加载数据 
        myChart.setOption(option); 
    }
}
</script>
<style lang="less">
    @import "./salestotal.less";
</style>


