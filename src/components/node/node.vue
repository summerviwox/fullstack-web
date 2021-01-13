<template>
  <div class="node">
    <div class="h" v-bind:style="{'background':node.selected?'lightgray':'white'}"  @click="clickNode()">
      <div class="h" v-bind:style="{'margin-left':10+node.level*20+'px','visibility':imageVisible()}">
        <el-image  v-if="node.showNodes"  fit="contain" :src="require('../../assets/down.png')" class="wimage" />
        <el-image v-else fit="contain" :src="require('../../assets/right.png')" class="himage" />
      </div>
      <div class="title textstyletitle" :title="node.title">
        <div class="text" :style="{'color':node.selected?'#0099FF':'#143e05'}">{{node.title}}</div>
        <div class="childcount">{{getchildcount()}}</div>
      </div>

    </div>
    <div class="line"></div>
    <div class="aaaa" v-if="childsVisible()">
      <node :type="type" @onclickNodeEvent="onclickNodeEvent" v-for="(item,index) in node.node" :node="item" :key="index"></node>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";
const TYPE_NODE = {
  NODE:"node",
  STYLE:"style"
}
export default {
  name: "node",
  props:{
    node:{
      type: Object,
      default:function (){
        return {
          id:8,
          parentid:0,
          title:"工作",
          html:null,
          markdown:"# 工作\n",
          ctime:null,
          utime:null,
          "type":0,
          showNodes:false,
          node:[],
          selected:false
        }
      }
    },
    type:{
      type:Object,
      default:function () {
        return{
          type:TYPE_NODE.NODE
        }
      }
    }
  },
  data:function (){
    return{
    }
  },
  methods:{
    //是否显示子节点
    childsVisible(){
      return this.node.showNodes
          &&(this.type.type===TYPE_NODE.NODE)
    },
    //是否显示展开收缩图标
    imageVisible(){
      return (this.node!=undefined&&this.node.childCount&&this.node.childCount!=0)
      &&(this.type.type===TYPE_NODE.NODE)
          ?'visible':'hidden'
    },
    getchildcount(){
      if((this.type.type===TYPE_NODE.NODE)&&this.node.childCount){
        return this.node.childCount==0?"":"("+this.node.childCount+")"
      }
      return ''
    },
    clickNode(){
      this.$emit("onclickNodeEvent",this.node)
    },
    //点击事件回调
    onclickNodeEvent(node){
      this.$emit("onclickNodeEvent",node)
    },
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "node.less";
</style>
