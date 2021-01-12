<template>
  <div class="hroot root">
    <div class="menu vroot">
      <div class="dirs">
        <nodes v-show="currentMenuIndex==0" ref="nodes" class="dir myscroller" @currentNode="currentNode"></nodes>
        <nodes :type="'style'" v-show="currentMenuIndex==1" ref="nodes" class="dir myscroller" @currentNode="currentNode"></nodes>
<!--        <searchnodes v-show="currentMenuIndex==1" @getNodeData="getNodeData" ref="searchnodes"  class="dir myscroller"></searchnodes>-->
        <lastnodes v-show="currentMenuIndex==2" ref="lastnodes" class="dir myscroller"></lastnodes>
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
import Lastnodes from "../lastnodes/lastnodes";
export default {
  name: "second",
  // eslint-disable-next-line vue/no-unused-components
  components: {Lastnodes, Searchnodes, Markdown, Nodes,nodesearch},
  data:function (){
    return{
      currentMenuIndex:0,
      searchNodes:[]
    }
  },
  methods:{
    //目录列表 当前选中节点回调
    currentNode(node,nodelist){
      let nodeview = this.$refs.nodes;
      let dirs =nodeview.getMidNode(nodeview.nodes,nodelist,"")
      this.$refs.markdown.marktext = node.markdown
      bus.$emit("currentInfo",dirs)
      this.$refs.lastnodes.pushList(node)
    },
    //搜索列表
    getNodeData(node){
      this.$refs.markdown.marktext = node.markdown
      this.$refs.lastnodes.pushList(node)
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
