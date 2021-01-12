<template>
  <div class="root">
    <node :type="type" v-for="(item,index) in nodes" :key="index" :node="item" @changeNode="changeNode" @addNodes="addNodes" @currentNode="currentNode"></node>
  </div>
</template>

<script>
import Node from "../node/node";
import api from "../../api/api";
const TYPE_NODE = {
  NODE:"node",
  STYLE:"style"
}
export default {
  name: "nodes",
  components: {Node},
  props:{
    type:{
      type:String,
      default:TYPE_NODE.NODE
    }
  },
  data:function (){
    return{
      nodes:[],
      nodelist:[],
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
    currentNode(node,nodelist){
      this.$set(this.currentNodeData,'selected',false)
      this.$set(this,'currentNodeData',node)
      this.$set(this.currentNodeData,'selected',true)
      this.nodelist=nodelist
      this.$emit("currentNode",node,nodelist)
    },
    //输出层次结构
    getMidNode(nodes,nodelist,str){
      if(nodelist.length==0){
        return str
      }
      let index = nodelist.shift()
      console.log("nodes",nodes,nodelist,nodelist.length,index)
      if(nodelist.length===0){
        str = str +nodes[index].title
      }else{
        str = str +nodes[index].title+ '&nbsp;<span>></span>&nbsp;'
      }
      nodes = nodes[index].node
      return this.getMidNode(nodes,nodelist,str)
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