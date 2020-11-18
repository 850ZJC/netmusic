<template>
  <div class="container border-tottom">
    <icon v-for="(item,index) in findIcons"
    :icons="item"
    :bgcolor="true"
    :key="index"
    @goPage="goPage(item.linkTo)">
        <span class="today" v-if="item.text === '每日推荐'">{{today}}</span>
    </icon>
  </div>
</template>

<script>
import icon from '@/base/icon'
import {findIcons} from '@/getInfos/getData'
import {bannerSwiperFn} from '@/network/api'
// import func from '../../../../vue-temp/vue-editor-bridge'

export default {
  data(){
    return{
      findIcons
    }
  },
  computed:{
    today(){
      return new Date().getDate()
    }
  },
  components:{
    icon
  },
  mounted(){
    this.iniData();
  },
  methods:{
    async iniData(){
      this.findIcons = await findIcons()
    },
    goPage(link){
      if(link === 'personalFm'){
        //点击私人FM时，需要获取私人FM信息
        this._getPersonalFM()
      }else{
        this.$router.push(link)
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import url("~assets/styles/global.less");
.container{
  .flex-around();
  width: 100%;
  height: 1.6rem;
  align-items: center;
  padding: 0.2rem 0 0.3rem;
  .today{
    position: absolute;
    top:0.09rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.2rem;
  }
}
</style>