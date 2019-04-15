<template>
    <div class="leftnav">
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#171d30"
            text-color="#ccc"
            unique-opened
            router
            active-text-color="#252f46">
            <!-- 系统管理 -->
            <el-submenu :index="(index+1)+''" v-for="(menu,index) in menus" :key="index">
                <template slot="title">
                    <i :class="menu.iconClass"></i>
                    <span>{{ menu.title }}</span>
                </template>
                <el-menu-item-group v-for="(submenu,index) in menu.children" :key="index"> 
                    <el-menu-item :index="submenu.path">{{submenu.subTitle}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    data () {
            return {
                menus : [
                // 系统管理
                {
                    iconClass : "el-icon-menu",
                    title : "系统管理",
                    children : [
                        {path : "/home/systeminfo",subTitle : "系统消息"}
                    ]
                },
                //账号管理
                {
                    iconClass : "el-icon-news",
                    title : "账号管理",
                    children : [
                        {path : "/home/accountmanage",subTitle : "账号管理"},
                        {path : "/home/addaccount",subTitle : "添加账号"},
                        {path : "/home/passwordmodify",subTitle : "密码修改"}
                    ]
                },
                //统计管理
                {
                    iconClass : "el-icon-edit-outline",
                    title : "统计管理",
                    children : [
                        {path : "/home/stocktotal",subTitle : "进货统计"},
                        {path : "/home/salestotal",subTitle : "销售统计"},
                    ]
                },
                //商品管理
                {
                    iconClass : "el-icon-goods",
                    title : "商品管理",
                    children : [
                        {path : "/home/goodsmanage",subTitle : "商品管理"},
                        {path : "/home/addgoods",subTitle : "添加商品"},
                    ]
                },

                //出货管理
                {
                    iconClass : "el-icon-sold-out",
                    title : "出货管理",
                    children : [
                        {path : "/home/salesgoods",subTitle : "商品出库"},
                    ]
                },
                // 进货管理
                {
                    iconClass : "el-icon-edit",
                    title : "进货管理",
                    children : [
                        {path : "/home/stockgoods",subTitle : "商品入库"},
                    ]
                },
                // 会员管理
                {
                    iconClass : "el-icon-mobile-phone",
                    title : "会员管理",
                    children : [
                        {path : "/home/vipmanage",subTitle : "会员管理"},

                    ]
                }

            ]
        }
    }
}
</script>
<style lang="less">
    // 引入左侧导航栏样式
    @import "./LeftNav.less";
</style>




