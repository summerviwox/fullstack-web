<template>
  <div class="root">
    <node :type="'style'" :node="item" v-for="(item,index) in list" :key="index"></node>
  </div>
</template>

<script>
import Node from "../node/node";
export default {
  name: "lastnodes",
  components: {Node},
  data:function () {
    return{
      list:[]
    }
  },
  methods:{
    pushList(node){
      this.list.forEach((item,index) => {
        if(item.id==node.id){
          this.list.splice(this.list.lastIndexOf(node),1)
        }
      })
      this.list.push(node)
      if(this.list.length>20){
        this.list.shift()
      }
    }
  }
}
</script>

<style scoped>
@import "lastnodes.less";
</style>