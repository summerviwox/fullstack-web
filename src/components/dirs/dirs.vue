<template>
  <div class="root">
    <nodes ref="nodes" :type="{type:'node'}" @onContextClicked="onContextClicked" @currentNodeInfo="currentNodeInfo" class="myscroller"></nodes>
  </div>
</template>

<script>
import Nodes from "../nodes/nodes";
import api from "../../api/api";
import nodeutil from "../node/nodeutil";

export default {
  name: "dirs",
  components: {Nodes},
  data:function () {
    return{

    }

  },
  methods: {
    currentNodeInfo(node) {
      this.getApiNodes(node,res=> {
        this.$set(node,'node',res)
      })
      this.$emit("currentNodeInfo",node,"dir")
    },
    onContextClicked(data){
      this.$emit("onContextClicked",data)
    },
    getApiNodes(parentNode,go) {
      api.getApi(api.selectWithOutHtmlDataByParentId,{
        id:parentNode?parentNode.id:0
      },res=> {
        for(let i=0;i<res.length;i++){
          nodeutil.operateNode(parentNode,res[i],i,nodeutil.NODE)
        }
        go(res)
      })
    },
  },
  mounted() {
    this.getApiNodes(undefined,res=> {
      this.$refs.nodes.nodes = res
    })
  }
}
</script>

<style scoped lang="less">
@import "dirs";

</style>