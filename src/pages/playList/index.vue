<template>
  <div class="wrapper">
      <general-nav class="pd23" @returnPage="returnPage">
        <span class="text">歌单广场</span>
      </general-nav>
      <cat-bar/>
    <keep-alive>
      <router-view style="height: 87vh; overflow-y: scroll;"></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import generalNav from '@/base/generalNav'
import catBar from './components/playlistBar'
// import {getRageList,getHighList,getCatlist} from '@/network/api'
// import recommend from './recommend'


export default {
  components:{
    generalNav,
    catBar,
    // recommend,
  },
    methods:{
      returnPage(){
      this.$router.go(-1)
    },
    }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1396524_tr1owjj5u5.css');
@import url('~assets/styles/global.less');
.wrapper{
  .text{
    font-size: 0.4rem;
    vertical-align: 5px;
  }

}
</style>