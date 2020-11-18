<template>
  <div class="wrapper">
      <login-nav @returnPage="returnPage">
          <span class="text">{{text}}</span>
      </login-nav>
      <slot></slot>
  </div>
</template>

<script>
import loginNav from "@/base/generalNav"

export default {
    data(){
        return{
            text:'手机号登录',
        }
    },
    components:{
        loginNav
    },
    methods:{
        returnPage(){
            this.$router.go(-1)
        }
    },

}
</script>
<style lang="less" scoped>
.wrapper{
    box-sizing: border-box;
    padding: 0.23rem;
}
.text{
    font-size: 0.4rem;
    vertical-align: 5px;
}
</style>