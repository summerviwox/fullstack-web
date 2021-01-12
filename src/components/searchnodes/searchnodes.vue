<template>
  <div class="root">
    <div class="vroot">

      <node :node="item" v-for="(item,index) in list" :key="index"></node>

<!--      <div @click="clickNode(item)" v-for="(item,index) in list" :key="index" class="mytitle textstyletitle">-->
<!--      <div class="text">{{item.title}}</div>-->
<!--    </div>-->
    </div>
  </div>
</template>

<script>
import api from "../../api/api";
import bus from "../../util/bus";
import Node from "../node/node";
export default {
  name: "searchnodes",
  components: {Node},
  props:{

  },
  data:function () {
    return{
      list:[]
    }

  },
  methods:{
    clickNode(item){
      api.postApi(api.selectParentsById,item,res=>{
        let str = this.getCurrentNodePath(res.data,"")
        bus.$emit("currentSearchNode",str)

      },error=>{

      })
    },
    getCurrentNodePath(data,str){
      if(data.childBlog.length==0){
        str = str + data.title
        return str
      }else{
        str = str + data.title + '&nbsp;<span>></span>&nbsp;'
        return this.getCurrentNodePath(data.childBlog[0],str)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "searchnodes";

</style>