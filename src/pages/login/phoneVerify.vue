<template>
  <account-login>
    <div class="wrapper">
      <verify-info></verify-info>
      <verify-code></verify-code>
    </div>
  </account-login>
</template>

<script>
import accountLogin from './components/accountLogin'
import verifyInfo from './components/verifyInfo'
import verifyCode from './components/verifyCode'

export default {
  components:{
    accountLogin,
    verifyInfo,
    verifyCode
  },
  created(){
    this.phone = this.$route.query.phone
  },
  data(){
    return{
      phone:''
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  box-sizing: border-box;
  padding: 0.23rem;
}
</style>