<template>
  <div class="hero" ref="hero">
    <mythree v-if="option.width!=0&&option.height!=0" :option="option"></mythree>
  </div>
</template>

<script>
import Mythree from "../mythree/mythree";
export default {
  name: "hero",
  components: {Mythree},
  data:function (){
    return{
      option:{
        width:0,
        height:0,
      }
    }
  },
  mounted() {
    let rect  = this.$refs.hero.getBoundingClientRect()
    console.log(rect)
    this.option = {
      width: rect.width,
      height: rect.height
    }
  }
}
</script>

<style scoped lang="less">
@import "hero";
</style>
