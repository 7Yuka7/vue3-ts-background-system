<template>
    <div>
        权限列表
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive } from 'vue'

import { useRoute } from 'vue-router';

import {reqAuthority} from '@/request/index'

import {Authority} from '@/type/authority'

export default defineComponent({
    setup () {
        const route = useRoute()
        const params = route.params

        const data = reactive(new Authority(params.id,params.authority))

        //挂载的时候请求数据
        onMounted(()=>{
            getAuthority()
        })

        const getAuthority = async () => {
            try {
                let result = await reqAuthority()
                
                // console.log('获取权限列表',result)
            } catch (error) {
                console.log(error)
            }
            
            
        }

        return {}
    }
})
</script>

<style scoped>

</style>