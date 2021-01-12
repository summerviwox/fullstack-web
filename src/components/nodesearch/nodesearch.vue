<template>
  <div class="root">
    <img @click="switchMenu"  class="switch" src="../../assets/switch.png"/>
    <input @keyup.enter="onEnterSearch()" class="text" v-model="text" maxlength="23" type="text"/>
    <img class="img" src="../../assets/search.png"/>
  </div>
</template>

<script>
export default {
  name: "nodesearch",
  data:function (){
    return{
      text:'',
      currentMenu:0
    }
  },
  methods:{
    switchMenu(){
      this.currentMenu = 1-this.currentMenu
      this.$emit('switchMenu',this.currentMenu )
    },
    onEnterSearch(){
      this.$emit('switchMenu',1)
      this.$emit("onEnterSearch",this.text)
    }
  }
}
</script>

<style scoped lang="less">
@import "nodesearch";

</style>
