<template>
  <div class="pd23">
        <!-- 透明轮播图 -->
        <!-- <img-card class="swiper"
        v-for="(item,index) in swiper"
        :key="index"
        :playCount="item.playCount"
        :imgUrl="item.coverImgUrl"
        :dec="item.name"
        :albumId="item.id"/> -->
        <div id="songList">
            <div class="img-col">
                <img-card
                v-for="(item,index) in rageList"
                :key="item.id + index"
                :playCount="item.playCount"
                :imgUrl="item.coverImgUrl"
                :dec="item.name"
                :albumId="item.id"/>
            </div>
        </div>

  </div>
</template>

<script>
import pageLoading from '@/base/pageLoading'
import imgCard from '@/base/imgCard'
import {getRageList} from '@/network/api'

export default {
    data(){
        return{
            swiper:[],
            rageList:[],
        }
    },
    components:{
        imgCard
    },
    created(){
        this.getRageData()
    },
    methods:{
        
      async showCatlist(){
        this.cat = await getCatlist()
      },
      //默认推荐歌单
      async getRageData(){
          let res = await getRageList(33)
          this.rageList = await this.getList(res)
      },
      //数据处理
      getList(res){
        let list = []
          if(res.code === 200){
              if(this.swiper.length === 0){
                  this.swiper = res.playlists.splice(0,3)
              }
              // this.list = res.playlists
              this.offset += 1
              list = list.concat([...res.playlists])
              this.load = false
              return list
          }
      },
      //上拉加载
      async showMore(){
          let res = await getRageList(30,this.offset)
          await this.getList(res)
          //在页面添加展示
      },
    },

}
</script>

<style lang="less" scoped>
@import url('~assets/styles/global.less');
.swiper{
    margin:0.3rem 0;
}
.img-col{
    .flex-between();
    flex-wrap: wrap;
}
el-carousel__item h3{
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
.el-carousel__item:nth-child(2n){
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1){
    background-color: #d3dce6;
}
</style>