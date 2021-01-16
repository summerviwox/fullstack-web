<template>
  <div class="hroot mymaintheme">
    <div style="flex: 1;width: 0"></div>
    <div class="info">
      <div v-for="(item,index) in infos" :key="index">
          <span>></span>{{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myfooter",
  props:{
    infos:{
      type:Array,
      default:function () {
        return[]
      }
    }
  },
  data:function (){
    return{
    }
  },
}
</script>

<style scoped lang="less">
@import "myfooter";
</style>
