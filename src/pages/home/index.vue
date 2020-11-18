<template>
  <div>
      <home-icons></home-icons>
      <home-list></home-list>
      <div></div>
      <song-list></song-list>
      <slider></slider>
      <div id="audio_pd1" v-show="!isMiniAudio"></div>
  </div>
</template>

<script>
  import { mapGetters,mapActions } from "@/network/api";
  import homeIcons from "./components/icons";
  import homeList from "./components/homeList";
  import pageLoading from "@/base/pageLoading";
  import { getRandomArrayElements } from "@/assets/utils/getRandomArrayElements";

export default {
  components:{
    homeIcons,
    homeList,
  },
}
</script>

<style lang="less" scoped>
@import url("~assets/styles/global.less");
@import url("//at.alicdn.com/t/font_1322300_t3s39ptd6ao.css");

</style>