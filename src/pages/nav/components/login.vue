<template>
  <div class="login-menu">
    <login-top></login-top>
    <login-icons></login-icons>
    <login-icons-top></login-icons-top>
    <login-icons-bottom></login-icons-bottom>
    <login-bottom></login-bottom>
  </div>
</template>

<script>
  import loginBottom from "./login-bottom";
  import loginIconsBottom from "./login-icons-bottom";
  import loginIcons from "./login-icons";
  import loginTop from "./login-top";
  import loginIconsTop from "./login-icons-top";
  import { mapGetters, mapMutations } from 'vuex'


export default {
      data () {
    return {
      // 显式的将获取到的登陆标签设置为Number类型
      loginState: +localStorage.getItem('loginState')
    }
  },
  computed: {
    ...mapGetters(['LEVEL'])
  },
  methods: {
    /**
     * 退出登录
     * 将本地标签设置为 0 意为 false 未登录【但是localStorage获取的是字符串，需要转换为数字】
     * 页面刷新使得信息可以重新获取
     */
    logout () {
      api.logoutFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            console.log(data)
            localStorage.setItem('loginState', 0)
            this.LOGIN_STATE(0)
            location.reload()
          }
        })
    },
    ...mapMutations(['LOGIN_STATE'])
  },
    components:{
        loginBottom,
        loginIconsBottom,
        loginIcons,
        loginTop,
        loginIconsTop,
    },
}
</script>
<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1322263_rqiqhmq0u9o.css");
.login-menu {
  // 左侧侧边栏 宽度设置为6rem
  position: absolute;
  z-index: 99;
  height: 100vh;
  overflow-y: auto;
  top: 0;
  left: 0;
  width: 6rem;
  background: #fff;
}
</style>