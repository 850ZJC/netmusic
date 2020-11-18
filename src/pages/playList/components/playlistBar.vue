<template>
  <ul class="wrapper pd23" ref="bars">
    <router-link 
     v-for="(item,index) in list"
     :key="index"
     :to="item.text | setPage"
     exact replace
     class="nav-list">
        {{item.text}}
    </router-link >
    <span class="more">
        <i class="recommend ziyuanxhdqi">
            
        </i>
    </span>
  </ul>
</template>

<script>

export default {
    data(){
        return{
            linkPage:'',
            list:[
                {text:'推荐'},
                {text:'精品'},
                {text:'欧美'},
                {text:'电子'},
                {text:'民谣'},
                {text:'轻音乐'},
                {text:'韩语'},
            ]
        }
    },
    filters:{
        setPage:function(val){
            if(val){
                if(val == '推荐'){
                    val = '/playlist'
                } else if(val == '精品') {
                    val = '/playlist/highquality'
                } else {
                    val = `/playlist/general/${val}`
                }
            }
            return val
        }
    },
    methods:{
        toLink(query){
            this.$emit("toLink",query)
            
        },

        // handleScroll(index){
        //     this.$refs.bars.scrollLeft = index * 85
        // },
        // getPage(val){
        //     let index =this.toLink.indexOf(val)
        //     this.handleScroll(index)
        // }
    }
}
</script>

<style lang="less" scoped>
@import url('~assets/styles/global.less');
.wrapper{
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
    margin-top: 0.16rem;
    overflow-x: auto;
    border-bottom: 1px solid #ddd;
    margin-right: 0.6rem;
    .nav-list{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 1.2rem;
        height: 0.7rem;
        box-sizing: border-box;
        padding: 0.03rem;
        margin: 0 0.2rem;
        color: #000;
        &::before{
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background-color: @bgcolor;
            transform-origin:bottom right ;
            transform: scaleX(0);
            transition: transform 0.5s ease;
        }
        &.ac{
            color: @bgcolor;

        }
        &.ac::before{
            transform-origin:bottom left ;
            transform: scaleX(1);
        }
    }
    .more {
        position: fixed;
        right: 8px;
        top: 1.3rem;
        width: 30px;
        height: 30px;
        .recommend {
            font-size: 0.4rem;
        }
    }
}
::-webkit-scrollbar{
    display: none;
}
</style>