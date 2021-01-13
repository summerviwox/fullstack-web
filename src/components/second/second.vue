<template>
  <div class="hroot root">
    <div class="menu vroot">
      <div class="dirs">
        <dirs @currentNodeInfo="currentNodeInfo"  v-show="currentMenuIndex==0" ref="dir" class="dir"></dirs>
        <searchnodes @currentNodeInfo="currentNodeInfo"  v-show="currentMenuIndex==1" ref="search" class="dir"></searchnodes>
        <lastnodes @currentNodeInfo="currentNodeInfo" v-show="currentMenuIndex==2" ref="last" class="dir"></lastnodes>
      </div>
      <nodesearch ref="nodesearch" @onEnterSearch="onEnterSearch" @switchMenu="switchMenu"></nodesearch>
    </div>
    <markdown ref="markdown" class="view"></markdown>
  </div>
</template>

<script>
import Nodes from "../nodes/nodes";
import Markdown from "../markdown/markdown";
import bus from "../../util/bus";
import nodesearch from "../nodesearch/nodesearch";
import Searchnodes from "../searchnodes/searchnodes";
import api from "../../api/api";
import Lastnodes from "../lastnodes/lastnodes";
import Dirs from "../dirs/dirs";
import nodeutil from "../node/nodeutil";
export default {
  name: "second",
  // eslint-disable-next-line vue/no-unused-components
  components: {Dirs, Lastnodes, Searchnodes, Markdown, Nodes,nodesearch},
  data:function (){
    return{
      currentMenuIndex:0,
      searchNodes:[],
      currentNode:{}
    }
  },
  methods:{
    currentNodeInfo(node,type){
      this.autoSave(node)
      this.$refs.markdown.marktext = node.markdown
      bus.$emit('currentNodeInfo',node)
      if(type==="dir"||type==="search"){
        this.$refs.last.pushList(node)
      }
      this.currentNode = node


    },
    autoSave(node){
      if(this.currentNode.id){//准备加载新的node&&将要加载的node将会覆盖原来的node
        //上一次加载的node编辑过
        if(this.currentNode.markdown !== this.$refs.markdown.marktext){
          this.$message.warning("编辑区域已更改 将自动保存新的变化")

          this.currentNode.markdown = this.$refs.markdown.marktext
          this.currentNode.html = this.$refs.markdown.htmltext
          this.currentNode.title = nodeutil.getFirstLineStr(this.$refs.markdown.marktext)
          let data = this.currentNode
          api.postApi(api.updateByPrimaryKey,{
            id:data.id,
            parentid:data.parentid,
            markdown:data.markdown,
            html:data.html,
            title:data.title,
            ctime:new Date().getTime(),
            utime:new Date().getTime(),
            type:0
          },res=> {
            this.keepNodeSame(data)
            this.$message.success(data.title + ":更新成功")

          },error=>{

          })
        }else{
         // this.$message.warning("编辑区域没有更改变化")
        }
      }
    },
    keepNodeSame(node){
      console.log(this.$refs.dir.$refs.nodes.nodes,this.$refs.search.$refs.nodes.nodes,this.$refs.last.$refs.nodes.nodes)
      let list = this.$refs.dir.$refs.nodes.nodes.concat(this.$refs.search.$refs.nodes.nodes,this.$refs.last.$refs.nodes.nodes)
      console.log(list)
      this.findNodes(list,node,res=>{
        console.log(444,node,res)
        this.$set(res,'title',node.title)
        this.$set(res,'markdown',node.markdown)
      })
    },
    findNodes(nodes,node,go){
      let myid = node.id
      for(let i=0;i<nodes.length;i++){
        if(myid == nodes[i].id){
          console.log(111,nodes[i].id)
          go(nodes[i])
          continue
        }else{
          if(nodes[i].node&&nodes[i].node.length!=0){
            this.findNodes(nodes[i].node,node,go)
          }else{
            continue
          }
        }
      }
    },
    switchMenu(index){
      this.currentMenuIndex = index
    },
    onEnterSearch(text){
      this.$refs.search.search(text)
    },
    onkeyEvent(e){
      this.$refs.nodesearch.switchMenu()
    }
  },
  mounted() {
    document.onkeydown = e=> {
      let key = window.event.keyCode;
      if (key== 18) {
        window.event.preventDefault() //关闭浏览器快捷键
        this.onkeyEvent()
      }
    };
  }
}
</script>

<style scoped lang="less">
@import "second.less";
</style>
