<template>
    <!-- 上方搜索栏， -->
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
            <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
            <el-select v-model="selectData.role" placeholder="选择角色">
                <el-option label="全部" :value="0" />
                <el-option :label="item.roleName" :value="item.roleId" v-for="item in roleList" :key="item.roleId" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
    <!-- 中间内容栏-- -->
    <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="Id" width="180" />
        <el-table-column prop="nickName" label="姓名" width="180" />
        <!-- 插槽形式,显示用户的角色 -->
        <el-table-column prop="role" label="角色">
            <template #default="scope">
                <el-button link size="small" v-for="character in scope.row.role" :key="character.role">{{ character.roleName
                }}</el-button>
            </template>
        </el-table-column>
        <!-- 显示操作 -->
        <el-table-column prop="role" label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="changeInfo(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 弹出对话框 -->
    <el-dialog v-model="isShow" title="编辑信息">
        <el-form :model="active">
            <el-form-item label="姓名" label-width="50">
                <el-input v-model="active.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="角色" label-width="50px">
                <el-select multiple v-model="active.role" placeholder="请选择角色">
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="updateInfo">更改</el-button>
                <el-button @click="cancelUpdate">
                    取消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'

//引入接口
import { reqRoleList, reqUserList } from '@/request'
import { InitData, UserList, Role } from '@/type/user'

export default defineComponent({
    setup() {

        const data = reactive(new InitData())

        //挂载的时候请求数据
        onMounted(() => {
            getUserList()//获取用户列表
            getRoleList()//获取角色列表
        })
        const getUserList = async () => {
            try {
                let result = await reqUserList()
                data.userList = result.data
                //多存一遍
                data.originUserList = result.data
                console.log(data.userList)
            } catch (error) {
                console.log('获取用户数据列表', error)
            }
        }
        const getRoleList = async () => {
            try {
                let result = await reqRoleList()
                data.roleList = result.data
            } catch (error) {
                console.log('获取角色列表', error)
            }

        }

        //查询按钮--逻辑大有问题
        const onSubmit = () => {
            //每次搜索前都重新赋值
            data.userList = data.originUserList
            let arr: UserList[] = []
            //根据不同返回
            if (data.selectData.nickName || data.selectData.role) {
                //根据用户名
                if (data.selectData.nickName) {
                    arr = data.userList.filter(item => {
                        return item.nickName.includes(data.selectData.nickName)
                    })
                }
                if (data.selectData.role) {
                    //走到此处说明已经是判断过前面有无了--这几把数据结构太恶心人了role是个数组，里面嵌套了对象，对象中有role和roleName属性
                    arr = (data.selectData.nickName ? arr : data.userList).filter(item => {
                        return item.role.find(i => i.role === data.selectData.role)
                    })

                }
                data.userList = arr
            }

        }
        //监视输入框的变化
        watch([() => data.selectData.nickName, () => data.selectData.role], () => {
            if (data.selectData.nickName === '' || data.selectData.role === 0) {
                //每次重置其中一个，就会触发更新
                onSubmit()
            }
        })

        //点击编辑
        const changeInfo = (row: UserList) => {
            data.isShow = true
            data.active = {
                id: row.id,
                nickName: row.nickName,
                role: row.role.map(item => item.role),
                userName: row.userName
            }
            console.log(row)
        }

        //编辑确认--将active中的信息赋值到原本的列表中去--根据id去匹配
        const updateInfo = () => {
            //主要修改的就是role和nickName--
            //单独定义role
            const roleInfo: Role[] = []
            data.active.role.forEach(item => {
                //造数据结构
                roleInfo.push({ "role": item, "roleName": item === 1 ? '管理员' : '普通用户' })
            })
            //每次都要遍历全部是不是太慢了？
            for (let i = 0; i < data.userList.length; i++) {
                if (data.userList[i].id === data.active.id) {
                    data.userList[i] = {
                        id: data.active.id,
                        nickName: data.active.nickName,
                        role: roleInfo,
                        userName: data.active.nickName
                    }
                    //找到直接退出循环
                    break
                }
            }

            //关闭弹窗
            data.isShow = false


        }

        //编辑取消--什么都不做，直接关闭弹窗
        const cancelUpdate = () => {
            data.isShow = false
        }

        return { ...toRefs(data), onSubmit, changeInfo, updateInfo, cancelUpdate }
    }
})
</script>

<style scoped></style>