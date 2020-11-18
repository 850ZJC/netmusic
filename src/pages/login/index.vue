<template>
  <div class="wrapper" @click="goBack">
    <div class="phoneLogin" @click.stop="goPhone">
        手机号登录
    </div>    
  </div>
</template>

<script>

export default {
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    goPhone(){
      this.$router.push('/login/phone')
    }
  },
}
</script>

<style lang="less" scoped>
@import url("~assets/styles/global.less");
.wrapper{
  width: 100vw;
  height: 100vh;
  background-color: @bgcolor;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2rem;
  box-sizing: border-box;
  .phoneLogin{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5.3rem;
    height: 0.8rem;
    border-radius: 0.4rem;
    background-color: #fff;
    color: @bgcolor;
    font-weight: 500;
    letter-spacing: 3px;
  }
}
</style>