<template>
    <nav class="phone-nav" ref="nav" :class="{height:height === 'all' }">
        <i class="phone iconzuojiantou" @click="returnPage"></i>
        <slot></slot>
    </nav>
</template>

<script>

export default {
    props:{
        nav:{
            type:String,
            default:''
        },
        height:{
            type:String,
            default:"all"
        }
    },
    methods:{
        visible(){
            this.$refs.nav.style.visibility = 'visible'
        },
        hidden(){
            this.$refs.nav.style.visibility = 'hidden'
        },
        returnPage(){
            this.$emit('returnPage')
        }
    }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1351323_oxqdjg3rufq.css");
    .phone-nav{
        display: flex;
        align-items: center;
        &.height{
            height: 1rem;
            line-height: 1rem;
        }
        .phone{
            font-size: 0.7rem;
            margin-right: 5px;
        }
    }
</style>