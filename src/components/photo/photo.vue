<template>
  <div class="photoroot">
    <div class="album" >
      <div class="photocontent" v-for="(item,index) in photos" :key="index">
        <div class="imagecontent"  @click="clickMT('imageClick',item)">
          <el-image v-if="item.atype === 'image'" class="elimage" fit="none"  :src="item.url" lazy>
            <template slot="error">
              <el-image class="elimage" fit="none"  :src="item.originUrl" lazy></el-image>
            </template>
          </el-image>
          <div v-else class="video">
           视频
          </div>
          <div class="time">{{item.time}}</div>
        </div>

        <!--<img class="img" :src="item.url">-->

      </div>
    </div>
    <div class="bottom">
      <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :current-page.sync="pagedata.currentpage"
          @current-change="pageChange"
          :pager-count="11"
          :page-size="pagedata.pagesize"
          :total.sync="pagedata.total">
      </el-pagination>
      <el-button @click="clickMT('refresh',{})" class="refresh" size="small" type="primary" icon="el-icon-refresh"></el-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import path from "@/util/path";
import util from "@/util/util";
export default {
  name: "photo",
  data:function () {
    return{
      photos:[

      ],
      pagedata:{
        currentpage:1,
        pagesize:110,
        total:1000,
        can:true,
      },
    }
  },
  methods:{
    getDataApi(){
      this.pagedata.can = false
      api.getApi(api.picture.getAllRecordsDescLimit,true,{
        limit:this.pagedata.currentpage-1,
        pagesize:this.pagedata.pagesize,
      },(res)=>{
        console.log(res.data)
        this.pagedata.total = res.total
        this.pagedata.can = true
        this.photos = []
        res.data.forEach((v,i)=>{
          if(util.isNotEmpty(v.netpath)){
            this.photos.push({
              url:path.getPictureThumnailNetPath(v.netpath),
              originUrl:path.getPictureOriginNetPath(v.netpath),
              atype:v.atype,
              time:util.format(new Date(v.ctime),"yy/MM/dd")
            })
          }else{
            this.photos.push({
              url:'https://www.summerviwox.com/blog/9.png',
              originUrl:'https://www.summerviwox.com/blog/9.png',
              atype:'image',
            })
          }
        })
      },(err)=>{})
    },
    pageChange(index){
      this.getDataApi()
    },
    myScorll(e){
      //滑动到底部
      if(e.target.scrollHeight==e.target.clientHeight+e.target.scrollTop){
        if(!this.pagedata.can){
          return
        }
        this.pagedata.currentpage+=1
        this.getDataApi()
      }
    },
    clickMT(method,item){
      switch (method){
        case "imageClick":
          console.log(item.url)
          window.open(item.originUrl,"_blank")
          break
        case "refresh":
          this.getDataApi()
          break
      }
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
