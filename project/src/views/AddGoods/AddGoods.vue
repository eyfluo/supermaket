<template>
    <div class="add-goods">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>添加商品</h3>
            </div>
            <!-- 面板内容 -->
            <div class="text item">
                <el-form ref="goodsForm" :model="goodsForm" :rules="rules" label-width="80px">
                    <el-form-item label="所属分类" prop="kind">
                        <el-select v-model="goodsForm.kind" placeholder="选择分类">
                        <el-option label="烟酒类" value="烟酒类"></el-option>
                        <el-option label="家居日用类" value="家居日用类"></el-option>
                        <el-option label="电子类" value="电子类"></el-option>
                        <el-option label="服装类" value="服装类"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="条形码" prop="barcode">
                        <el-input v-model="goodsForm.barcode">
                            <el-button slot="append" >生成条形码</el-button>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="商品名称" prop="goodsname">
                        <el-input v-model="goodsForm.goodsname"></el-input>
                    </el-form-item>
                    <el-form-item label="商品售价" prop="goodssaleprice">
                        <el-input v-model="goodsForm.goodssaleprice"></el-input>
                    </el-form-item>
                    <el-form-item label="市场价" prop="marketprice">
                        <el-input v-model="goodsForm.marketprice"></el-input>
                    </el-form-item>
                    <el-form-item label="商品进价" prop="commodityprice">
                        <el-input v-model="goodsForm.commodityprice"></el-input>
                    </el-form-item>
                    <el-form-item label="入库数量" prop="stocktotal">
                        <el-input v-model="goodsForm.stocktotal"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goodsweight">
                        <el-input v-model="goodsForm.goodsweight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位" prop="goodsbar">
                        <el-select v-model="goodsForm.goodsbar" placeholder="选择单位">
                        <el-option label="条" value="条"></el-option>
                        <el-option label="件" value="件"></el-option>
                        <el-option label="盒" value="盒"></el-option>
                        <el-option label="个" value="个"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="会员优惠" prop="vipspecial">
                        <el-radio-group v-model="goodsForm.vipspecial">
                        <el-radio label="享受"></el-radio>
                        <el-radio label="不享受"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否促销" prop="special">
                        <el-radio-group v-model="goodsForm.special">
                        <el-radio label="启用"></el-radio>
                        <el-radio label="禁用"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品简介" prop="goodsintroduce">
                        <el-input type="textarea" v-model="goodsForm.goodsintroduce" placeholder="不超过200字" size="small" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="addSubmit()">添加</el-button>
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
            //表单信息
            goodsForm : {
                kind : "",
                barcode : "",
                goodsname : "",
                goodssaleprice : "",
                marketprice : "",
                commodityprice : "",
                stocktotal : "",
                goodsweight : "",
                goodsbar : "",
                vipspecial : "",
                special : "",
                goodsintroduce : ""
            },
            //验证规则
            rules : {
                kind : [
                    {required : true,message : "请输入商品种类",tigger:"change"}
                ],
                barcode : [
                    {required : true,message : "请输入条形码",tigger:"blur"}
                ],
                goodsname : [
                    {required : true,message : "请输入商品名称",tigger:"blur"}
                ],
                goodssaleprice : [
                    {required : true,message : "请输入商品售价",tigger:"blur"}
                ],
                marketprice : [
                    {required : true,message : "请输入市场价",tigger:"blur"}
                ],
                commodityprice : [
                    {required : true,message : "请输入商品进价",tigger:"blur"}
                ],
                stocktotal : [
                    {required : true,message : "请输入入库数量",tigger:"blur"}
                ],
                goodsweight : [
                    {required : true,message : "请输入商品重量",tigger:"blur"}
                ],
                goodsbar : [
                    {required : true,message : "请输入商品单位",tigger:"blur"}
                ],
                vipspecial : [
                    {required : true,message : "请选择是否享受会员优惠",tigger:"blur"}
                ],
                special : [
                    {required : true,message : "请选择是否促销",tigger:"blur"}
                ],
                goodsintroduce : [
                    {min : 0,max : 200,message : "商品描述不应超过200个字",tigger:"blur"},
                    {required : true,message : "请输入商品简介",tigger:"blur"}
                ]
            }
        }
        
    },
    methods : {
        addSubmit () {
            //验证通过收集表单信息
            this.$refs.goodsForm.validate((valid) => {
                if(valid){
                    let params = {
                        kind : this.goodsForm.kind,
                        barcode : this.goodsForm.barcode,
                        goodsname : this.goodsForm.goodsname,
                        goodssaleprice : this.goodsForm.goodssaleprice,
                        marketprice : this.goodsForm.marketprice,
                        commodityprice : this.goodsForm.commodityprice,
                        stocktotal : this.goodsForm.stocktotal,
                        goodsweight : this.goodsForm.goodsweight,
                        goodsbar : this.goodsForm.goodsbar,
                        vipspecial : this.goodsForm.vipspecial,
                        special : this.goodsForm.special,
                        goodsintroduce : this.goodsForm.goodsintroduce
                    } 
                    //发送axios请求
                    this.request.post("/goods/addgoods",params)
                        .then((response) => {
                            //接收参数
                            let {code,reason} = response
                            if(code === 0){
                                this.$message({
                                    type : "success",
                                    message : reason
                                })
                                //路由跳转
                                this.$router.push("/home/goodsmanage")
                            }else if(code === 1){
                                this.$message({
                                    type : "danger",
                                    message : reason
                                })
                            }
                        })
                        .catch((err) => {
                            console.log("请求失败",err)
                        })
                }else{
                    console.log("添加失败")
                }
               
            })
            
        }
    }   
}




    

</script>
<style lang="less">
    @import "./addgoods.less";
</style>

