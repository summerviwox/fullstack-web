<template>
  <div class="hroot root">
    <nodes ref="nodes" class="menu myscroller" @currentNode="currentNode"></nodes>
    <markdown ref="markdown" class="view"></markdown>
  </div>
</template>

<script>
import Nodes from "../nodes/nodes";
import Markdown from "../markdown/markdown";
export default {
  name: "second",
  components: {Markdown, Nodes},
  data:function (){
    return{

    }
  },
  methods:{
    //当前选中节点回调
    currentNode(node){
      this.$refs.markdown.marktext = node.markdown
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "second.less";
</style>