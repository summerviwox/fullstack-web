<template>
  <div class="dir-node-root">
    <div class="node" v-for="(item,index) in dirNodeData" :key="index">
      <div class="title"
           v-bind:class="{selectedtheme:booleanSelectedMT(item),
         unselectedtheme:!booleanSelectedMT(item)}"
           :style="{paddingLeft:item.level*30+'px'}"
           @click="callBackMT('selectedNodeMT',item)"
           @contextmenu.prevent="callBackMT('contextmenuMT',{data:item,event:$event})"
      >
        <img class="arrow" v-bind:class="{toggleon:item.toggle,toggleoff:!item.toggle}" :style="{visibility:item.nodes.length!=0?'visible':'hidden'}" :src="require('../../../assets/right.svg')" @click.stop="callBackMT('toggle',item)"/>
        <div class="text">{{item.title}}</div>
        <div class="childcount">{{item.nodes.length==0?'':item.nodes.length}}</div>
      </div>
      <div class="line mylinetheme"></div>
      <dir-node v-show="item.toggle"  class="children" :dir-node-data="item.nodes" v-on="$listeners" :data="data"></dir-node>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  name: "dirNode",
  props:{
    dirNodeData:Array,
    data:Object,
  },
  data:function (){
    return{

    }
  },
  methods:{
    callBackMT(method,data){
      //this.$parent.callBackMT(method,data)
      //this.$emit("callBackMT",method,data)
      this.$listeners.callBackMT(method,data)
    },
    booleanSelectedMT(item){
      return  util.isEmpty(this.data.selectedNode)?
          false:
          this.data.selectedNode.id == item.id
    },
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "dir-node";
</style>
