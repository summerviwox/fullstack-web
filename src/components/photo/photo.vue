<template>
<div class="photoroot">
<div class="album">
  <div class="photocontent" v-for="(item,index) in photos" :key="index">
    <el-image class="elimage"   :src="item.url">
      <template slot="error">
        <el-image class="elimage"  :src="item.originUrl"></el-image>
      </template>
    </el-image>
<!--<img class="img" :src="item.url">-->

  </div>
</div>
  <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :current-page.sync="pagedata.currentpage"
      :page-size="pagedata.pagesize"
      :total.sync="pagedata.total">
  </el-pagination>
</div>
</template>

<script>
import api from "@/api/api";
import path from "@/util/path";
export default {
name: "photo",
  data:function () {
    return{
      photos:[

      ],
      pagedata:{
        currentpage:1,
        pagesize:30,
        total:1000,
      },
    }
  },
  methods:{
    getDataApi(){
      api.getApi(api.picture.getAllRecordsDescLimit,{
        limit:this.pagedata.currentpage-1,
        pagesize:this.pagedata.pagesize,
      },(res)=>{
        console.log(res)
        res.data.forEach((v,i)=>{
          this.photos.push({
            url:path.getPictureThumnailNetPath(v.netpath),
            originUrl:path.getPictureOriginNetPath(v.netpath),
          })
        })
      },(err)=>{})
    },
  },
  mounted() {
   this.getDataApi()
  }
}
</script>

<style scoped lang="less">
@import "photo";
</style>
