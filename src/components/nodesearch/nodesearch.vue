<template>
  <div class="nodesearch">

    <input @keyup.enter="onEnterSearch()" class="text myinputtheme" v-model="text" maxlength="28" type="text"/>
    <img v-if="text.length!=0" @click="onClearInputMT" class="img" src="../../assets/remove.svg"/>
  </div>
</template>

<script>
export default {
  name: "nodesearch",
  data:function (){
    return{
      text:'',
      currentMenu:0,
      switchimg:require("../../assets/dir.png")
    }
  },
  methods:{
    switchImgType(index){
      switch (index){
        case 0:
          return require("../../assets/dir.png")
        case 1:
          return require("../../assets/search.png")
        case 2:
          return require("../../assets/last.png")
      }
    },
    switchMenu(){
      this.currentMenu = (this.currentMenu+1)%3
      this.switchMenuIndex(this.currentMenu)
    },
    switchMenuIndex(index){
      this.currentMenu = index
      this.switchimg = this.switchImgType(this.currentMenu)
      this.$emit('switchMenu',this.currentMenu )
    },
    onEnterSearch(){
      this.switchMenuIndex(1)
      this.$emit("onEnterSearch",this.text)
    },
    onClearInputMT(){
      this.text = ""
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import "nodesearch";

</style>
