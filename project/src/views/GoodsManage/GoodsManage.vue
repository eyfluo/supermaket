<template>
    <div class="goods-manage">
        <!-- 面板 -->
        <el-card class="box-card">
            <div slot="header">
                <h3>商品管理</h3>
            </div>
            <!-- 面板主体内容 -->
            <div class="text item">
                <!-- 搜索 -->
                <el-form :inline="true" :model="searchFrom" class="demo-form-inline" >
                    <el-form-item label="选择分类">
                        <el-select v-model="searchFrom.cateName" placeholder="活动区域">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="烟酒类" value="烟酒类"></el-option>
                        <el-option label="家居日用类" value="家居日用类"></el-option>
                        <el-option label="电子类" value="电子类"></el-option>
                        <el-option label="服装类" value="服装类"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input v-model="searchFrom.keyword" placeholder="请输入条形码或商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="small">查询</el-button>
                    </el-form-item>
                </el-form>
                <!-- 数据列表 -->
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="barcode"
                        label="商品条形码">
                    </el-table-column>
                    <el-table-column
                        prop="goodsname"
                        label="商品名称">
                    </el-table-column>
                    <el-table-column
                        prop="kind"
                        label="所属分类">
                    </el-table-column>
                    <el-table-column
                        prop="goodssaleprice"
                        label="售价">
                    </el-table-column>
                    <el-table-column
                        prop="ctime"
                        label="时间">
                        <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
                    </el-table-column>

                    <el-table-column
                        label="管理">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary"  @click="editgoods(scope.row.id)">修改</el-button>
                            <el-button size="mini" type="danger" @click="delgoods(scope.row.id)">删除</el-button>
                        </template>
                        
                    </el-table-column>
                </el-table>
                <!-- 修改数据模态框 -->
                <el-dialog title="修改商品"  :visible.sync="dialogFormVisible" width="30%" >
                    <el-form :model="editGoodsform" :rules="rules" ref="editForm">
                        <el-form-item label="商品条形码" :label-width="formLabelWidth" prop="barcode">
                        <el-input v-model="editGoodsform.barcode" auto-complete="off" style="width : 220px"></el-input>
                        </el-form-item>
                        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsname">
                        <el-input v-model="editGoodsform.goodsname" auto-complete="off" style="width : 220px"></el-input>
                        </el-form-item>
                        <el-form-item label="售价" :label-width="formLabelWidth" prop="goodssaleprice">
                        <el-input v-model="editGoodsform.goodssaleprice" auto-complete="off" style="width : 220px"></el-input>
                        </el-form-item>
                        <el-form-item label="所属分类" :label-width="formLabelWidth" class="wi">
                            <el-select v-model="editGoodsform.kind" placeholder="请选择用户组">
                                <el-option label="烟酒类" value="烟酒类"></el-option>
                                <el-option label="家居日用类" value="家居日用类"></el-option>
                                <el-option label="电子类" value="电子类"></el-option>
                                <el-option label="服装类" value="服装类"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveedit">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3, 6, 9, 11]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>

    </div>
