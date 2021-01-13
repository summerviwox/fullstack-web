<template>
  <div class="root">
    <node @onclickNodeEvent="onclickNodeEvent"  :type="type" v-for="(item,index) in nodes" :key="index" :node="item" ></node>
  </div>
</template>

<script>
import Node from "../node/node";
import api from "../../api/api";
import bus from "../../util/bus"
const TYPE_NODE = {
  NODE:"node",
  STYLE:"style"
}
export default {
  name: "nodes",
  components: {Node},
  props:{
    type:{
      type:Object,
      default:function () {
        return{
          type:TYPE_NODE.NODE
        }
      }
    },
  },
  data:function (){
    return{
      nodes:[],
      currentNode:{},
      currentNodeData:{}
    }
  },
  methods:{
    //点击事件回调
    onclickNodeEvent(node){
      //切换效果
      this.$set(node,'showNodes',!node.showNodes)
      //选中效果
      this.$set(this.currentNode,'selected',false)
      this.$set(node,'selected',true)
      this.$set(this,'currentNode',node)

      //选中目录层次 markdown显示
      let data ={str:""}
      this.findNodeInNodes(node,data)
      this.$set(node,'path',data.str)
      this.$emit('currentNodeInfo',node)
    },
    //递归获取标题
    findNodeInNodes(node,str){
      str.str = node.parentNode ?
          '&nbsp;<span>></span>&nbsp;'+node.title+ str.str
          :
          ''+node.title + str.str
      if(!node.parentNode){
        return
      }
      this.findNodeInNodes(node.parentNode,str)
    },
    //接口获取的node处理一下数据防止报错
    operateNode(parentNode,node,i){
      node.index = i
      node.level = parentNode?parentNode.level+1:0
      node.showNodes =false
      node.parentNode=parentNode
    }
  },
  mounted() {
    switch (this.type.type){
      case TYPE_NODE.NODE:
        break
      case TYPE_NODE.STYLE:
        break
    }
  }
}
</script>

<style scoped lang="less">
@import "nodes.less";
</style>
