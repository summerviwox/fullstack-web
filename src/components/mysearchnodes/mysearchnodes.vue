<template>
  <div class="mysearchnodes-root">
    <div class="myscroller scroll">
      <div
          @click="gotoMT(item,$event)"
          class="item"
          v-for="(item,index) in nodes"
          :key="index">
        <div class="title">{{item.title}}</div>
        <div class="detail">{{item.markdown}}</div>
        <div class="line mylinetheme"></div>
      </div>
    </div>
    <nodata v-show="nodes.length==0"></nodata>
  </div>
</template>

<script>
import Nodata from "@/components/nodata/nodata";
export default {
  name: "mysearchnodes",
  components: {Nodata},
  props:{
    nodes:Array,
  },
  methods:{
    gotoMT(item,e){
      this.$emit("callBackMT",{data:item,event:e},"gotoMT")
    }
  },
}
</script>

<style scoped lang="less">
@import "mysearchnodes";
</style>
