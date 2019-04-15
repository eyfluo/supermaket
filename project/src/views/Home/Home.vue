<template>
    <div class="home">
        <el-container>
            <!-- 左侧 -->
            <el-aside width="200px">
                <!-- 左侧导航栏 -->
                <LeftNav></LeftNav>
            </el-aside>
            <!-- 右侧 -->
            <el-container>
                <!-- 头部 -->
                <el-header>
                    <Top></Top>
                </el-header>
                <!-- 内容 -->
                <el-main>
                    <!-- 路由出口 -->
                    <router-view></router-view>
                </el-main>
                <!-- 尾部 -->
                <el-footer>
                    <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>

        
        <!-- <router-view></router-view> -->
    </div>
    
</template>
<script>
// 引入左侧导航栏组件
import LeftNav from "@/components/LeftNav/LeftNav.vue"
import Top from "@/components/Top/Top.vue"
import Bottom from "@/components/Bottom/Bottom.vue"
export default {
    
    components : {
        LeftNav, // 注册左侧导航组件
        Top,
        Bottom
    }

}
</script>
<style lang="less">
    @import "./Home.less";
</style>
