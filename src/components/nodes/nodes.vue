<template>
  <div class="root">
    <node v-for="(item,index) in nodes" :key="index" :node="item" @changeNode="changeNode" @addNodes="addNodes" @currentNode="currentNode"></node>
  </div>
</template>

<script>
import Node from "../code/node";
import api from "../../api/api";
export default {
  name: "nodes",
  components: {Node},
  data:function (){
    return{
      nodes:[],
      currentNodeData:{}
    }
  },
  methods:{
    addNodes(data){
      for(let i=0;i<data.res.length;i++){
        data.res[i].index = i
        data.res[i].level = this.nodes[data.index].level + 1
      }
      this.$set(this.nodes[data.index],'node',data.res)
    },
    changeNode(node){
      this.nodes[node.index].showNodes = !this.nodes[node.index].showNodes
    },
    //当前选中节点回调
    currentNode(node){
      this.$set(this.currentNodeData,'selected',false)
      this.$set(this,'currentNodeData',node)
      this.$set(this.currentNodeData,'selected',true)
      this.$emit("currentNode",node)
    }
  },
  mounted() {
    api.getApi(api.selectWithOutHtmlDataByParentId,{
      id:0
    },res=> {
      for(let i=0;i<res.length;i++){
        res[i].index = i
        res[i].level = 0
        res[i].showNodes =false
      }
      this.nodes = res
    })
  }
}
</script>

<style scoped lang="less">
@import "nodes.less";
</style>