<template>
  <div class="roota">
    <div class="h">
      <div class="h" v-bind:style="{'margin-left':10+node.level*20+'px'}" v-if="node.node!=undefined&&node.node.length!=0">
        <el-image v-if="node.showNodes" v-bind:style="{'margin-left':10+node.level*20+'px'}" fit="fill" :src="require('../../assets/down.png')" class="image" />
        <el-image v-else fit="fill" :src="require('../../assets/down.png')" class="image" />
      </div>
      <div class="image" v-else v-bind:style="{'margin-left':10+node.level*20+'px'}"></div>
      <div class="title" @click="ClickNodes(node.id)" @addNodes="addNodes">{{node.title}}</div>
    </div>
    <div class="line"></div>
    <div v-if="node.showNodes">
      <node  v-for="(item,index) in node.node" :node="item" :key="index" @changeNode="changeNode" @addNodes="addNodes"></node>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

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
          node:[]
        }
      }
    }
  },
  data:function (){
    return{
    }
  },
  methods:{
    ClickNodes(id){
      if(this.node.showNodes&&this.node.node!=undefined&&this.node.node.length!=0){
        this.$emit("changeNode",this.node)
        return
      }
      this.$emit("changeNode",this.node)
      api.getApi(api.selectWithOutHtmlDataByParentId,{
        id:id
      },res=> {
        this.$emit("addNodes",{index:this.node.index,res:res})
      })
    },
    addNodes(data){
      for(let i=0;i<data.res.length;i++){
        data.res[i].index = i
        data.res[i].level = this.node.node[data.index].level + 1
        data.res[i].showNodes = false
      }
      this.$set(this.node.node[data.index],'node', data.res)
    },
    changeNode(node){
      this.node.node[node.index].showNodes = !this.node.node[node.index].showNodes
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "node.less";
</style>