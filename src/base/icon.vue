<template>
  <div class="icon-list" :class="{width}" @click="linkTo">
    <div class="icon" :class="{bgcolor}">
        <i :class="icons.icon"></i>
        <slot></slot>
    </div>
    <span class="icon-text">{{icons.text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    icons: {
      type: [Object, Array]
    },
    width: {
      type: Boolean
    },
    bgcolor: {
      type: Boolean
    }
  },
    methods:{
        linkTo(){
            this.$emit('goPage')
        }
    },
}
</script>

<style lang="less" scoped>
//我的页面
.width{
    min-width:1.6rem;
    &:last-of-type > .icon{
        background: #ccc;
    }
}
.icon-list {
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    color:#000;
    .bgcolor{
        background:linear-gradient(to right,#ff5a4c,#ff1d11)
    }
    .icon{
        width:0.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 50%;
        text-align: center;
        position: relative;
        color: #fff;
        .home{
            font-size: 0.4rem;
        }
        .find{
            font-size: 0.5rem;
        }
        .login{
            font-size: 0.4rem;
            background-color: transparent;
            color: #ff1d11;
        }
        .dj{
            font-size: 0.4rem;
        }
    }
    .icon-text{
        font-size: 0.24rem;

    }
}

</style>