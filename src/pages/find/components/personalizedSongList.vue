<template>
  <div class="wrapper pd23" ref="songList">
    <div class="title">
      <div class="recommended">懂你的精选歌单</div>
      <router-link to="playlist" tag="div" class="square">歌单广场</router-link>
    </div>
    <!-- <page-loading>  -->
    <div class="img-col" v-show="!load">
      <img-card 
      v-for="(item,index) in songList"
      :key="index"
      :imgUrl="item.picUrl||item.coverImgUrl"
      :playCount="item.playCount ||item.playcount"
      :dec="item.name"
      :albumId="item.id"/>
    </div>
  </div>
</template>

<script>
  import { getRageList,getRecSongList } from "@/network/api";
  import imgCard from "@/base/imgCard";
  import pageLoading from "@/base/pageLoading";
  
  import { getRandomArrayElements } from "@/assets/utils/getRandomArrayElements";

export default {
  data(){
    return{
      load:true,
      songList:[],
      isGetOver:false,
    }
  },
  components:{
    imgCard
  },
  created(){
    this._getImgCard()
  },
  computed:{

  },
  methods:{

    async _getImgCard(){
    //通过localStorage里面的loginState判断是否登录
      let getFlag = + localStorage.getItem('loginState')
      //已登录，获取用户推荐
      if(this.loginStState || getFlag){
         this.isGetOver = await this.loadGetSongInfo()
         return this.isGetOver
      } else {
            //2、未登录，随机推荐
         this.isGetOver = await this.getSongListInfo()
         return this.isGetOver
      }
    },
    async loadGetSongInfo(){
        // this.songList1 = await getRecSongList()
      let res = await getRecSongList()
      if(res.code === 200){
          // 可加入随机抽选
      this.songList = getRandomArrayElements(res.result,6);
          this.load = false
          return true
        }
        return false
    },

    //随即推荐
    async getSongListInfo(){
      try{
        // this.songList = await getRageList()
        let result = await getRageList()
        if(result.code === 200){
          // 可加入随机抽选
      this.songList = getRandomArrayElements(result.playlists,6);
          this.load = false
          return true
        }
        return false
      }catch(error){
        this.load = false
        console.log(error,'over time')
      }
    }

  }
}
</script>

<style lang="less" scoped>
@import url("~assets/styles/global.less");
.wrapper{
  .title {
    width: 100%;
    height: 0.8rem;
    box-sizing: border-box;
    padding-top:0.3rem ;
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