//定义接收返回数据的接口
export interface ListInt{
    userId:number,
    id:number,
    title:string,
    introduce:string,
}
//定义使用数据的接口
interface selectDataInt{
    title:string,
    introduce:string,
    page:number,
    count:number,
    pageSize:number,
}


export class InitData{
    selectData:selectDataInt = {
        title:'',
        introduce:'',
        page:1,
        count:0,
        pageSize:5
    }
    list:ListInt[] = []//受到的内容数据
    listOrigin:ListInt[] = []
}