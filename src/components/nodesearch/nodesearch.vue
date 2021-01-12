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
      this.currentMenu = (this.currentMenu+1)%2
      switch (Number.parseInt(this.currentMenu)){
        case 0:
          console.log("目录")
          break
        case 1:
          console.log("搜索")
          break
        case 2:
          console.log("最近")
          break
      }
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