</template>
<script>
//引入moment处理时间
import moment from "moment"
export default {
    data () {
        return {
            // 搜索框数据
            searchFrom : {
                cateName : "",
                keyword : ""
            },
            //商品列表数据
            tableData : [],
            //模态框显示隐藏
            dialogFormVisible : false,
            formLabelWidth : "100px",
            //修改表单数据  模态框
            editGoodsform : {
                barcode : "",
                goodsname : "",
                goodssaleprice : "",
                kind : "",
                
                },
            //验证规则
            rules : {
                barcode : [
                    {required: true, message: '商品条形码不能为空', trigger: 'blur'}
                ],
                goodsname : [
                    {required: true, message: '商品名称不能为空', trigger: 'blur'}
                ],
                goodssaleprice :  [
                    {required: true, message: '售价不能为空', trigger: 'blur'}
                ],
                kind :  [
                    {required: true, message: '所属分类不能为空', trigger: 'blur'}
                ],
            },
            //保存id
            editgoodsId : "",
            //分页
            //每条页数
            pageSize : 3,
            //当前页
            currentPage : 1,
            //总条数
            total : 0
        }
        
    },
    methods : {
        //分页
        //发送请求
        getGoodsListByPage(){
            //收集当前页码和每页条数
            let params = {
                pageSize : this.pageSize,
                currentPage : this.currentPage,
                cateName : this.searchFrom.cateName,
                keyword : this.searchFrom.keyword
            }
            this.request.get("goods/goodspage",params)
                .then(res => {
                    //接收参数
                    let { total,data} = res
                    this.total = total
                    this.tableData = data

                    if(this.currentPage !== 1&& !data.length){//当前页面不为第一页且页面中没有数据
                        //回到上一页
                        this.currentPage -= 1
                        //刷新页面
                        this.getGoodsListByPage()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //每页条数
        handleSizeChange (val) {
            //获取每页条数
            this.pageSize = val
            //刷新列表 发送分页请求
            this.getGoodsListByPage()
        },
        //当前页码
        handleCurrentChange (val) {
            //获取当前页码
            this.currentPage = val
            //刷新列表  发送分页请求
            this.getGoodsListByPage()
        },
 
        //刷新页面  商品列表
        getGoodsList(){
            this.request.get("/goods/goodsmanage")
                .then(res => {
                    //接收数据渲染页面
                    this.tableData = res
                })
                .catch(err => {
                    console.log(err)
                })
        },

        //删除
        delgoods(id){
            //弹提示框
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {//点击确定
                //发送请求
                this.request.get("/goods/delgoods",{id})
                    .then((res) => {
                        //接收参数
                        let {code,reason} = res
                        //判断数据是否操作成功
                        if(code === 0){
                            this.$message({
                                type : "success",
                                message : reason
                            })
                            //刷新页面  获取当前页面的数据
                            this.getGoodsListByPage()
                        }else if(code === 1){
                            this.$message.error({
                                message : reason
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

        //修改
        editgoods(id){
            //保存id
            this.editgoodsId = id
            //改变模态框状态
            this.dialogFormVisible = true
            //发送请求
            this.request.get("/goods/editgoods",{id})
                .then(res => {
                    //接收参数 数据回填
                    this.editGoodsform.barcode = res[0].barcode
                    this.editGoodsform.goodsname = res[0].goodsname
                    this.editGoodsform.goodssaleprice = res[0].goodssaleprice
                    this.editGoodsform.kind = res[0].kind

                })
                .catch(err => {
                    console.log(err)
                })
        },
        //保存修改
        saveedit(){
            this.$refs.editForm.validate(valid => {//前端验证全部通过 发送请求
                if(valid){
                    //改变模态框状态
                    this.dialogFormVisible = false
                    //收集表单数据
                    let params = {
                        barcode : this.editGoodsform.barcode,
                        goodsname : this.editGoodsform.goodsname,
                        goodssaleprice : this.editGoodsform.goodssaleprice,
                        kind : this.editGoodsform.kind,
                        editgoodsId : this.editgoodsId
                    }
                    //发送请求
                    this.request.post("/goods/saveeditgoods",params)
                        .then(res => {
                            //接收数据
                            let {code,reason} = res
                            if(code === 0){
                                this.$message({
                                    type : "success",
                                    message : reason
                                })
                            }else if(code === 1){
                                this.$message.error({
                                    message : reason
                                })
                            }
                            //刷新列表  获取当前页面的数据
                            this.getGoodsListByPage()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        },

        //搜索
        search(){
            this.getGoodsListByPage()
        }
        /* search(){
            //收集参数
            let params = {
                cateName : this.searchFrom.cateName,
                keyword : this.searchFrom.keyword
            }
            console.log(params)
            this.request.get("/goods/searchgoods",params)
                .then(res => {
                    //接收参数 并将参数赋值给商品列表
                    this.tableData = res
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        } */
    },
    //生命周期  钩子函数 刷新页面即触发
    created(){
        this.getGoodsListByPage()
    },
    filters : {
        filterCtime (time) {
            return moment(time).format("YYYY-MM-DD")
        }
    }
}





</script>
<style lang="less">
    @import "./goodsmanage.less";
</style>


