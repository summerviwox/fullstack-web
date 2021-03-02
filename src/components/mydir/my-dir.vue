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
        <img @click="switchMenu(booleanDir)"  class="switch" :src="require('../../assets/dir.png')"/>
        <nodesearch @onEnterSearch="onEnterSearchMT"  ref="nodesearch" ></nodesearch>
      </div>
    </div>
    <my-markdown :my-markdown-data="selectedNode" ref="markdown" class="markdown"></my-markdown>
    <nodetree ref="nodetree" v-show="nodetreeVisible"  class="notetree"></nodetree>
  </div>
</template>

<script>
import nodeutil from "@/components/node/nodeutil";
import api from "@/api/api";

import Nodetree from "@/components/notetree/nodetree";
import Nodesearch from "@/components/nodesearch/nodesearch";
import newnodesUtil from "@/components/newnodes/newnodesUtil";
import util from "@/util/util";
import Mysearchnodes from "@/components/mysearchnodes/mysearchnodes";
import DirNodes from "@/components/newnodes/dir-nodes";
import MyMarkdown from "@/components/markdown/my-markdown";

export default {
  name: "myDir",
  components: {MyMarkdown, DirNodes, Mysearchnodes, Nodesearch, Nodetree},
  data:function (){
    return{
      styleDir:100,
      styleSearch:99,
      booleanDir:true,
      nodetreeVisible:false,
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
      dirOrSearch:true,
    }
  },
  methods:{
    callBackMT(data,method){
      //console.log(data,method)
      switch (method){
        case "selectedNodeMT":
          this.getMarkDownMT(data)
          break
        case "onContextClickMT":
          console.log(data)
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
          }
          break
        case "gotoMT":
          this.switchMenu(false)
          // console.log(this.$refs.mynewnodes,data.event.clientY)
          // this.$refs.mynewnodes.$el.scrollTo(0,data.event.clientY)
          console.log(111,data.data)
          this.selectedNode = data.data
          this.$refs.mynewnodes.scrollToCurrentNodeMT(data.data)
          break
      }
    },
    getMarkDownMT(item){
      if(item.id.toString().startsWith("new")){
        //this.$refs.markdown.marktext = item.markdown
        return
      }
      api.postApi(api.selectMarkdownById,false,{id:item.id},res=>{
        // nodeutil.copyDataFromNodeToNode(res.data,this.selectedNode)
        item.markdown = res.data.markdown
        this.selectedNode = item
      })
    },
    onEnterSearchMT(text){
      api.postApi(api.search,true,{
        markdown:text
      },res=>{
        let result = []
        res.data.forEach((v,i)=>{
          newnodesUtil.findSearchNodeInNodes({nodes:this.dirNodesDataFromServer},v,result)
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
    api.getApi(api.blog.selectTreeNode,true,{},res=>{
      this.dirNodesDataFromServer = res.data
    })
  }
}
</script>

<style scoped lang="less">
@import "my-dir";
</style>
