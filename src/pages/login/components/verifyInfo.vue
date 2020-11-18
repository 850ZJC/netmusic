<template>
  <div class="container"> 
      <div class="info">
          <p>验证码已发送至</p>
          <p>
              <span>+86</span>
              <span>
                  {{phone1}}
                  <span class="middle">****</span>
                  {{phone2}}
              </span>
          </p>
      </div>
      <div class="renew" @click="reSend">重新获取</div>
  </div>
</template>

<script>
import {sentCaptcha} from '@/network/api'

export default {
    data(){
        return{
            phone:'',
            phone1:'131',
            phone2:'1111',
            date:{}
        }
    },
    watch:{
        'phone1':{
            handler:function(val){
                this.phone1 = val
            }
        },
        'phone2':{
            handler:function(val){
                this.phone2 = val
            }
        }
    },
    methods:{
        //发送验证码
        async reSend(){
            this.date = await sentCaptcha(this.phone)
        },
        getNumber(){
            this.phone = this.$route.query.phone
            this.phone1 = Array.from(this.phone).slice(0,3).join('')
            this.phone2 = Array.from(this.phone).slice(-4).join('')
        },

    },
    created(){
        this.getNumber()
        this.reSend()
    },
}
</script>
<style lang="less" scoped>
.container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    p:first-child{
        margin-bottom: 0.3rem;
    }
    span{
        color: #ccc;
        .middle{
            vertical-align: -3px;
        }
    }
    .renew{
        color:#1a73e8;
        cursor: pointer;
    }
}
</style>