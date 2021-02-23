<template>
  <div ref="nodes" class="root" @click="rootclick">
    <node @expanClickEvent="expanClickEvent" @onRightClickNodeEvent="onRightClickNodeEvent" @onclickNodeEvent="onclickNodeEvent"  :type="type" v-for="(item,index) in node.node" :key="index" :node="item" ></node>
    <context-menu @onContextClick="onContextClick"  ref="comtextdialog"   :contextList="contextList">
    </context-menu>
  </div>
</template>

<script>
import Node from "../node/node";
import api from "../../api/api";
import bus from "../../util/bus"
import nodeutil from "../node/nodeutil";
import contextMenu from "../contextmenu/contextMenu";
export default {
  name: "nodes",
  components: {Node,contextMenu},
  props:{
    type:{
      type:Object,
      default:function () {
        return{
          type:nodeutil.NODE
        }
      }
    },
    contextList:{
      type:Array,
      default:function () {
        return[]
      }
    },
  },
  data:function (){
    return{
      node:{
        id:0,
        level:-1,
        node:[],
        title:'',
      },
      //nodes:[],
      currentNode:{},
    }
  },
  methods:{
    //点击事件回调
    onclickNodeEvent(node){
      this.myNodeSelected(node)

    },
    //右键事件回调
    onRightClickNodeEvent(node,e){
      this.myNodeSelected(node)
      this.$refs.comtextdialog.open(e)
      this.$emit("onRightClickNodeEvent",node,e)
    },
    //点击展开收缩开关
    expanClickEvent(node,e){
      this.myNodeToggle(node)
      this.$emit("expanClickEvent",node,e)
    },
    onContextClick(e,item){
      this.$refs.comtextdialog.close()
      item.currentNode = this.currentNode
      this.$emit("onContextClicked",e,item)
    },
    rootclick(){
      if(this.$refs.comtextdialog){
        this.$refs.comtextdialog.close()
      }
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
     // console.log(node.title,node.id,node.parentNode)
      str.str = node.parentNode ?
              '&nbsp;<span>></span>&nbsp;'+node.title+ str.str
          :
          node.id==0?
              str.str:
              ''+node.title + str.str
      if(!node.parentNode){
        return
      }
      this.findNodeInNodes(node.parentNode,str)
    },
  },
  mounted() {
    bus.$on("onAllClickEvent",this.rootclick)
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
