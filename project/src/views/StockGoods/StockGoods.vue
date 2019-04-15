<template>
    <div class="stock-total">
        <el-card class="box-card">
            <div slot="header">
                <h3>商品入库</h3>
            </div>
            <div class="text item">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品条形码" prop="barCode">
                        <el-input type="text" v-model="ruleForm.barCode" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="count">
                        <el-input type="text" v-model="ruleForm.count" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="进价" prop="price">
                        <el-input v-model="ruleForm.price"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="submitForm()" size="small">入库</el-button>
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
            ruleForm : {
                barCode : "",
                count : "",
                price : ""
            },
            rules : {
                barCode : [
                    {required : true,message : "请输入商品条形码",tigger : "blur"}
                ],
                count : [
                    {required : true,message : "请输入商品数量",tigger : "blur"}
                ],
                price : [
                    {required : true,message : "请输入商品价格",tigger : "blur"}
                ]
            }
        }
    },
    methods : {
        submitForm () {
            //所有验证通过 收集表单数据
            this.$refs.ruleForm.validate(( valid ) => { 
                if(valid){
                   let parmars = {
                        barCode : this.ruleForm.barCode,
                        count : this.ruleForm.count,
                        price : this.ruleForm.price  
                    } 
                }else{
                    console.log("入库失败")
                }
                
            })

        }
    }
}
</script>
<style lang="less">
    @import "./stockgoods.less";

    
</style>


