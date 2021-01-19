<template>
<div class="vroot root">
  <div class="urlsblock">
    <div class="urls" v-for="(item,index) in urls" :key="index" @click="goTo(item)">
      <el-image :title="item.title" fit="contain" class="img" :src="item.url+'/favicon.ico'"></el-image>
    </div>
  </div>

</div>
</template>

<script>
import Markdown from "../markdown/markdown";
import api from "../../api/api";
import bus from "../../util/bus";
export default {
name: "home",
  data:function () {
    return{
      urls:[
        // {
        //   url:'https://www.baidu.com',
        //   img:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
        //   title:'',
        // }
      ]
    }
  },
  methods:{
    goTo(item){
      window.open(item.url,"_blank")
    },
    dataApi(){
      api.getApi(api.getallWebTag,{},res=>{
          this.urls = res
      },error=>{

      })
    },
  },
  mounted() {
  bus.$on("refreshweblist",this.dataApi)
    this.dataApi()
    // for(let i=0;i<30;i++){
    //   this.urls.push( {
    //     url:'https://www.baidu.com/',
    //     img:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    //   })
    // }
  },
}
</script>

<style scoped lang="less">
@import "home";
</style>