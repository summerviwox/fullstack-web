<template>
  <div class="hroot root">
    <nodes ref="nodes" class="menu myscroller" @currentNode="currentNode"></nodes>
    <markdown ref="markdown" class="view"></markdown>
  </div>
</template>

<script>
import Nodes from "../nodes/nodes";
import Markdown from "../markdown/markdown";
import bus from "../../util/bus";
export default {
  name: "second",
  components: {Markdown, Nodes},
  data:function (){
    return{

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
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "second.less";
</style>