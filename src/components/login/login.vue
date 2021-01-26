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
import Mythree1 from "../mythree/mythree1";

    export default {
        name: "login",
      // components: {Mythree1},
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
              let o = {name:this.loginInput.name,pwd:this.loginInput.pwd,time:new Date().getTime()}
              api.postApi(api.login,o,res=>{
                console.log(1,res,util.isNotEmpty(res))
                if(util.isNotEmpty(res)){
                  localStorage.setItem('loginres',JSON.stringify(o) )
                  localStorage.setItem("token",res)
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
