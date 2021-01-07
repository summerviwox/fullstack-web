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
    currentNode(data){
      console.log(data)
      let dirs = this.getMidNode(this.$refs.nodes.nodes,data.nodelist,"");
      console.log(dirs)
      this.$refs.markdown.marktext = data.node.markdown
    },
    getMidNode(nodes,list,str){
      if(list.length==0){
        return str
      }
      str = str +nodes[list.shift()].title+'-'
      console.log(str)
      return this.getMidNode(nodes,list,str)
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "second.less";
</style>