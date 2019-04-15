<template>
    <div class="account-manage">
        <el-card class="box-card">
            <div slot="header" >
                <h3>账号管理</h3>
            </div>
            <div  class="text item">
                <!-- 账号列表 -->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection">
                    </el-table-column>
                    <el-table-column
                        prop="account"
                        label="用户名"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="user_group"
                        label="用户组">
                    </el-table-column>
                    <el-table-column
                        label="日期">
                    <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
                    </el-table-column>
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary"  @click="editaccount(scope.row.id)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteAccount(scope.row.id)">删除</el-button>
                    </template>
                    </el-table-column>
                    
                    
                </el-table>
                <!-- 修改数据模态框 -->
                <el-dialog title="修改账号"  :visible.sync="dialogFormVisible" width="30%" >
                    <el-form :model="editAccountform" :rules="rules" ref="editForm">
                        <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
                        <el-input v-model="editAccountform.account" auto-complete="off" style="width : 220px"></el-input>
                        </el-form-item>
                        <el-form-item label="用户组" :label-width="formLabelWidth">
                        <el-select v-model="editAccountform.userGroup" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveedit">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 按钮 -->
                <div style="margin-top: 20px">
                    <el-button @click="batchdel()" type="danger" size="small">批量删除</el-button>
                    <el-button @click="setCurrent()" type="success" size="small">添加</el-button>
                </div>
                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3, 5, 10,20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    >
                </el-pagination>
            </div>
        </el-card>

    </div>
</template>
<script>
//引入moment 处理时间格式
import moment from "moment"
export default {
    data () {
        return {
            //账号管理数据
            tableData: [],
            //分页数据
            currentPage : 1, //当前页
            pageSize : 3, //每页条数
            total : 0,//总条数
            //收集选中状态的id
            selectedId : [],
            //模态框 宽度
            formLabelWidth : "100px",
            //模态框数据
            editAccountform : {
                account : "",
                userGroup : ""
            },

            //模态框显示隐藏
            dialogFormVisible : false,
            //验证修改模态框表单
            rules : {
                account : [
                    {required: true, message: '账号不能为空', trigger: 'blur'},//非空
                    {min:3,max:6,message:"请输入3~6位字符",trigger:"blur"}//长度
                ]
            },
            //收集修改账号id
            editId : "",
        }    
    },
    methods : {
        //点击添加按钮触发的函数
        setCurrent () {
            this.$router.push("/home/addaccount")
        },

        //发送请求获取账号数据
        getAccountList () {
            this.request.get("/account/accountmanage")
            .then((response) => {
                //将请求到的数据放入tableData
                this.tableData = response
                //console.log("账号管理请求成功",response)
            })
            .catch((err) => {
                console.log("请求失败",err)
            })
        },
        //分页请求
        getAccountListByPage(){
            //收集参数
            let params = {
                currentPage : this.currentPage,
                pageSize : this.pageSize
            }
            //发送请求
            this.request.get("/account/accountpage",params)
                .then(res => {
                    //接收参数
                    let {total,data} = res
                    //将数据渲染到页面中
                    this.total = total
                    this.tableData = data
                    //当前页没有数据且不为第一页  跳到上一页
                    if(this.currentPage !== 1 && !data.length){
                        //回到上一页
                        this.currentPage -= 1
                        //发送分页请求刷新页面
                        this.getAccountListByPage()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //删除账号
        deleteAccount(id){
            //提示框
            this.$confirm('是否要删除该账号', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {//点击确定后 执行删除
                    //将id放入对象中
                    let params = {
                        id
                    }
                    //发送请求 并向后端传当前id
                    this.request.get("/account/deleteaccount",params)
                    .then((response) => {
                            //接收数据
                        let {code,reason} = response
                        if(code === 0){
                                this.$message({//弹出框
                                type: 'success',
                                message: '删除成功!'
                            })
                            //刷新列表
                            this.getAccountListByPage()
                        }else if(code === 1){
                            this.$message.error({//弹出框
                                message: '删除失败!'
                            })    
                        }
                    })
                    .catch((err) => {
                        console.log("请求失败",err)
                    })

                   
                }).catch(() => {//点击取消执行
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
            
        },

        //当前选项改变时触发  批量删除  获取选中状态的数据 为数组
        handleSelectionChange(val) {
            this.selectedId = val.map(v => v.id)//遍历获取选中状态的数组 并将获取到的值赋给新的数组
        },
        //批量删除
        batchdel () {
            //判断获取id数组的长度是否存在
            if(!this.selectedId.length){//数组长度不存在
                this.$message.error("请选择需要删除的数据")
                return false
            }else{
                this.$confirm('是否要删除该账号', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {//点击确定后 执行删除
                    //获取选中的id
                    let params = {
                        selectedId : this.selectedId
                    }
                    //发送请求  将选中的id传给后端
                    this.request.get("/account/batchdel",params)
                        .then(res => {//接收响应成功
                            //接收参数  
                            let {code,reason} = res
                            //判断数据是否删除成功
                            if(code === 0){
                                this.$message({
                                    type : "success",
                                    message : reason
                                })
                                //刷新页面
                                this.getAccountListByPage()
                            }else if(code === 1){
                                this.$message.error(reason)
                            }
                        })
                        .catch(err => {//接收响应失败
                            console.log(err)
                        })
                   
                }).catch(() => {//点击取消执行
                    this.$message({
                        type: 'info',
                        message: '已取消批量删除'
                    });          
            });
            }
            
        },

        //修改账号
        editaccount (id) {
            //将模态框显示出来
            this.dialogFormVisible = true
            //将当前id保存起来
            this.editId = id
            //将当前id发送给后端 
            this.request.get("/account/editaccount",{id})
                .then(res => {
                    //接收数据  将数据回填模态框
                    this.editAccountform.account = res[0].account
                    this.editAccountform.userGroup = res[0].user_group
                })
                .catch(err => {
                    alert(err)
                })
        },

        //确定修改账号
        saveedit () {
            this.$refs.editForm.validate(valid => {//前端验证全部通过 发送请求
                if(valid){
                    //将模态框隐藏
                    this.dialogFormVisible = false
                    //获取当前id
                    console.log("这是获取到的id:",this.editId)
                    //收集表单数据
                    let parsams = {
                        account : this.editAccountform.account,
                        userGroup : this.editAccountform.userGroup,
                        editId : this.editId
                    }
                    console.log(parsams)
                    //将收集的数据和id发送给后端
                    this.request.post("/account/saveedit",parsams)
                        .then(res => {//接收请求成功的数据
                            let {code,reason} = res
                            if(code === 0){//修改数据库成功
                                this.$message({
                                    type : "success",
                                    message : reason
                                })
                                //刷新页面
                                this.getAccountListByPage()
                            }else if(code === 1){
                                this.$message.error(reason)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            
        },

        //分页
        //获取当前条数
        handleSizeChange(val){
            //获取当前条数
            this.pageSize = val
            //发送分页请求
            this.getAccountListByPage()
        },
        //获取当前页码
        handleCurrentChange(val){
            //获取当前页码
            this.currentPage = val
            //发送分页请求
            this.getAccountListByPage()
        }
    },
    //生命周期钩子函数
    created () {
        //发送axios请求 请求所有账号数据
        //调用发送请求函数
        this.getAccountListByPage()
    }, 
    //过滤器
    filters : {
        //处理时间
        filterCtime (time) {
            return moment(time).format("YYYY/MM/DD hh:mm:ss")
        }
    }
}
</script>
<style lang="less">
    @import "./accountmanage.less";
</style>

