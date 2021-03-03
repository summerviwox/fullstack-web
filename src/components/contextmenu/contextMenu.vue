<template>
  <div v-if="contextdialogvisible"  :style="{'top':contextStyle.top,'left':contextStyle.left,'bottom':contextStyle.bottom}" class="comtextdialog mymaintheme" ref="comtextdialog">
      <span  class="itemcontent"  @click.stop="onContextClick($event,item)" v-for="(item,index) in contextList" :key="index">
        <div class="item"  v-if="item.enable"> {{item.label}}</div>
      </span>
    <slot name="content"></slot>
<!--    <span class="itemcontent" >-->
<!--          <input type="file"   @change="handleFileChange" ref="inputer" style="display: none">-->
<!--      <span class="item" @click.stop="openFile()">上传文件</span>-->
<!--      </span>-->
  </div>
</template>

<script>
export default {
  name: "contextMenu",
  props:{
    contextList:Array,
  },
  data:function () {
    return{
      contextdialogvisible:false,
      contextStyle:{
        top:0,
        left:0,
        bottom:0
      }
    }
  },
  methods:{
    onContextClick(e,item){
        this.$emit('onContextClick',e,item)
    },
    click(e){

    },
    open(e){
      let clientHeight =document.body.clientHeight
      this.contextStyle.left = e.clientX + 'px'
      if(e.clientY>clientHeight/2){
        this.contextStyle.top = ''
        this.contextStyle.bottom = (clientHeight - e.clientY) + 'px'
      }else{
        this.contextStyle.bottom = ''
        this.contextStyle.top =e.clientY + 'px'
      }
      this.contextdialogvisible = true
    },
    close(){
      this.contextdialogvisible = false
    }
  }
}
</script>

<style scoped lang="less">
@import "contextMenu";
</style>
