<template>
    <div>
        <el-tree
        ref="treeRef"
        :data="list"
        show-checkbox
        node-key="roleId"
        :check-strictly="true"
        :default-checked-keys="authority"
        :props="{
            children:'roleList',
            label:'name'
        }"
        />
        <el-button @click="updateUser">确认修改</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'

import { useRoute } from 'vue-router';

import {reqAuthority} from '@/request/index'

import {Authority} from '@/type/authority'

export default defineComponent({
    setup () {
        const route = useRoute()
        const params:any = route.params

        const data = reactive(new Authority(params.id*1,JSON.parse(params.authority) ))

        //挂载的时候请求数据
        onMounted(()=>{
            getAuthority()
        })

        const getAuthority = async () => {
            try {
                let result = await reqAuthority()
                data.list = result.data
                // console.log('获取权限列表',result)
            } catch (error) {
                console.log(error)
            }
            
            
        }

        //修改权限
        const updateUser = () => {
            console.log(data.treeRef.getCheckedKeys().sort((a:number,b:number)=>a-b))
        }

        return {...toRefs(data),updateUser}
    }
})
</script>

<style scoped>

</style>