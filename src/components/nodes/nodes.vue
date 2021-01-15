<template>
  <div ref="nodes" class="root" @click="rootclick">
    <node @onRightClickNodeEvent="onRightClickNodeEvent" @onclickNodeEvent="onclickNodeEvent"  :type="type" v-for="(item,index) in nodes" :key="index" :node="item" ></node>
    <div v-if="contextshow" :style="{'top':contextStyle.top,'left':contextStyle.left}" class="comtextdialog" ref="comtextdialog">
      <span class="item" @click="onContextClick(item)" v-for="(item,index) in contextList" :key="index">{{item.label}}</span>
    </div>
  </div>
</template>

<script>
import Node from "../node/node";
import api from "../../api/api";
import bus from "../../util/bus"
import nodeutil from "../node/nodeutil";
export default {
  name: "nodes",
  components: {Node},
  props:{
    type:{
      type:Object,
      default:function () {
        return{
          type:nodeutil.NODE
        }
      }
    },
  },
  data:function (){
    return{
      nodes:[],
      currentNode:{},
      contextList:[
        {
          label:"新增根目录",
          value:1
        },
        {
          label:"新建",
          value:1
        },
        {
          label:"删除",
          value:1
        },
      ],
      contextshow:false,
      contextStyle:{
        top:0,
        left:0,
      }
    }
  },
  methods:{
    //点击事件回调
    onclickNodeEvent(node){
      this.myNodeToggle(node)
      this.myNodeSelected(node)

    },
    //右键事件回调
    onRightClickNodeEvent(node,e){
      this.myNodeSelected(node)
      let root =this.$refs.nodes.getBoundingClientRect()
      this.contextStyle.left = (e.clientX - root.y) + 'px'
      this.contextStyle.top =(e.clientY - root.y) + 'px'
      this.contextshow = true
      this.$emit("onRightClickNodeEvent",node,e)
    },
    onContextClick(data){
      this.contextshow = false
      data.currentNode = this.currentNode
      this.$emit("onContextClicked",data)
    },
    rootclick(){
      this.contextshow = false
    },
    myNodeToggle(node){
      //切换效果
      this.$set(node,'showNodes',!node.showNodes)
    },
    myNodeSelected(node){
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
  },
  mounted() {
    switch (this.type.type){
      case nodeutil.NODE:
        break
      case nodeutil.STYLE:
        break
    }
  }
}
</script>

<style scoped lang="less">
@import "nodes.less";
</style>
