<template>
  <div class="newnode">
    <div class="node" v-for="(item,index) in nodes" :key="index">
      <div class="title"
           v-bind:class="{selectedtheme:booleanSelected(item),
         unselectedtheme:!booleanSelected(item)}"
           :style="{paddingLeft:item.level*30+'px'}"
           @click="callBackMT('selectedNodeMT',item)"
            @contextmenu.prevent="callBackMT('contextmenuMT',{data:item,event:$event})"
      >
        <img class="arrow" v-bind:class="{toggleon:item.toggle,toggleoff:!item.toggle}" :style="{visibility:item.nodes.length!=0?'visible':'hidden'}" :src="require('../../assets/right.svg')" @click.stop="callBackMT('toggle',item)"/>
        <div>{{item.title}}</div>
        <div class="childcount">{{item.nodes.length==0?'':item.nodes.length}}</div>
      </div>
      <newnode v-show="item.toggle"  class="children" :nodes="item.nodes" @callBackMT="callBackMT" :data="data">

      </newnode>
    </div>
  </div>
</template>

<script>
import nodeutil from "@/components/node/nodeutil";
import util from "@/util/util";

export default {
  name: "newnode",
  props:{
    nodes:Array,
    data:Object,
  },
  data:function (){
    return{
      dbclickouttime:200,//双击判定时间
      timeout:{},
    }
  },
  methods:{
    callBackMT(method,data){
      this.$emit("callBackMT",method,data)
    },
    booleanSelected(item){
      return  util.isEmpty(this.data.selectedNode)?false:
          this.data.selectedNode.id == item.id
    },
    testId(){
      return util.isEmpty(this.data.selectedNode)?-1:this.data.selectedNode.id
    },
  },
  mounted() {
    // console.log(123,this.data.selectedNode)
  }
}
</script>

<style scoped lang="less">
@import "newnode.less";
</style>
