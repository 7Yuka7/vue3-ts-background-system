import requests from "./request";

//用来显示类型的接口
import {LoginFormInt} from '../type/login'

//定义接口
export const reqLogin = (data:LoginFormInt) =>{
    
    //返回响应体
    return requests({
        url:'/login',
        method:'post',
        data
    })
}