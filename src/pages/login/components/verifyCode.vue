<template>
  <div class="code">
    <van-password-input
    :value="value"
    :length="4"
    :gutter="15"
    :focused="showKeyboard"
    @focus="showKeyboard = true"/>
    <van-number-keyboard
    :show="showKeyboard"
    @input="onInput"
    @delete="onDelete"
    @blur="showKeyboard = false"/>
  </div>
</template>

<script>
import { Toast } from "vant";
import {verifyCaptcha,sentCaptcha} from '@/network/api'

export default {
  data(){
    return{
      value:'',
      showKeyboard:true,
      phone:'',
      date:{}
    }
  },
  methods:{
    async onInput(key){
      this.value =(this.value + key ).slice(0,4)
      if(this.value === 4){
        //验证
        this.date = await verifyCaptcha(this.phone,this.value)
        this.date = await verify(data)
      }
    },
    verify(data){
      if(data.code === 200){
        Toast('验证成功')
      }else {
        Toast('验证失败')
        this.value = ''
      }
    },
    onDelete(){
      this.value = this.value.slice(0,this.value.length-1)
    }
  },
  created(){
    this.phone = this.$route.query.phone
  }
}
</script>

<style lang="less" scoped>
  .code /deep/ li{
    border-bottom: 2px solid #aaa;
  }
</style>