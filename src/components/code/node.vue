<template>
  <div class="roota">
    <div class="h" v-bind:style="{'background':node.selected?'lightgray':'white'}"  @click="ClickNodes(node.id)">
      <div class="h" v-bind:style="{'margin-left':10+node.level*20+'px','visibility':getImageVisible()}">
        <el-image v-if="node.showNodes"  fit="contain" :src="require('../../assets/down.png')" class="wimage" />
        <el-image v-else fit="contain" :src="require('../../assets/right.png')" class="himage" />
      </div>
      <div class="title textstyletitle" :title="node.title">
        <div class="text" :style="{'color':node.selected?'#0099FF':'#143e05'}">{{node.title}}</div>
        <div class="childcount">{{getchildcount()}}</div>
      </div>

    </div>
    <div class="line"></div>
    <div v-if="node.showNodes">
      <node  v-for="(item,index) in node.node" :node="item" :key="index" @currentNode="currentNode" @changeNode="changeNode" @addNodes="addNodes"></node>
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
          node:[],
          selected:false
        }
      }
    }
  },
  data:function (){
    return{
    }
  },
  methods:{
    getImageVisible(){
      return (this.node!=undefined&&this.node.childCount!=0)?'visible':'hidden'
    },
    getchildcount(){
      return this.node.childCount==0?"":"("+this.node.childCount+")"
    },
    ClickNodes(id){
      this.$emit("changeNode",this.node)
      let nodelist = []
      nodelist.push(this.node.index)
      this.$emit("currentNode",this.node,nodelist)
      if(!this.node.showNodes&&this.node.node!=undefined&&this.node.node.length!=0){
        //关闭状态
      }else{
        api.getApi(api.selectWithOutHtmlDataByParentId,{
          id:id
        },res=> {
          for(let i=0;i<res.length;i++){
            res[i].index = i
            res[i].level = this.node.level + 1
            res[i].showNodes = false
          }
          this.$emit("addNodes",{index:this.node.index,res:res})
        })
      }
    },
    addNodes(data){
      this.$set(this.node.node[data.index],'node', data.res)
    },
    changeNode(node){
      console.log( 555,this.node.node[node.index])
     // this.node.node[node.index].selected = true//选中
      this.node.node[node.index].showNodes = !this.node.node[node.index].showNodes
    },
    //当前选中节点回调
    currentNode(node,nodelist){
      nodelist.unshift(this.node.index)
      this.$emit("currentNode",node,nodelist)
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "node.less";
</style>