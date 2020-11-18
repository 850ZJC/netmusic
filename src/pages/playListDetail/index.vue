<template>
  <!-- 通过传递参数给子组件，标题，加载样式，图片链接，歌单名称，作者头像，作者昵称，歌单介绍，评论数，分享数，歌单歌曲数，收藏数，是否收藏 -->
  <song-list-info
    :title="title"
    :load="load"
    :imgUrl="albumInfo.coverImgUrl ? albumInfo.coverImgUrl : albumInfo.album ? albumInfo.album.picUrl : ''"
    :albumTitle="albumInfo.name ? albumInfo.name : albumInfo.album ? albumInfo.album.name : ''"
    :albumId="albumId"
    :idxId="idxId"
    :idxComId="idxComId"
    :dishId="dishId"
    :creatorImgUrl="albumInfo.creator ? albumInfo.creator.avatarUrl : albumInfo.album ? albumInfo.album.artist.picUrl:''"
    :author="albumInfo.creator ? albumInfo.creator.nickname : albumInfo.album ? albumInfo.album.artist.name : ''"
    :description="albumInfo.description ? albumInfo.description : albumInfo.album ? albumInfo.album.description : ''"
    :commentCount="albumInfo.commentCount ? albumInfo.commentCount : albumInfo.album ? albumInfo.album.info.commentCount : 0"
    :shareCount="albumInfo.shareCount ? albumInfo.shareCount : albumInfo.album ? albumInfo.album.info.shareCount : 0"
    :trackCount="albumInfo.trackCount ? albumInfo.trackCount : albumInfo.album ? albumInfo.album.size : 0"
    :subscribedCount="albumInfo.subscribedCount"
    :subscribed="albumInfo.subscribed"
    :isSubIn="albumInfo.subscribed"
    :playCount="albumInfo.playCount"
    @startPlayAll="startPlay"
  >
    <song-list
      v-for="(item, index) in albumInfo.tracks || albumInfo.songs"
      :key="index"
      :songName="item.name"
      :artists="item.ar"
      :albumName="item.al.name"
      :num="index + 1"
      @beginSong="setAudioList(item, index)"
      :nowSong="item.id === audioSong.id"
    ></song-list>
  </song-list-info>
</template>

<script>
import songList from './components/songList'
import songListInfo from './components/songListInfo'
import {getListDetail} from '@/network/api'
import { mapActions, mapGetters } from 'vuex'

export default {  
  data(){
    return{
      albumInfo:{},  
      load: true,
      albumId: 0,
      dishId: 0,
      idxId: 0,
      idxComId: 0,
      title: ''
    }
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  components:{
    songList,songListInfo
  },
  created(){
    this.loading()
  },
  activated(){
  },
    destroyed () {
    // 存储信息的数组
    this.albumInfo = []
    // 用来定义是否显示load加载组件
    this.load = true
  },
  methods:{
    ...mapActions(['selectPlay', 'startPlayAll']),
    setAudioList (item, index) {
      this.selectPlay({
        list: this.albumInfo.tracks,
        index
      })
    },
    startPlay () {
      this.startPlayAll({
        list: this.albumInfo.tracks
      })
    },
    loading(){
    this.load = true
    this.albumInfo = []
    // this.albumId = this.$route.querys.albumId
    // this.idxId = this.$route.params.idxId
    // this.dishId = this.$route.params.dishId
    if(this.$route.querys.albumId){
      this.getData()//歌单
    }
    // else if(this.idxId !== 0){
    //   //排行榜
    // }else if(this.dishId !== 0){
    //   //全部新碟
    // }
    },

    async getData(){
      await getListDetail(this.$route.querys.albumId)
      .then(res =>{
        if(res.code === 200){
          this.albumInfo = res.playlist
        }else{
          console.log(res.msg)
        }
      this.load = false
      })
    },
    getList(res){

    }
  },
  
}
</script>