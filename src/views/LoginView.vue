<template>
    <div class="login-container">

        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="70px" class="demo-ruleForm">
            <h2>后台管理系统</h2>
            <el-form-item label="账号：" prop="username">
                <el-input v-model="ruleForm.username" type="username" autocomplete="off" />
            </el-form-item>

            <el-form-item label="密码：" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>

            <!-- 按钮,传入的参数是该表单组件 -->
            <el-form-item>
                <el-button class="el-btn" type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
                <el-button class="el-btn" @click="resetForm">Reset</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
//引入确定结构的类
import { LoginData } from '../type/login'

//引入axios请求
import {reqLogin} from '../request'

//引入element-ui 组件
import type { FormInstance } from 'element-plus'

//引入路由转跳--vue3中再无$router
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        //数据
        const data = reactive(new LoginData());

        //表单验证规则不需要响应式
        const rules = {
            userName: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 10, message: '账号长度应在3-10位之间', trigger: 'blur' },
            ],
            passWord: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 10, message: '账号长度应在3-10位之间', trigger: 'blur' },
            ],
        };

        //登录--组件中看来的        
        //组件中定义了ref为ruleFormRef，在此处限制了泛型
        //在登录按钮中使用了ruleFormRef，作为参数传入至formEl
        const ruleFormRef = ref<FormInstance>()
        const router = useRouter()//-->等同于$router
        const submitForm = (formEl: FormInstance | undefined) => {
            //为空直接返回
            if (!formEl) return
            //FormInstance泛型里面有validate方法？
            formEl.validate(async (valid) => {
                //表单验证valid是布尔值
                if (valid) {
                    // 在此处发送请求
                    let result = await reqLogin(data.ruleForm)
                    console.log('result',result)
                    if(result.code === 200){
                        //成功--1.存Token 2.转跳
                        localStorage.setItem('token',result.token)
                        router.push('/')
                    }else{
                        throw new Error('登录失败')
                    }
                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }

        //重置
        const resetForm = () => {
            data.ruleForm.username = '';
            data.ruleForm.password = ''
        }

        //methods:

        return { ...toRefs(data), rules, resetForm ,submitForm,ruleFormRef}
    }
})
</script>

<style scoped lang="less">
.login-container {
    width: 100%;
    height: 100%;
    background: url('../assets/bg.jpg') center center/cover;
    position: relative;
    text-align: center;

    h2 {
        margin-bottom: 20px;
    }

    .demo-ruleForm {
        width: 500px;
        // height: 200px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 20px;
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
        padding: 40px;

        position: absolute;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%);
    }

    .el-btn {
        width: 48%;
    }
}</style>