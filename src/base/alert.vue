<template>
  <div>
    <transition>
        <div class="alert" v-show="isAlert">
            {{alert}}
        </div>
    </transition>
  </div>
</template>

<script>

export default {
    props:{
        alert:String,
        isAlert:Boolean,
    },

}
</script>

<style lang="less" scoped>
.alert{
    position: fixed;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.13rem;
    background-color: rgba(170,170,170,0.6);
    font-size: smaller;
    border-radius: 8px;
}
.v-enter-active,
.v-leave-active{
    transition: opacity 0.5s;
}
.v-enter,
.v-leave-to{
    opacity: 0;
}
</style>