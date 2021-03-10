<template>
  <div class="mydir">
    <div class="menu">
      <div class="top">
        <dir-nodes
            :style="{'z-index':styleDir}"
            ref="mynewnodes"
            class="mynewnodes mymaintheme"
            :dir-nodes-data="dirNodesDataFromServer"
            @callBackMT="callBackMT"></dir-nodes>
        <mysearchnodes
            :style="{'z-index':styleSearch}"
            class="mysearchnodes mymaintheme"
            @callBackMT="callBackMT"
            :nodes="searchedNode"></mysearchnodes>
      </div>
      <div class="bottom">
        <img @click="switchMenu(booleanDir)"  class="switch" :src="require('../../assets/dir.svg')"/>
        <nodesearch @onEnterSearch="onEnterSearchMT"  ref="nodesearch" ></nodesearch>
      </div>
    </div>
    <my-markdown :my-markdown-data="selectedNode" ref="markdown" class="markdown"></my-markdown>
    <nodetree @callBackMT="callBackMT" ref="nodetree"  class="notetree"></nodetree>
  </div>
</template>

<script>
import api from "@/api/api";

import Nodetree from "@/components/notetree/nodetree";
import Nodesearch from "@/components/nodesearch/nodesearch";
import dirNodesUtil from "@/components/dirnodes/dir-nodes-util";
import util from "@/util/util";
import Mysearchnodes from "@/components/mysearchnodes/mysearchnodes";
import DirNodes from "@/components/dirnodes/dir-nodes";
import MyMarkdown from "@/components/markdown/my-markdown";
import bus from "@/util/bus";

export default {
  name: "myDir",
  components: {MyMarkdown, DirNodes, Mysearchnodes, Nodesearch, Nodetree},
  data:function (){
    return{
      styleDir:100,
      styleSearch:99,
      booleanDir:true,
      dirNodesDataFromServer:[

      ],
      selectedNode:{
        id:-1,
        parentid:0,
        title:"",
        html:"",
        type:0,
      },
      searchedNode:[],
      showLeftMenuType:0,
    }
  },
  watch:{
  },
  methods:{
    abc(){

    },
    callBackMT(data,method){
      switch (method){
        case "selectedNodeMT":
          this.getMarkDownMT(data)
          break
        case "onContextClickMT":
          this.selectedNode = data.data
          switch (data.item.label){
            case "新增根目录":
              //this.$refs.markdown.marktext = data.data.markdown
              break
            case "新建":
              // this.$refs.markdown.marktext = data.data.markdown
              break
            case "删除":
              //  this.$refs.markdown.marktext = ""
              break
            case "粘贴":
              //  this.$refs.markdown.marktext =data.data.markdown
              break
            case "树状图":
              this.$refs.nodetree.switchShowNoteTreeMT()
              break
          }
          break
        case "gotoMT":
          this.switchMenu(false)
          this.callBackMT(data.data,"selectedNodeMT")
          this.$refs.mynewnodes.scrollToCurrentNodeMT(data.data)
          break
        case "onSelectedNodeTreeNode":
          console.log(data,data.data)
            var node = {node:{}}
            dirNodesUtil.getNodeById(this.dirNodesDataFromServer,data.data.blog.id,node)
            console.log(node.node)
          this.callBackMT(node.node,"selectedNodeMT")
          this.$refs.mynewnodes.scrollToCurrentNodeMT(node.node)
          break
      }
      bus.$emit("callBackMT",data,method)
    },
    getMarkDownMT(item){
      if(item.id.toString().startsWith("new")){
        //this.$refs.markdown.marktext = item.markdown
        return
      }
      api.postApi(api.selectMarkdownById,false,{id:item.id},res=>{
        // nodeutil.copyDataFromNodeToNode(res.data,this.selectedNode)
        item.markdown = res.data.markdown
        dirNodesUtil.handleErrorMarkdownDomainMT(item)
        this.selectedNode = item
      })
    },
    onEnterSearchMT(text){
      api.postApi(api.search,true,{
        markdown:text
      },res=>{
        let result = []
        res.data.forEach((v,i)=>{
          dirNodesUtil.findSearchNodeInNodes({nodes:this.dirNodesDataFromServer},v,result)
        })
        this.searchedNode = result
        this.switchMenu(true)
      })
    },
    switchMenu(is){
      this.booleanDir = !is
      if(this.booleanDir){
        this.styleSearch ==99
        this.styleDir = 100
      }else{
        this.styleSearch ==100
        this.styleDir = 99
      }
    },

  },
  mounted() {
    //console.log(123)
    api.getApi(api.blog.selectTreeNode,true,{userid:0},res=>{
      res.data.forEach((v)=>{
        dirNodesUtil.handleInitServeNodesDataMT(v)
      })
      this.dirNodesDataFromServer = res.data
    })
  }
}
</script>

<style scoped lang="less">
@import "my-dir";
</style>
