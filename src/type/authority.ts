export interface ListInt {
    name:string,
    roleId:number,
    // ?表示可有可无
    roleList?:ListInt[],
    viewRole?:string
}

export class Authority {
    id: number
    authority: number[]
    list:ListInt[] = []
    treeRef:any

    constructor(id: number, authority: number[]) {
        this.id = id
        this.authority = authority
    }
}