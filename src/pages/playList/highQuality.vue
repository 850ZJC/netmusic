<template>
  <div class="pd23">
    <div v-show="!load">
        <div class="wrapper-top">
            <span class="title">全部</span>
            <span class="filter smallTag">
                <i class="recommend shaixuan"></i>
                筛选
            </span>
        </div>
        <div class="img-col">
        <img-card
          v-for="(item, index) in list"
          :key="index"
          :playCount="item.playCount"
          :imgUrl="item.coverImgUrl"
          :albumId="item.id"
          :dec="item.name"
          :fine="true"
        ></img-card>
      </div>
    </div>
  </div>
</template>

<script>
import imgCard from '@/base/imgCard'
import {getHighList} from '@/network/api'

export default {
    components:{imgCard},
    data () {
    return {
      list: [],
      load: true,
      offset:0
    }
  },
  created(){
        this.getData()
    },
    methods:{
        //精品歌单
      async getData(){
          let res = await getHighList()
          this.list = await this.getList(res)
      },
      //数据处理
      getList(res){
        let list = []
          if(res.code === 200){
              this.offset += 1
              list = list.concat([...res.playlists])
              this.load = false
              return list
          }
      },
    }
}
</script>

<style lang='less' scoped>
@import url("~assets/styles/global.less");
.wrapper-top {
  .flex-between();
  margin-top: 0.3rem;
  .shaixuan {
    font-size: 0.23rem;
  }
}

.img-col {
  .flex-between();
  flex-wrap: wrap;
}
</style>