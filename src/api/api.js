import axios from "axios";
import router from "../router/router";
import util from "@/util/util";
let url = 'https://'+process.env.VUE_APP_DOMAIN
let testUrl = 'https://'+process.env.VUE_APP_DOMAIN+":444"

let instance = axios.create({})
instance.interceptors.request.use(
    config=>{
        const token = localStorage.getItem("token")
        switch (config.method.trim()){
            case "get":
                if(config.url.startsWith(testUrl)){
                    config.params.token = 'summerviwox'
                }else{
                    config.params.token = token
                }
                break
            case "post":
                if(config.url.startsWith(testUrl)){
                    config.headers["token"] = 'summerviwox'
                }else{
                    config.headers["token"] = token
                }
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
            router.push("/login",{})
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
            typeof go ==="function"&&go(res.data)
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
            typeof go ==="function"&&go(res.data)
        }).catch(error=>{
            console.log(error)
            typeof down ==="function"&&down(error)
        })
    },
    getTestApi(moudle,params,go,down){
        instance.request({
            url:testUrl+moudle,
            method:"get",
            params:params,
        }).then(res=>{
            typeof go ==="function"&&go(res.data)
        }).catch(error=>{
            console.log(error)
            typeof down ==="function"&&down(error)
        })
    },
    postTestApi(moudle,data,go,down){
        instance.request({
            url:testUrl+moudle,
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
    selectWithOutHtmlDataByParentId:'/record-b/blog/selectWithOutHtmlDataByParentId',
    search:'/record-b/blog/search',
    selectParentsById:'/record-b/blog/selectParentsById',
    selectMarkdownById:'/record-b/blog/selectMarkdownById',
    updateByPrimaryKey:'/record-b/blog/updateByPrimaryKey',
    insert:'/record-b/blog/insert',
    deleteByPrimaryKey:'/record-b/blog/deleteByPrimaryKey',
    updateParentIdByPrimaryKey:'/record-b/blog/updateParentIdByPrimaryKey',
    selectHtmlById:'/record-b/blog/selectHtmlById',
    upload:'/record-b/blog/upload',
    login:'/record-b/user/login',
    getallWebTag:'/record-b/WebTag/getall',
    insertWebTag:'/record-b/WebTag/insert',
    webTag:{
        update:'/record-b/WebTag/updateByPrimaryKey',
        deleteByPrimaryKey:'/record-b/WebTag/deleteByPrimaryKey',
    },
    crash:{
        getCrashList:'/record-b/crash/getCrashList',
        deleteByPrimaryKey:'/record-b/crash/deleteByPrimaryKey',
    },
    picture:{
        getAllRecordsDescLimit:'/record/record/getAllRecordsDescLimit',
    },
    blog:{
        selectBlogSunburst:'/record-b/blog/selectBlogSunburst',
    },

}

export default api
