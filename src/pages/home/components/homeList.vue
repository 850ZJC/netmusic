<template>
  <div class="container pd13">
    <ul>
        <li v-for="(item,index) in homeListContext" 
            :key="index" 
            class="list-item">
            <i class="home" :class="item.icon"></i>
            <div class="bord-bottom wrapper" @click.stop="handleClick(item.text)">
                <span class="list-content">{{item.text}}</span>
                <span class="num" ref="homeNum">({{item.num}})</span>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
  import { homeList } from "@/getInfos/getData";

export default { 
    data(){
        return{
            homeListContext:[],
        }
    },
    props:{
        num:{},
    },
    mounted(){
        this.homeListContext = homeList()
        this.djNum = this.num.djNum
        this.recordNum = this.num.recordNum
    },
    watch:{
        num:{
            deep:true,
            handler(val,oldVal){
                this.recordNum = val.recordNum
                this.djNum = val.djNum
                this.setDate()
            }
        }
    },
    methods:{
        //图片 文字初始化
        setDate(){
            let item = homeList()
            this.$set(item[1],'num',this.recordNum)
            this.$set(item[3],'num',this.djNum)
            this.homeListContext = item
        },
        handleClick(name){
            switch(name){
                case '最近播放':
                this.$router.push('/recently')
                break
                case '我的收藏':
                this.$router.push('/favorite')
                break
                case '我的电台':
                this.$router.push('/dj_sublist')
                break
                // case '最近播放':
                // this.$router.push('/recently')
                // break
                // case '最近播放':
                // this.$router.push('/recently')
                // break
                default:
                break
            }
        }
    },
}
</script>

 <style lang="less" scoped>
@import url("~assets/styles/global.less");
.list-item{
    margin: 0.1rem 0;
    line-height: 0.7rem;
    .flex-between();
    .ripple();
    &:last-child .wrapper::before{
        border: none;
    }
    .list-content{
        font-size: 0.3rem;
    }
    .wrapper{
        flex: 1;
        .num{
            .num();
        }
    }
    .home{
        font-size:0.5rem;
        margin: 0 0.4rem;
    }
}
</style>