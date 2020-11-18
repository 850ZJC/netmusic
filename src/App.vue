<template>
  <div id="app" >
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name:'App',
  components:{
    //playSong
  },
}
</script>

<style lang="less">
#app{
  height: 100vh;
  width: 100vw;
}
</style>
