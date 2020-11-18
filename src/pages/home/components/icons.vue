<template>
  <div class="wrapper border-bottom" >
      <div class="container">
          <ul class="icons-group">
              <li 
                v-for="(item,index) in homeIcons"
                :icons="item"
                :key="index"
                is="icon"
                :width="true"
                :bgcolor="true">
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
  import { homeIcons } from "@/getInfos/getData";
  import icon from "@/base/icon";

export default {
    data(){
        return{
            homeIcons
        }
    },
    components:{
        icon
    },
    mounted(){
        this.homeIcons = homeIcons()
    }
}
</script>

<style lang="less" scoped>
@import url("~assets/styles/global.less");
.wrapper {
    box-sizing: border-box;
    padding: 0.2rem 0 0;
    overflow: hidden;
    height: 1.8rem;
    .container{
        overflow-x: scroll;
        .icons-group{
            height: 1.5rem;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            width: auto;
            min-width: 100%;
        }
    }
    ::-webkit-scrollbar{
        display: none;
    }
}
</style>