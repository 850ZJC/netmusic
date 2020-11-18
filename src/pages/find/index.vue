<template>
  <div>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh">
      <swiper/>
      <icon/>
      <song-list ref="songList"/>
      <new-dish/>
    </van-pull-refresh>
      <top-tip ref="tip">
        <span class="tips">{{tips}}</span>
      </top-tip>
      <!-- <div id="audio_pd1" v-show="!isMiniAudio"></div> -->
  </div>
</template>

<script>
import swiper from './components/swiper'
import icon from './components/icons'
import songList from './components/personalizedSongList'
import newDish from './components/newDish'
import {mapGetters} from 'vuex'
import { Form } from 'vant'

export default {
  name:'findIndex',
  components:{
    swiper,
    icon,
    songList,
    newDish,
  },
  data(){
    return{
      isLoading:false,
      tips:'正在为你推荐更多有趣的内容',
    }
  },
  methods:{
    onRefresh(){
      let timer = this.$refs.songList._getImgCard()
      // this.$refs.newDish.newDishinit()
      if(this.isGetOver()){
        setTimeout(()=>{
          this.isLoading =false
          this.tips = '已为你推荐新的内容'
          this.$refs.tip.showTip()
        },500)
      }else{
        setTimeout(()=>{
          this.isLoading =false
          this.tips = '加载失败'
          this.$refs.tip.showTip()
        },500)
      }
    },
    isGetOver(){
      return this.$refs.songList.isGetOver
    }
  },
  mounted(){
    this.$refs.tip.showTip()
  },
  //导航守卫
  beforeRouteEnter(to,from,next){
    next()
    if(from.path ==='/login/pwd'){
      location.reload()
    }
  },
  computed:{
    ...mapGetters({
      isMiniAudio:'FULL_SCREEN'
    })
  }
}
</script>
<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1295705_yfxum6q2gip.css");
.tips {
  box-sizing: border-box;
  padding: 0.1rem 0.2rem;
  background-color: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 0.23rem;
  border-radius: 0.3rem;
}
</style>