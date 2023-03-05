<template>
    <div class="common-layout">
        <el-container>
            <!-- 头部 -->
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <img src="../assets/logo.png" alt="" class="img">
                    </el-col>
                    <el-col :span="16">
                        <h2>后台管理系统</h2>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="info" plain @click="logOut">退出登录</el-button>
                    </el-col>
                </el-row>
            </el-header>

            <el-container>
                <!-- 侧边栏 -->
                <el-aside width="200px">
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                        :default-active="active" text-color="#fff" router>
                        <!-- router开启路由模式，通过el-menu-item index来进行转跳 -->

                        <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
                            <el-icon></el-icon>
                            <span>{{item.meta.title}}</span>
                        </el-menu-item>

                    </el-menu>
                </el-aside>

                <!-- 主页面 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter ,useRoute} from 'vue-router';

export default defineComponent({
    setup() {
        const router = useRouter()
        const route = useRoute()
        const list = router.getRoutes().filter(item => item.meta.isShow)

        //退出登录，就是清除token然后转跳到login页面
        const logOut = () => {
            localStorage.removeItem('token')
            router.push('/login')
        }

        return {list,active:route.path,logOut}
    }
})
</script>

<style scoped lang="less">
.common-layout {
    .el-header {
        height: 50px;
        background-color: #568609;
        text-align: center;
        line-height: 50px;

        .img {
            height: 50px;
        }
    }
    .el-aside{
        
        .el-menu{
            height: calc(100vh - 50px);
        }
    }
}
</style>