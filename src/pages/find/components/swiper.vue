<template>
  <div class="banner-container" >
    <van-swipe :autoplay="5000" indicator-color="#dd001b">
        <van-swipe-item v-for="(item, index) in swiperList" :key="index">
            <img class="banner-img" :src="item.pic" alt/>
            <span class="title" :style="{background:item.titleColor}">{{item.typeTitle}}</span>
        </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {getBanner} from '@/network/api.js'
export default {
    name:'Swiper',
    data() {
        return {
        swiperList: [],
        };
    },
    methods:{

        async getBanner(){
            let res = await getBanner()
            this.swiperList = await this.getInfo(res)
        },
        getInfo(res){
            if (res.code === 200){
                return res.banners
            }
        },
    },
    mounted(){
        this.getBanner()
    }
    
}
</script>

<style lang="less" scoped>
    @import url("~assets/styles/global.less");

    .banner-container {
        box-sizing: border-box;
        overflow: hidden;
        padding: 0.2rem;
        width: 100%;
        height: 0;
        padding-bottom: 40%;
        .banner-img{
            border-radius: @imgBorderRadius;
            width: 100%;
            height:100%
        }
    }
    .title{
        position: absolute;
        right: 0;
        bottom: 0;
        color: #fff;
        font-size: smaller;
        padding:3px 6px;
        opacity: 0.8;
        border-top-left-radius: @imgBorderRadius;
    }

</style>