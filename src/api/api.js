import axios from "axios";

let url = process.env.VUE_APP_URL

let instance = axios.create({})
instance.interceptors.request.use(
    config=>{
        switch (config.method.trim()){
            case "get":
                config.params.token = 'summerviwox'
                break
            case "post":
                config.headers.token = 'summerviwox'
                break
        }
        return config
    },
    error => {
        return error
    }
)

instance.interceptors.response.use(
    respone=>{
        return respone
    },
    error=>{
        return error
    }
)

const api = {
    getApi(moudle,params,go,down){
        instance.request({
            url:url+moudle,
            method:"get",
            params:params,
        }).then(res=>{
            typeof go ==="function"&&go(res.data)
        }).catch(error=>{
            console.log(error)
            typeof down ==="function"&&down(error)
        })
    },
    postApi(moudle,data,go,down){
        instance.request({
            url:url+moudle,
            method:"post",
            data:data,
        }).then(res=>{
            if(!res.data){
                console.log(res)
            }
            typeof go ==="function"&&go(res.data)
        }).catch(error=>{
            console.log(error)
            typeof down ==="function"&&down(error)
        })
    },
    selectWithOutHtmlDataByParentId:'/selectWithOutHtmlDataByParentId',
    search:'/search',
    selectParentsById:'/selectParentsById',
    selectMarkdownById:'/selectMarkdownById',
    updateByPrimaryKey:'/updateByPrimaryKey',
    insert:'/insert',
    deleteByPrimaryKey:'/deleteByPrimaryKey',
    updateParentIdByPrimaryKey:'/updateParentIdByPrimaryKey',
}

export default api