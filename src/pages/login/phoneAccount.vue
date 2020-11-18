<template>
    <account-login>
        <div class="wrapper">
            <div class="info">未注册手机号登录后将自动创建账号</div>
            <div class="inp border-bottom" :style="{opacity}">
                <span>+86</span>
                <input type="text" 
                    v-model.trim="phone"
                    placeholder="请输入手机号"
                    ref="inputs"
                    autofocus="autofocus"
                    @input="canShow"/>
                <i v-show="isShow" class="phone iconguanbi" @click="clearInput"></i>
            </div>
            <login-btn @click.native="clickEvent"/>
            <alert :is-alert="alert" :alert='text'/>
      </div>
  </account-login>
</template>

<script>
import accountLogin from './components/accountLogin'
import loginBtn from '@/base/button'
import alert from '@/base/alert'
import {phoneResistered} from '@/network/api'


export default {
    components:{
        accountLogin,
        alert,
        loginBtn
    },
    data(){
        return{
            phone:'',
            isShow:false,
            opacity:0.5,
            alert:false,
            timer:null,
            flag:true,
            number:{},
            text:"请输入正确号码",
            data:{}
        }
    },
    methods:{
        //获取焦点
        changFocus(){
            this.$nextTick(x=>{
                this.$refs.inputs.focus()
            })
        },
        //判定内容是否合法
        contextIsTrue(text){
            let exp = /^1[345789]\d{9}$/
            return exp.test(text)
        },
        //清除号码
        clearInput(){
            this.phone = ''
            this.canShow()
        },
        //关闭图标是否显示
        canShow(){
            this.isShow = this.phone
            if(this.isShow) {
                this.opacity = 1
            } else {
                this.opacity = 0.5
            }
        },
        //按钮点击事件
        clickEvent(){
            if(this.flag){
                //点击一次按钮后，关闭点击功能
                this.flag = false
                //判断电话号码格式是否正确，
                if(this.contextIsTrue(this.phone)){
                    this.loginIn(this.phone)
                }else{
                    //格式不正确，则清空内容，弹出提示
                    this.clearInput()
                    this.flag = true
                    this.alertEvent("请输入正确号码")
                }
            }
        },
        //弹窗提示号码错误
        alertEvent(){
            if(this.timer){
                clearTimeout(this.timer)
                this.timer = null
            }
            // this.alerttext = text
            this.alert = true
            this.timer = setTimeout(() => {
                this.alert = false
            }, 1000);
        },
        //电话格式正确后，与服务器通信，进行登录操作
        async loginIn(num){
            this.data = await phoneResistered(num)
            .then(res=>{
                if(res.code !== 200 ){//请求失败，弹出提示
                    this.alertEvent('请求失败，请稍后重试')
                }else if(res.exist !== -1 ){//已注册，跳转密码页面
                    this.$router.push({
                        path:'/login/pwd',
                        query:{phone : num}
                    })
                }else if(res.exist === -1){//未注册，跳转验证码页面
                    this.$router.push({
                        path:'/login/verify',
                        query:{phone : num}
                    })
                }
                this.flag = true
            })
            
        },
        //可以增加一个自动填写号码，在localStroge中进行存取
        autoFill(){
            let phone =localStorage.getItem('account')
            if(phone){
                this.phone = phone
                this.canShow()
                return true
            }
            return false
        }

    },
    destroyed(){
        clearTimeout(this.timer)
    },
    created(){
        //设置自动填写的聚焦
        if(this.autoFill){
            this.changFocus()
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper {
    box-sizing: border-box;
    padding: 0.23rem;
    .info{
        width: 100vw;
        height: 2rem;
        display: flex;
        align-items: center;
        font-size: small;
        color: #ccc;
    }
    .inp{
        padding-bottom: 0.1rem;
        display: flex;
        align-items: center;
        input[type="text"]{
            height: 16px;
            padding: 4px 0px;
            font-size: 0.24rem;
            margin-left: 10px;
            flex: 1;
            caret-color: red;
        }
    }
    .border-bottom::before{
        border-color: #aaa;
    }
}
</style>