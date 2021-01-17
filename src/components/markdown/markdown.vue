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
        <el-button class="button" type="text" @click="insertDialogGo">确认</el-button>
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
    outmarkdown:String,
  },
  data:function (){
    return{
      marktext:'',
      nodeId:'',
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
        type:'',
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
          value:2,
        },
        {
          label:'上传图片',
          value:3,
        },
        {
          label:'截图',
          value:4,
        },
        {
          label:'插入表格',
          value:5,
        },
        {
          label:'插入代码块',
          value:6,
        },
        {
          label:'分享',
          value:7,
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
      this.insertLinkDialogShow = false
      this.toLocalPostion(e,this.contextStyle)
      this.contextshow = true
    },
    onContextClick(e,item){
      console.log(item.label)
      this.insertValue.type = item.label
      this.contextshow = false
      switch (this.insertValue.type){
        case "插入链接":
         this.showInsertDialog(e)
          break
        case "插入图片链接":
          this.showInsertDialog(e)
          break
        case "插入表格":
           this.insertAction()
          break
        case "插入代码块":
          this.insertAction()
          break
        case "分享":
          // this.$router.push({path:'/html',query:{id:268
          //   }})
          var path = this.$router.resolve({
            path:'/html',
            query:{
              id:this.nodeId
            }
          })
            window.open(path.href,'_blank')
          break
      }
    },
    showInsertDialog(e){
      this.toLocalPostion(e,this.insertLinkDialogStyle)
      this.insertLinkDialogShow = true
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
    insertDialogGo(){
      console.log(this.$refs.markdown)
      this.insertAction()
      this.insertLinkDialogShow = false
      this.insertValue.firstValue = ''
      this.insertValue.secondValue = ''
    },
    insertAction(){
      let start = this.$refs.markdown.selectionStart
      let value = ''
      switch (this.insertValue.type){
        case "插入链接":
          value = '['+this.insertValue.firstValue+']('+this.insertValue.secondValue+')'
          break
        case "插入图片链接":
          value = '!['+this.insertValue.firstValue+']('+this.insertValue.secondValue+')'
          break
        case "插入表格":
          value = '|A|B|C|\n|-|-|-|\n|*|*|*|'
          break
        case "插入代码块":
          value = '```java\n\n```'
          break
      }
      this.marktext = this.marktext.slice(0,start) + value + this.marktext.slice(start, this.marktext.length)
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
