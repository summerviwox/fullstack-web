<template>
  <div class="root myscroller">
    <nodes ref="nodes"  :type="{type:'style'}" @onContextClicked="onContextClicked" @currentNodeInfo="currentNodeInfo" class="myscroller"></nodes>
  </div>
</template>

<script>
import Nodes from "../nodes/nodes";
import util from "../node/nodeutil";
export default {
  name: "lastnodes",
  components: {Nodes},
  data:function () {
    return{
      list:[]
    }
  },
  methods:{
    currentNodeInfo(node){
      this.$emit("currentNodeInfo",node,"last")
    },
    onContextClicked(data){
      this.$emit("onContextClicked",data)
    },
    pushList(node){
      this.list.forEach((item,index) => {
        if(item.id==node.id){
          this.list.splice(this.list.lastIndexOf(node),1)
        }
      })
      this.list.push({
        id:node.id,
        markdown:node.markdown,
        parentid:node.parentid,
        selected:false,
        showNodes:false,
        title:node.title,
      })
      if(this.list.length>20){
        this.list.shift()
      }
      this.$refs.nodes.nodes = this.list
    }
  }
}
</script>

<style scoped>
@import "lastnodes.less";
</style>