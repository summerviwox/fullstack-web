import axios from "axios";
import router from "../router/router";
let url = process.env.VUE_APP_URL

let instance = axios.create({})
instance.interceptors.request.use(
    config=>{
        const token = localStorage.getItem("token")
        switch (config.method.trim()){
            case "get":
                config.params.token = token
                break
            case "post":
                config.headers["token"] = token
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
        if(respone.data=='500'){
            localStorage.setItem('loginres','')
            router.push("/Login",{})
        }
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
            typeof go ==="function"&&go(res.data?res.data:res)
        }).catch(error=>{
            console.log(error)
            typeof down ==="function"&&down(error)
        })
    },
    fileApi(moudle,data,go,down){
        instance.request({
            url:url+moudle,
            method:'post',
            data:data,
            accept:'file',
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(res=>{
            if(!res.data){
                console.log(res)
            }
            typeof go ==="function"&&go(res.data?res.data:res)
        }).catch(error=>{
            console.log(error)
            typeof down ==="function"&&down(error)
        })
    },
    selectWithOutHtmlDataByParentId:'/blog/selectWithOutHtmlDataByParentId',
    search:'/blog/search',
    selectParentsById:'/blog/selectParentsById',
    selectMarkdownById:'/blog/selectMarkdownById',
    updateByPrimaryKey:'/blog/updateByPrimaryKey',
    insert:'/blog/insert',
    deleteByPrimaryKey:'/blog/deleteByPrimaryKey',
    updateParentIdByPrimaryKey:'/blog/updateParentIdByPrimaryKey',
    selectHtmlById:'/blog/selectHtmlById',
    upload:'/blog/upload',
    login:'/user/login',
}

export default api