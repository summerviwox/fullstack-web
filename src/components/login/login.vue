<template>
    <div class="login-root">
        <div class="login-input-content">
            <el-image :src="head" class="login-head"/>
            <el-input v-model="loginInput.name" placeholder="请输入内容" class="login-input-name"></el-input>
            <el-input v-model="loginInput.pwd" placeholder="请输入内容" class="login-input-pwd" show-password></el-input>
            <el-button type="primary" class="login-login" @click="login">登录</el-button>
        </div>
<!--      <div class="myhero">-->
<!--        <mythree1 :option="{width:400,height:400}"></mythree1>-->
<!--      </div>-->
    </div>
</template>

<script>
import userde from "./userde";
    import api from "../../api/api";
import util from "../../util/util";
import Mythree from "../mythree/mythree";
import md5 from "md5";

    export default {
        name: "login",
      // components: {Mythree},
      data(){
            return{
                head:"https://www.summerviwox.com/blog/13.png",
                loginInput:{
                    name:"summer",
                    pwd:"123456"
                }
            }
       },
        methods:{
            login(){
              let o = {name:this.loginInput.name,pwd:md5(this.loginInput.pwd),time:new Date().getTime()}
              api.postApi(api.login,true,o,res=>{
                if(util.isNotEmpty(res.data)){
                  localStorage.setItem('loginres',JSON.stringify(res.data) )
                  localStorage.setItem("userid",res.data.id)
                  localStorage.setItem("token",res.data.token)
                  this.$router.push({path:'/all'})
                }else{
                  this.$message.error("登录失败")
                }
              },error=>{
                console.error(error)
                this.$message.error("登录失败")
              })
            }
        },
        mounted(){
          if(userde.isLogined()){
            this.$route.meta.keepAlive = false
            this.$router.push({path:'/all',query:''})
          }
        }
    }
</script>

<style scoped lang="less">
@import "login.less";
</style>
