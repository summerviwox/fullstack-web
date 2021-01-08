<template>
  <div class="hroot">
    <div style="flex: 1;width: 0"></div>
    <div class="info" v-html="getInfo()"></div>
  </div>
</template>

<script>
export default {
  name: "myfooter",
  props:{
    info:String
  },
  methods:{
    getInfo(){
      return this.info
    }
  }
}
</script>

<style scoped lang="less">
@import "myfooter";
</style>