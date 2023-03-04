//二次封装axios
import axios from 'axios';

const requests = axios.create({
    baseURL:'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout:5000,
})

//请求拦截器
requests.interceptors.request.use((config)=>{
    //设置token
    if(localStorage.getItem('token')){
        config.headers.token = localStorage.getItem('token')
    }

    return config
})

//响应拦截器
requests.interceptors.response.use(
    (res)=>{
        const code:number = res.data.data.code
        if(code !==200){
            //说明返回数据错误
            return Promise.reject(res.data.data)
        }

        return res.data.data
    },
    (err)=>{
        console.log(err)
    }
)

export default requests