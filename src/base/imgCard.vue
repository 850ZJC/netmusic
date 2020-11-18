<template>
  <div class="img-card" @click="searchIdx(idx)" :style="{width,marginTop:top}">
      <span class="tag" v-if="playCount"> 
          <i class="card cardbofang"></i>
          {{playCount | setPlayCount}}
      </span>
      <span class="swiper-tag" v-if="swiper">
          <i class="card cardbofang1"></i>
      </span>
      <span class="fine-tag" v-if="fine">
        <i class="card cardhuangguan"></i>
      </span>
    <span class="time-tag" v-if="updateTime">{{ updateTime }}</span>
    <div class="img-con" :style="{width:width,paddingBottom:width}">
         <div class="shadow"></div>
         <img v-lazy="imgUrl + '?param=122y122'" :key="imgUrl" class="image">
         <span class="dj-name" v-show="type === 'dj'">{{name}}</span>
    </div>
    <div class="dec" :class="{lines:lines === 'one',twoLines:lines === 'two'}">{{dec}}</div>
    <div class="artists" v-if="artists">
        <span v-for="(item,index) in artists" 
            :key="index" 
            class="artist">
            {{item.name}}
        </span>
    </div>
  </div>
</template>

<script>

export default {
    props:{
        playCount:Number,
        updateTime:String,
        imgUrl:String,
        dec:String,
        type:String,
        name:String,
        width:{
            type:String,
            default:'2.1rem'
        },
        lines:{
            type:String,
            default:'two'
        },
        artists:Array,
        top:{
            type:String,
            default:'0.3rem'
        },
        // 如果是轮播图，则显示大播放按钮
        swiper: {
            type: Boolean,
            default: false
        },
        fine: {
            type: Boolean,
            default: false
        },
        albumId: Number,
        dishId:Number,
        ridId:Number,
        idx:String
    },
    filters:{
        setPlayCount(val){
            const ten_thousand = 10000
            const hundred_million = 100000000

            if(!val){
                return ''
            }
            if(val > hundred_million){
                val=((val/hundred_million).toFixed(1))+'亿'
            }else if(val > ten_thousand){
                val=Math.floor(val/ten_thousand)+'万'

            }
            return val
        }
    },
    methods:{
        searchIdx(idx){
            if(!idx){
                if(this.albumId){
                    this.$router.push({
                        name:'playListDetail',
                        query:{
                            albumId:this.albumId
                        }
                    })
                    return
                }
                // if(this.dishId){
                //     this.$router.push({
                //         path:'playlist/detail',
                //         params:{
                //             dishId:this.dishId
                //         }
                //     })
                //     return
                // }
                // if(this.ridId){
                //     this.$router.push({
                //         name:'djDetailPagePage',
                //         params:{
                //             ridId:this.ridId
                //         }
                //     })
                //     return
                // }
            }
      //   switch (idx) {
      //   case '云音乐新歌榜':
      //     idx = 0
      //     break
      //   case '云音乐热歌榜':
      //     idx = 1
      //     break
      //   case '网易原创歌曲榜':
      //     idx = 2
      //     break
      //   case '云音乐飙升榜':
      //     idx = 3
      //     break
      //   case '云音乐说唱榜':
      //     idx = 23
      //     break
      //   case '云音乐ACG音乐榜':
      //     idx = 22
      //     break
      //   case 'KTV唛榜':
      //     idx = 7
      //     break
      //   case 'iTunes榜':
      //     idx = 8
      //     break
      //   case '日本Oricon周榜':
      //     idx = 10
      //     break
      //   case 'Hit FM Top榜':
      //     idx = 9
      //     break
      //   case '台湾Hito排行榜':
      //     idx = 20
      //     break
      //   case 'Beatport全球电子舞曲榜':
      //     idx = 21
      //     break
      //   case '法国 NRJ Vos Hits 周榜':
      //     idx = 20
      //     break
      //   case '云音乐国电榜':
      //     idx = 4
      //     break
      //   case 'UK排行榜周榜':
      //     idx = 5
      //     break
      //   case '美国Billboard周榜':
      //     idx = 6
      //     break
      //   case '云音乐古典音乐榜':
      //     idx = 24
      //     break
      //   case '云音乐电音榜':
      //     idx = 25
      //     break
      //   case '抖音排行榜':
      //     idx = 26
      //     break
      //   case '新声榜':
      //     idx = 27
      //     break
      //   case '云音乐韩语榜':
      //     idx = 28
      //     break
      //   case '英国Q杂志中文版周榜':
      //     idx = 29
      //     break
      //   case '电竞音乐榜':
      //     idx = 30
      //     break
      //   case '云音乐欧美热歌榜':
      //     idx = 31
      //     break
      //   case '云音乐欧美新歌榜':
      //     idx = 32
      //     break
      //   case '说唱TOP榜':
      //     idx = 33
      //     break
      // }
      this.$emit('showIdxPage', idx)
        }
        
    }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1396631_tp8pq8axas.css");
@import url("~assets/styles/global.less");
.img-card{
    position: relative;
    background-color: #fff;
    .time-tag{
        position: absolute;
        bottom: 0.54rem;
        left: 3px;
        font-size: 12px;
        color: #fff;
    }
    .tag{
        position: absolute;
        z-index: 1;
        top: 0.11rem;
        right: 0.11rem;
        font-size: 0.2rem;
        color: #fff;
        .cardbofang{
            font-size:0.18rem;
        }
    }
    .swiper-tag{
        position: absolute;
        bottom: 1rem;
        right: 0.11rem;
        .cardbofang1{
            color: #fff;
            opacity: 0.6;
        }
    }    
    .fine-tag{
        position: absolute;
        transform: rotate(-45deg);
        top: 0;
        left: 0;
        .cardhuangguan{
            color: #f39c12;
            font-size: 0.5rem;
        }
    }
    .img-con{
        position: relative;
        height: 0;
        background-color: #aaa;
        border-radius: 0.2rem;
        overflow: hidden;
        .shadow{
            position: absolute;
            height: 2.1rem;
            width: 100%;
            box-shadow: 0 15px 21px -9px #777 inset;
        }
        .dj-name{
            position: absolute;
            bottom: 8px;
            top: 8px;
            color: #fff;
            font-size: 0.2rem;
            width: 100%;
            .ellipsis();
        }
        img {
            width:100%;
        }
    }
    .dec {
        margin-top: 0.2rem;
        font-size:0.23rem;
        line-height: 0.3rem;
        letter-spacing: 1px;
        &.lines{
        .ellipsis();
        height: 0.3rem;
        }
        &.twoLines{
            height: 0.56rem;
            .twoLinesEllipsis();
        }
    }
    .artists{
        .ellipsis();
        .artist{
            font-size: 0.2rem;
            color: #aaa;
            &::after{
                content: "/";
            }
            &:last-child::after{
                content: "";
            }
        }
    }
}
</style>