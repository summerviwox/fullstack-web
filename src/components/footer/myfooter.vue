<template>
  <div class="hroot">
    <div style="flex: 1;width: 0"></div>
    <div class="info" v-html="info"></div>
  </div>
</template>

<script>
export default {
  name: "myfooter",
  data:function (){
    return{
      info:''
    }
  },
}
</script>

<style scoped lang="less">
@import "myfooter";
</style>