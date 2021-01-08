<template>
  <div class="root">
    <div class="vroot">
      <div v-for="(item,index) in list" :key="index" class="mytitle textstyletitle">
      <div class="text">11111</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchnodes",
  data:function () {
    return{
      list:[1,1,1,1,1,1,1,1,1]
    }

  }
}
</script>

<style scoped lang="less">
@import "searchnodes";

</style>