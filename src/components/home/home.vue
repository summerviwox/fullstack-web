<template>
  <div class="vroot root" ref="root">
    <div class="urlsblock">
      <div class="urls" v-for="(item,index) in urls" :key="index" @click="goTo(item)">
        <div @contextmenu.prevent="rightClick($event,item)">
          <el-image :title="item.title" fit="contain" class="img" :src="item.img" ></el-image>
        </div>
      </div>
    </div>
    <div v-if="contextshow" :style="{'top':contextStyle.top,'left':contextStyle.left,'bottom':contextStyle.bottom}" class="comtextdialog mymaintheme" ref="comtextdialog">
      <div  class="itemcontent"  @click.stop="onContextClick($event,item)" v-for="(item,index) in contextList" :key="index">
        <div class="item"  v-if="item.enable"> {{item.label}}</div>
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
      contextshow:false,
      dialogVisible:false,
      urls:[
        // {
        //   url:'https://www.baidu.com',
        //   img:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
        //   title:'',
        // }
      ],
      contextStyle:{
        top:0,
        left:0,
        bottom:''
      },
      currentURl:{
        url:'',
        img:'',
        title:'',
      },
      contextList:[
        {
          label:"修改",
          value:0,
          enable:true,
        },
        {
          label:"删除",
          value:1,
          enable:true,
        },
      ],
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
    deleteApi(){
      api.postApi(api.webTag.deleteByPrimaryKey,{
        id:this.currentURl.id,
          },res=>{
                this.dataApi()
          },
          error=>{

          })
    },
    rightClick(e,item){
      // this.dialogVisible = true
      this.currentURl = item
      this.toLocalPostion(e,this.contextStyle)
      this.contextshow = true
    },
    makeSure(){
      this.dialogVisible = false
      this.updateApi()
    },
    onContextClick(e,item){
      console.log(e)
      this.contextshow = false
      switch (item.label){
        case "修改":
          this.dialogVisible = true
          break
        case "删除":
          this.deleteApi()
          break
      }

    },
    toLocalPostion(e,style){
      let markdownrect = this.$refs.root.getBoundingClientRect();
      console.log(markdownrect,e)
      style.left = (e.clientX - markdownrect.left) + 'px'
      if(e.clientY>markdownrect.height/2){
        style.top = ''
        style.bottom = (markdownrect.height - e.clientY + markdownrect.y) + 'px'
      }else{
        style.bottom = ''
        style.top = (e.clientY - markdownrect.y) + 'px'
      }
    },
    rootClick(){
      this.contextshow = false
    },

  },
  mounted() {
    bus.$on("refreshweblist",this.dataApi)
    bus.$on("onAllClickEvent",this.rootClick)
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