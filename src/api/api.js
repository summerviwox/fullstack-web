import axios from "axios";
import router from "../router/router";
import util from "@/util/util";
import bus from "@/util/bus";
import md5 from "md5"
let url = 'https://'+process.env.VUE_APP_DOMAIN
let testUrl = 'https://'+process.env.VUE_APP_DOMAIN+":444"

let instance = axios.create({})
instance.interceptors.request.use(
    config=>{
        const token = localStorage.getItem("token")
        switch (config.method.trim()){
            case "get":
                config.params.token =token
                config.params.userid = localStorage.getItem("userid")
                break
            case "post":
                config.headers["token"] =token
                config.data.userid = localStorage.getItem("userid")
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
    log(moudle,success,res){
        console.log(moudle,success,res)
        if(success){
            if(util.isNotEmpty(res.data)&&util.isNotEmpty(res.data.errorMessage)){
                bus.$message({
                    type:'error',
                    message:res.data.errorMessage,
                    offset:100,
                    duration:2000,
                })
            }else{
                bus.$message({
                    type:'success',
                    message:"成功",
                    offset:100,
                    duration:2000,
                })
            }
        }else{
            bus.$message({
                type:'error',
                message:res,
            })
        }
    },
    getApi(moudle,show,params,go,down){
        instance.request({
            url:url+moudle,
            method:"get",
            params:params,
        }).then(res=>{
            show&&this.log(moudle,true,res)
            typeof go ==="function"&&go(res.data)
        }).catch(error=>{
            this.log(moudle,false,error)
            typeof down ==="function"&&down(error)
        })
    },
    postApi(moudle,show,data,go,down){
        instance.request({
            url:url+moudle,
            method:"post",
            data:data,
        }).then(res=>{
            show&&this.log(moudle,true,res)
            typeof go ==="function"&&go(res.data)
        }).catch(error=>{
            this.log(moudle,false,error)
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
            this.log(moudle,true,res)
            typeof go ==="function"&&go(res.data)
        }).catch(error=>{
            this.log(moudle,false,error)
            typeof down ==="function"&&down(error)
        })
    },
    getTestApi(moudle,params,go,down){
        instance.request({
            url:testUrl+moudle,
            method:"get",
            params:params,
        }).then(res=>{
            this.log(moudle,true,res)
            typeof go ==="function"&&go(res.data)
        }).catch(error=>{
            this.log(moudle,false,error)
            typeof down ==="function"&&down(error)
        })
    },
    postTestApi(moudle,data,go,down){
        instance.request({
            url:testUrl+moudle,
            method:"post",
            data:data,
        }).then(res=>{
            this.log(moudle,true,res)
            typeof go ==="function"&&go(res.data)
        }).catch(error=>{
            this.log(moudle,false,error)
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
        getAllRecordsDescLimit:'/record-b/record/getAllRecordsDescLimitInNew',
    },
    blog:{
        selectBlogSunburst:'/record-b/blog/selectBlogSunburst',
        selectTreeNode:'/record-b/blog/selectTreeNode',
    },

}

export default api
