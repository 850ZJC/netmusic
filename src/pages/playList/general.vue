<template>
  <div class="wrapper pd23">
    <div class="img-col" v-show="!load">
      <img-card
        v-for="(item, index) in list"
        :key="item.id + index"
        :playCount="item.playCount"
        :imgUrl="item.coverImgUrl"
        :dec="item.name"
        :albumId="item.id"
      ></img-card>
    </div>
    <!-- <page-loading v-show="load"></page-loading> -->
  </div>
</template>

<script>
import imgCard from '@/base/imgCard'
import {getRageList} from '@/network/api'

export default {
    components:{imgCard},
    data () {
    return {
      list: [],
      load: true,
      offset:1
    }
  },
    beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.load = true
    console.log(to, from)
    this.cat = to.params.id
    console.log(this.cat)
    this.getData(this.offset,this.cat)
    next()
  },
  created(){
        this.getCat()
        this.getData(this.offset,this.cat)
    },
    methods:{
      getCat(){
        this.cat = this.$route.params.id
      },
        //精品歌单
      async getData(offset,cat){
          let res = await getRageList(30,offset,cat)
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

.img-col {
  .flex-between();
  flex-wrap: wrap;
}
</style>