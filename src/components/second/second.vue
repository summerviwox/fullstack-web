<template>
  <div class="hroot root">
    <nodes class="menu"></nodes>
    <div class="view"></div>
  </div>
</template>

<script>
import Nodes from "../nodes/nodes";
export default {
  name: "second",
  components: {Nodes},
  data:function (){
    return{

    }
  },
  methods:{

  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "second.less";
</style>