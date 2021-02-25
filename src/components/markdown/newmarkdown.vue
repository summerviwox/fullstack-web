<template>
  <div class="hroot mymarkdownroot"  @contextmenu.prevent="onRightClick">
    <div class="markdownroot" v-if="currentStatus!=2">
      <textarea
          @keydown="keyWatch"
          ref="markdown"
          class="markdown myscroller mymaintheme"
          @scroll="scroll()"
          v-model="node.markdown"
          v-bind:oninput="input()"
          type="textarea"></textarea>
    </div>
    <div ref="htmlroot" class="htmlroot myscroller" v-if="currentStatus!=1">
      <div  class="html" v-html="htmltext"></div>
    </div>
    <context-menu   @onContextClick="onContextClick"  ref="comtextdialog"  :contextList="contextList">
         <span class="itemcontent" slot="content">
          <input type="file"   @change="handleFileChange" ref="inputer" style="display: none">
      <span class="item" @click.stop="openFile()">上传文件</span>
      </span>
    </context-menu>

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
import api from "../../api/api";
import util from "../../util/util";
import ContextMenu from "../contextmenu/contextMenu";
import nodeutil from "@/components/node/nodeutil";
export default {
  name: "newmarkdown",
  components: {ContextMenu},
  props:{
    node:Object,
  },
  data:function (){
    return{
      marktext:"",
      currentStatus:0,//0左右都显示 1只显示左边  2只显示右边
      historymaxlength:20,
      history:[],
      currentHistoryIndex:-1,
      nodeId:'',
      htmltext:'',
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
          enable:true,
        },
        {
          label:'插入图片链接',
          value:2,
          enable:true,
        },
        // {
        //   label:'截图',
        //   value:4,
        // },
        {
          label:'插入表格',
          value:5,
          enable:true,
        },
        {
          label:'插入代码块',
          value:6,
          enable:true,
        },
        {
          label:'分享',
          value:7,
          enable:true,
        },
        {
          label:'加入常用网站',
          value:8,
          enable:true,
        },
        {
          label:'只显示左边',
          value:7,
          enable:true,
        },
        {
          label:'只显示右边',
          value:7,
          enable:true,
        },
        {
          label:'都显示',
          value:7,
          enable:true,
        },
      ],
    }
  },
  watch:{
    node:function (n,o) {
      if(util.isEmpty(n.markdown)){
        n.markdown = ""
      }
      //console.log("current",this.history,this.currentHistoryIndex)
      // console.log(o,n)
      // eslint-disable-next-line no-empty
      if(this.history.length!=0&&n.markdown===this.history[this.currentHistoryIndex]){

      }else{
        this.history.push(n.markdown)
        if(this.history.length>this.historymaxlength){
          this.history.shift()
        }
        this.currentHistoryIndex = this.history.length-1
      }
      // console.log("marktext",this.history,this.currentHistoryIndex)
    },
  },
  methods:{
    keyWatch(e){
      if(e.ctrlKey){
         switch (e.key){
           case "s":
             e.preventDefault()
             api.postApi(api.updateByPrimaryKey,true,{
               id:this.node.id,
               parentid:util.isEmpty(this.node.parentId)?this.node.parentid:this.node.parentId,
               markdown:this.node.markdown,
               html:this.htmltext,
               title:nodeutil.getFirstLineStr(this.node.markdown),
               ctime:new Date().getTime(),
               utime:new Date().getTime(),
               type:0
             },res=>{
                if(res==1){
                  this.node.title = nodeutil.getFirstLineStr(this.node.markdown),
                  this.$message.success("成功")
                }

             })
             break
         }
      }
      console.log(e)
    },
    //control + z
    rollback(){
      //console.log("rollback",this.history,this.currentHistoryIndex)
      if(this.currentHistoryIndex>0){
        this.currentHistoryIndex =  this.currentHistoryIndex - 1
        this.node.markdown = this.history[this.currentHistoryIndex]
      }
    },
    rollPush(){
      //console.log("rollPush",this.history,this.currentHistoryIndex)
      if(this.currentHistoryIndex<this.history.length-1){
        this.currentHistoryIndex =  this.currentHistoryIndex + 1
        this.node.markdown = this.history[this.currentHistoryIndex]
      }
    },
    handleFileChange (e) {
      let file = e.target.files[0]
      let size = Math.floor(file.size / 1024);//
      this.formData=new FormData();//new一个formData事件
      this.formData.append("file",file); //将file属性添加到formData里
      //此时formData就是我们要向后台传的参数了
      api.fileApi(api.upload,this.formData,res=>{
            this.insertAction("https://"+process.env.VUE_APP_DOMAIN+res.data)
          },
          error=>{

          })
    },
    openFile(){
      console.log(11,process.env)
      this.insertValue.type = "上传文件"
      this.$refs.inputer.click()
    },
    input(){
      this.htmltext = md.render(util.isEmpty(this.node.markdown)?"":this.node.markdown)
    },
    scroll(){
      let markdown =  this.$refs.markdown;
      let htmlroot = this.$refs.htmlroot
      let percent = markdown.scrollTop/(markdown.scrollHeight-markdown.clientHeight)
      htmlroot.scrollTo(0,percent*(htmlroot.scrollHeight-htmlroot.clientHeight))
    },
    onRightClick(e){
      this.insertLinkDialogShow = false
      this.$refs.comtextdialog.open(e)
      this.contextList.forEach((value,index)=>{
        if(value.label==='加入常用网站'){
          value.enable = this.isWebLink()
        }
      })
    },
    //获取选中的markdown
    getMarkTextSelection(){
      let textarea = this.$refs.markdown
      let start = textarea.selectionStart
      let end =textarea.selectionEnd
      if(end!=start){
        let text = this.node.markdown.slice(start,end)
        return text
      }
      return ''
    },
    //是否是网站
    isWebLink(){
      let text = this.getMarkTextSelection()
      if(text.startsWith('http:')
          ||text.startsWith('https:')){
        return true
      }
      return false
    },
    onContextClick(e,item){
      console.log(item.label)
      this.insertValue.type = item.label
      this.$refs.comtextdialog.close()
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
              id:this.node.id
            }
          })
          window.open(path.href,'_blank')
          break
        case "加入常用网站":
          var text = this.getMarkTextSelection()
          var str = text.split("/")
          var a = str[0]+'//'+str[2]
            if(text.lastIndexOf("/")==text.length){
              text = text.split(0,text.length-1)
            }
          api.postApi(api.insertWebTag,true,{
            url:text,
            img:a + "/favicon.ico",
            title:str[2],
          },res=>{
            bus.$emit("refreshweblist",{})
          },error=>{

          })
          break
        case "只显示左边":
          this.currentStatus = 1
          break
        case "只显示右边":
          this.currentStatus = 2
          break
        case "都显示":
          this.currentStatus = 0
          break
      }
    },
    showInsertDialog(e){

      this.insertLinkDialogShow = true
    },
    toLocalPostion(e,style){
      let clientHeight =document.body.clientHeight
      style.left = e.clientX + 'px'
      if(e.clientY>clientHeight/2){
        style.top = ''
        style.bottom = (clientHeight - e.clientY) + 'px'
      }else{
        style.bottom = ''
        style.top =e.clientY + 'px'
      }
    },
    insertDialogClick(e){

    },
    insertDialogGo(){
      console.log(this.$refs.markdown)
      this.insertAction()
      this.insertLinkDialogShow = false
    },
    insertAction(url){
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
        case "上传文件":
          var end = url.slice(url.lastIndexOf('.')+1,url.length).trim().toLowerCase()
          console.log(end)
          if(end ==='bmp'
              ||end ==='jpg'
              ||end ==='jpeg'
              ||end ==='png'
              ||end ==='gif'
              ||end ==='tif'){
            value = '![img]('+url+')'
          }else{
            value = '[file]('+url+')'
          }
          break
      }
      this.node.markdown = this.node.markdown.slice(0,start) + value + this.node.markdown.slice(start, this.marktext.length)
      this.insertValue.firstValue = ''
      this.insertValue.secondValue = ''
    },
    rootclick(){
      if( this.$refs.comtextdialog){
        this.$refs.comtextdialog.close()
      }
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
