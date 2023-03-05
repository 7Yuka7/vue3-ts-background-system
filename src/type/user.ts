//用户列表
export interface Role{
    role:number,
    roleName:string
}

export interface UserList{
    id:number,
    nickName:string,
    role:Role[],
    userName:string
}
//要被搜索的动态数据
interface SelectedData{
    role:number,
    nickName:string
}

//角色列表
interface RoleList{
    authority:number[],
    roleId:number,
    roleName:string
}

//编辑人员信息
interface ActiveUser{
    id:number,
    nickName:string,
    role:number[],
    userName:string
}

//
export class InitData{
    selectData:SelectedData = {
        role:0,
        nickName:''
    }
    roleList:RoleList[] = []
    userList:UserList[] = []
    originUserList:UserList[] = []
    isShow = false
    active:ActiveUser = {
        id:0,
        nickName:'',
        role: [],
        userName:''
    }
}