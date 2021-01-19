<template>
<div class="vroot root">
  <div class="urlsblock">
    <div class="urls" v-for="(item,index) in urls" :key="index" @click="goTo(item)">
      <div @contextmenu.prevent="rightClick($event,item)">
      <el-image :title="item.title" fit="contain" class="img" :src="item.img" ></el-image>
      </div>
    </div>
  </div>

  <el-dialog width="30%" :visible.sync="dialogVisible">
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="currentURl.title" type="text"></el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="currentURl.url" type="text"></el-input>
      </el-form-item>
      <el-form-item label="图片链接">
        <el-input v-model="currentURl.img" type="text"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="makeSure()">确 定</el-button>
  </span>
  </el-dialog>

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
      dialogVisible:false,
      urls:[
        // {
        //   url:'https://www.baidu.com',
        //   img:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
        //   title:'',
        // }
      ]
      ,
      currentURl:{
        url:'',
        img:'',
        title:'',
      }
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
    updateApi(){
      api.postApi(api.webTag.update,{
        id:this.currentURl.id,
        url:this.currentURl.url,
        img:this.currentURl.img,
        title:this.currentURl.title,
      },res=>{
        this.dataApi()
      },error=>{

      })
    },
    rightClick(e,item){
      this.dialogVisible = true
      this.currentURl = item
    },
    makeSure(){
      this.dialogVisible = false
      this.updateApi()
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