<template>
  <div class="hroot root">
    <div class="menu vroot">
      <div class="dirs">
        <searchnodes @getNodeData="getNodeData" ref="searchnodes"   v-show="currentMenuIndex==1" class="dir myscroller"></searchnodes>
        <nodes v-show="currentMenuIndex==0" ref="nodes" class="dir myscroller" @currentNode="currentNode"></nodes>
      </div>
      <nodesearch @onEnterSearch="onEnterSearch" @switchMenu="switchMenu"></nodesearch>
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
export default {
  name: "second",
  components: {Searchnodes, Markdown, Nodes,nodesearch},
  data:function (){
    return{
      currentMenuIndex:0,
      searchNodes:[]
    }
  },
  methods:{
    //当前选中节点回调
    currentNode(node,nodelist){
      let nodeview = this.$refs.nodes;
      let dirs =nodeview.getMidNode(nodeview.nodes,nodelist,"")
      this.$refs.markdown.marktext = node.markdown
      bus.$emit("currentInfo",dirs)
    },
    getNodeData(node){
      this.$refs.markdown.marktext = node.markdown
    },
    switchMenu(index){
      this.currentMenuIndex = index
    },
    onEnterSearch(text){
      api.postApi(api.search,{
        markdown:text
      },res=> {
          this.searchNodes = res.data
          this.$refs.searchnodes.list = this.searchNodes
      },error=>{

      })
    },
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "second.less";
</style>
