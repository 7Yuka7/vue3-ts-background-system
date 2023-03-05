<template>
    <!-- 上方搜索栏， -->
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-button type="primary" @click="addRole">添加角色</el-button>
        </el-form-item>
    </el-form>
    <!-- 中间内容栏-- -->
    <el-table :data="list" border style="width: 100%">
        <el-table-column prop="roleId" label="Id" width="180" />
        <el-table-column prop="roleName" label="角色名" width="180" />
        <!-- 修改权限 -->
        <el-table-column prop="role" label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="changeRole(scope.row)">修改权限</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { reqRoleList } from '@/request';
import { ElMessage, ElMessageBox } from 'element-plus'

import { InitData,RoleList } from '@/type/role'

import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        const router = useRouter()
        //请求数据
        onMounted(() => {
            getRoleList()
        })
        const getRoleList = async () => {
            try {
                let result = await reqRoleList()
                data.list = result.data
            } catch (error) {
                console.log(error);
            }
        }
        //添加角色
        const addRole = () => {
            ElMessageBox.prompt('请输入角色名', '添加角色', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    if (value) {
                        //有值，将value添加到list数据中，list是一个数组，需要用push的方法
                        data.list.push({
                            authority:[],
                            roleId:data.list.length + 1,
                            roleName: value
                        })

                    }
                    value && ElMessage({
                        type: 'success',
                        message: `${value} 添加成功`,
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '添加失败',
                    })
                })
        }

        //添加权限
        const changeRole = (row:RoleList) => {
            // console.log(row)
            router.push({
                name:'authority',
                params:{
                    id:row.roleId,
                    authority:JSON.stringify(row.authority) 
                }
            })
        }
        return { ...toRefs(data), addRole, changeRole }
    }
})
</script>

<style scoped></style>