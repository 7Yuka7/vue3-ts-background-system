<template>
    <!-- 上方搜索栏，使用data.selectData -->
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
            <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
            <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
    <!-- 中间内容栏--使用到了data.list -->
    <el-table :data="listData" border style="width: 100%">
        <el-table-column prop="id" label="Id" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="introduce" label="详情" />
    </el-table>
    <!-- 下方分页器,添加了页面改变器，由于数据没有分页，因此在此处通过前端进行分页 -->
    <!-- 这种：page-size都是组件自带的属性，设置可以实现不同效果 -->
    <el-pagination @current-change="currentChange" @size-change="sizeChange" layout="prev, pager, next"
        :page-size="selectData.pageSize" :total="list.length" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed , watch } from 'vue'
//引入接口
import { reqGoodsList } from '@/request';
//引入数据类型
import { InitData, ListInt } from '@/type/goods'

export default defineComponent({
    setup() {
        //数据定义
        const data = reactive(new InitData())

        //发送数据请求
        reqGoodsList().then((res) => {
            console.log('111')
        }, (err) => {
            //此处err读取到数据，因此使用err给data.list赋值
            data.list = err
            data.listOrigin = err
        })

        //分页器功能
        const currentChange = (page: number) => {
            //会传入一个当前页面的参数 -- 修改data中的数据
            data.selectData.page = page
        }

        const sizeChange = (pagesize: any) => {
            //不知道会传入什么
            console.log(pagesize)
        }

        //根据页码的选择动态加载数据--计算属性
        let listData = computed(() => {
            //对已有数据进行裁剪 slice(起始,结束)-->根据page动态变化 -->页数*一页显示数
            return data.list.slice((data.selectData.page - 1) * data.selectData.pageSize, data.selectData.page * data.selectData.pageSize)
        })

        //按钮点击搜索数据--输入框已经双向绑定
        const onSubmit = () => {
            //每次搜索前都复原源数据
            data.list = data.listOrigin
            let arr: ListInt[] = []
            //判断有无输入值
            if (data.selectData.title || data.selectData.introduce) {


                //判断哪个输入框有值/或者都有值
                if (data.selectData.title) {
                    //搜索标题，就去标题中查找
                    arr = data.list.filter(item => {
                        return item.title.includes(data.selectData.title)
                    })
                }
                console.log(arr)


                if (data.selectData.introduce) {
                    //如果同时键入了两个关键词，就取交集
                    if (arr) {
                        arr = arr.filter(item => item.introduce.includes(data.selectData.introduce))
                    } else {
                        //如果没有title关键词，就只搜索Introduce
                        arr = data.list.filter(item => {
                            return item.introduce.includes(data.selectData.introduce)
                        })
                    }
                }
                //最后将结果替换listData显示
                data.list = arr
            }
        }

        //使用watch属性监视输入框的变化
        watch([()=>data.selectData.title,()=>data.selectData.introduce],()=>{
            //如果都为空，则重新赋值
            if(!data.selectData.title && !data.selectData.introduce){
                data.list = data.listOrigin
            }
        })
        



        return { ...toRefs(data), onSubmit, currentChange, sizeChange, listData }
    }
})
</script>

<style scoped></style>