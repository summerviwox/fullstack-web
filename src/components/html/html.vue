<template>
  <div class=" htmlroot myscroller">
    <div v-html="html" class="html"></div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  name: "html",
  data:function (){
    return{
      html:'',
      id:'',
    }
  },
  methods:{},
  mounted() {
    this.id = this.$route.query.id
    api.postApi(api.selectHtmlById,true,{
      id:this.id
    },res=>{
        this.html = res.data.html
    },error=>{

    })
  }
}
</script>

<style scoped lang="less">
@import "html";
</style>
<style lang="less">
@import "../markdown/markdown-style.less";
</style>
