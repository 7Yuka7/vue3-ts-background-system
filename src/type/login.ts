//定义接口
export interface LoginFormInt{
    username:string;
    password:string;
}
//定义类
export class LoginData{
    ruleForm:LoginFormInt = {
        username:'',
        password:''
    }
}
