<template>
  <div class="node">
    <div class="h" v-bind:style="{'background':node.selected?'lightgray':'white'}" @contextmenu.prevent="rightClickNode"  @click="clickNode()">
      <div class="h" v-bind:style="{'margin-left':10+node.level*20+'px','visibility':imageVisible()}">
        <el-image  v-if="node.showNodes"  fit="contain" :src="require('../../assets/down.png')" class="wimage" />
        <el-image v-else fit="contain" :src="require('../../assets/right.png')" class="himage" />
      </div>
      <div class="title textstyletitle" :title="node.title">
        <div class="text" :style="{'color':node.selected?'#0099FF':'#143e05'}">{{node.title +":"+ node.id}}</div>
        <div v-if="!(node.childCount)||node.childCount==0" class="childcount"></div>
        <div v-else class="childcount">{{'('+node.childCount+')'}}</div>
      </div>

    </div>
    <div class="line"></div>
    <div class="aaaa" v-if="childsVisible()">
      <node :type="type" @onRightClickNodeEvent="onRightClickNodeEvent" @onclickNodeEvent="onclickNodeEvent" v-for="(item,index) in node.node" :node="item" :key="index"></node>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";
import nodeutil from "./nodeutil";

export default {
  name: "node",
  props:{
    node:{
      type: Object,
      default:function (){
        return {
          id:8,
          childCount:0,
          parentid:0,
          title:"工作",
          html:null,
          markdown:"# 工作\n",
          ctime:null,
          utime:null,
          "type":0,
          showNodes:false,
          node:[],
          selected:false,
          nodeType:nodeutil.NODE,
          childCountStr:'',
        }
      }
    },
    type:{
      type:Object,
      default:function () {
        return{
          type:nodeutil.NODE
        }
      }
    }
  },
  data:function (){
    return{
      //childCountStr:''
    }
  },
  methods:{
    //是否显示子节点
    childsVisible(){
      return this.node.showNodes
          &&(this.node.nodeType===nodeutil.NODE)
    },
    //是否显示展开收缩图标
    imageVisible(){
      return (this.node!=undefined)
      &&((this.node.childCount&&this.node.childCount!=0)
          ||(this.node.node&&this.node.node.length!=0))
      &&(this.node.nodeType===nodeutil.NODE)
          ?'visible':'hidden'
    },
    getchildcount(){
      if((this.node.nodeType===nodeutil.NODE)&&this.node.childCount){
        this.$set(this,'childCountStr',this.node.childCount==0?"":"("+this.node.childCount+")")
        return
      }
      this.$set(this,'childCountStr','')
    },
    clickNode(){
      this.$emit("onclickNodeEvent",this.node)
    },
    rightClickNode(e){
      this.$emit("onRightClickNodeEvent",this.node,e)
    },
    //点击事件回调
    onclickNodeEvent(node){
      this.$emit("onclickNodeEvent",node)
    },
    //右键事件回调
    onRightClickNodeEvent(node,e){
      this.$emit("onRightClickNodeEvent",node,e)
    },
  },
  mounted() {
    this.node.nodeType = this.type.type
  }
}
</script>

<style scoped lang="less">
@import "node.less";
</style>
