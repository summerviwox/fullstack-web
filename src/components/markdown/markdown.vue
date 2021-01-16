<template>
  <div class="hroot">
    <div class="markdownroot">
      <textarea ref="markdown" class="markdown myscroller mymaintheme" @scroll="scroll()" v-model="marktext" v-bind:oninput="input()" type="textarea"></textarea>
    </div>
    <div ref="htmlroot" class="htmlroot myscroller">
      <div  class="html" v-html="htmltext"></div>
    </div>
    <div></div>
  </div>
</template>

<script>
  import md from './mymarkdown'
  export default {
    name: "markdown",
    props:{
      outmarkdown:String
    },
    data:function (){
      return{
        marktext:'',
        htmltext:''
      }
    },
    methods:{
      input(){
        this.htmltext = md.render(this.marktext)
      },
      scroll(){
        let markdown =  this.$refs.markdown;
        let htmlroot = this.$refs.htmlroot
        let percent = markdown.scrollTop/(markdown.scrollHeight-markdown.clientHeight)
        htmlroot.scrollTo(0,percent*(htmlroot.scrollHeight-htmlroot.clientHeight))
      }
    },
  }
</script>

<style scoped lang="less">
  @import "markdown";
</style>
<style lang="less">
  @import "markdown-style.less";
</style>
