import requests from "./request";

//用来显示类型的接口
import {LoginFormInt} from '../type/login'

//登录接口
export const reqLogin = (data:LoginFormInt) =>{
    
    //返回响应体
    return requests({
        url:'/login',
        method:'post',
        data
    })
}

//请求商品列表接口
export const reqGoodsList = () => {
    return requests({
        url:'/getGoodsList',
        method:'get'
    })
}

//用户列表接口
export const reqUserList = () => {
    return requests({
        url:'/getUserList',
        method:'get'
    })
}

//角色列表接口
export const reqRoleList = () => {
    return requests({
        url:'/getRoleList',
        method:'get'
    })
}

//获取权限列表接口
export const reqAuthority = () => {
    return requests({
        url:'/getAuthorityList',
        method:'get'
    })
}