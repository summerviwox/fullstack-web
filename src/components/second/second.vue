<template>
  <div class="hroot root">
    <div class="menu vroot">
      <searchnodes v-show="currentMenuIndex==1" class="dir myscroller"></searchnodes>
      <nodes v-show="currentMenuIndex==0" ref="nodes" class="dir myscroller" @currentNode="currentNode"></nodes>
      <nodesearch @switchMenu="switchMenu"></nodesearch>
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
export default {
  name: "second",
  components: {Searchnodes, Markdown, Nodes,nodesearch},
  data:function (){
    return{
      currentMenuIndex:0
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
    switchMenu(index){
      this.currentMenuIndex = index
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "second.less";
</style>