<template>
  <div class="hroot mymarkdownroot" >
    <div class="markdownroot">
      <textarea @contextmenu.prevent="onRightClick" ref="markdown" class="markdown myscroller mymaintheme" @scroll="scroll()" v-model="marktext" v-bind:oninput="input()" type="textarea"></textarea>
    </div>
    <div ref="htmlroot" class="htmlroot myscroller">
      <div  class="html" v-html="htmltext"></div>
    </div>
    <div v-if="contextshow" :style="{'top':contextStyle.top,'left':contextStyle.left,'bottom':contextStyle.bottom}" class="comtextdialog mymaintheme" ref="comtextdialog">
      <span class="item" @click.stop="onContextClick($event,item)" v-for="(item,index) in contextList" :key="index">{{item.label}}</span>
    </div>

    <div @click.stop="insertDialogClick" v-if="insertLinkDialogShow" :style="{'top':insertLinkDialogStyle.top,'left':insertLinkDialogStyle.left,'bottom':insertLinkDialogStyle.bottom}" class="insertlinkdialog mymaintheme" ref="insertlinkdialog">
     <div class="form">
       <span class="label">描述</span>
       <el-input class="input"  v-model="insertValue.firstValue" type="text"/>
     </div>
      <div class="form">
        <span class="label">链接</span>
        <el-input class="input"  v-model="insertValue.secondValue" type="text"/>
        <el-button class="button" type="text" @click="insertGo">确认</el-button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import md from './mymarkdown'
import bus from "../../util/bus";
export default {
  name: "markdown",
  props:{
    outmarkdown:String
  },
  data:function (){
    return{
      marktext:'',
      htmltext:'',
      contextshow:false,
      insertLinkDialogShow:false,
      contextStyle:{
        top:0,
        left:0,
        bottom:0
      },
      insertLinkDialogStyle:{
        top:0,
        left:0,
        bottom:'',
      },
      insertValue:{
        firstValue:'',
        secondValue:'',
      },

      contextList:[
        {
          label:'插入链接',
          value:1,
        },
        {
          label:'插入图片链接',
          value:0,
        },
        {
          label:'上传图片',
          value:1,
        },
        {
          label:'截图',
          value:2,
        },
        {
          label:'插入表格',
          value:1,
        },
      ],
    }
  },
  methods:{
    input(){
      this.htmltext = md.render(this.marktext)
    },
    scroll(){
      let markdown =  this.$refs.markdown;
      let htmlroot = this.$refs.htmlroot
      let percent = markdown.scrollTop/(markdown.scrollHeight-markdown.clientHeight)
      htmlroot.scrollTo(0,percent*(htmlroot.scrollHeight-htmlroot.clientHeight))
    },
    onRightClick(e){
      this.toLocalPostion(e,this.contextStyle)
      this.contextshow = true
    },
    onContextClick(e,item){
      console.log(item.label)
      switch (item.label){
        case "插入链接":
          this.toLocalPostion(e,this.insertLinkDialogStyle)
          this.insertLinkDialogShow = true
          break
      }
      this.contextshow = false
    },
    toLocalPostion(e,style){
      let markdownrect = this.$refs.markdown.getBoundingClientRect();
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
    insertDialogClick(e){

    },
    insertGo(){

      console.log(this.$refs.markdown.selectionStart,this.$refs.markdown)

      // this.marktext = this.marktext  + this.marktext.slice(-1,'['+this.insertValue.firstValue+']('+this.insertValue.secondValue+')')
      // this.marktext =
      this.insertLinkDialogShow = false
    },
    rootclick(){
      console.log(123)
      this.contextshow = false
      this.insertLinkDialogShow = false
    },
  },
  mounted() {
    bus.$on("onAllClickEvent",this.rootclick)
  }
}
</script>

<style scoped lang="less">
@import "markdown";
</style>
<style lang="less">
@import "markdown-style.less";
</style>
