<template>
  <div class="wrapper pd23" ref="newDish">
    <div class="title">
      <div class="recommended">
          <span :class="{active:type==='dish'}" @click="type='dish'">新碟</span>
          <i style="color:#ddd">|</i>
          <span :class="{active:type==='newSong'}" @click="type='newSong'">新歌</span>
      </div>
      <div class="square">
        <span v-show="type ==='dish'" @click.stop="toMoreDish">更多新碟</span>
        <span v-show="type ==='newSong'" @click.stop="toMoreSong">新歌推荐</span>
        <!-- <router-link v-show="type ==='newSong'" @click.stop="toMorePage" tag="div" >新歌推荐</router-link> -->
      </div>
    </div>
    <!-- <page-loading>  -->
      <div v-show="!load" >
        <div class="img-col" v-show="type ==='dish'">
          <img-card 
          v-for="(item,index) in dishList"
          :key="index"
          :imgUrl="item.picUrl"
          :dec="item.name"
          :dishId="item.id"/>
        </div>

        <div class="img-col" v-show="type ==='newSong'">
          <img-card 
          v-for="(item,index) in newSongsList"
          :key="index"
          :imgUrl="item.album.blurPicUrl"
          :playCount="item.playCount ||item.playcount"
          :dec="item.name"
          @click.native="beginAudio(item)"/>
        </div>
      </div>

  </div>
</template>

<script>
import imgCard from '@/base/imgCard'
import {getNewDish,getNewSong} from '@/network/api'

export default {
  components:{
    imgCard
  },
  data(){
    return{
      dishList:[],
      newSongsList:[],
      type:'dish',
      load:true,
    }
  },
  methods:{
    newDishinit(){
      this._getNewDish()
      this._getNewSong()
    },
    async _getNewDish(){
      let res = await getNewDish()
      let list = await res.monthData.concat(res.weekData)
      this.dishList = await this.getRandom(list)
    },
    async _getNewSong(){
      let res = await getNewSong()
      this.newSongsList = await this.getRandom(res.data)
    },
    //随机展示三个图片
    getRandom(list){
      // let list = res.monthData.concat(res.weekData)
      const Max_index = list.length + 1
      const index_1 = Math.floor(Math.random()*Max_index) 
      const index_2 = Math.floor(Math.random()*Max_index) 
      const index_3 = Math.floor(Math.random()*Max_index)
      this.load = false 
      return [list[index_1],list[index_2],list[index_3]]
    },
    toMoreSong(){
      this.$router.push('/moreNewSong')
    },
    toMoreDish(){
      this.$router.push('/moreNewDish')
    }
  },
  async created(){
    this.newDishinit()
  }
}
</script>
<style lang="less" scoped>
@import url("~assets/styles/global.less");
.wrapper{
  .title {
    width: 100%;
    height: 0.8rem;
    padding-top: 0.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    .recommended{
      font-size: 0.35rem;
      font-weight: 700;
    }
    .square{
      .smallTag();
      margin-left:auto;
    }
  }
  .img-col{
    .flex-between();
    flex-wrap:wrap
  }
}
</style>