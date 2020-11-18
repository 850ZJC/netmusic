<template>
    <account-login>
        <div class="wrapper">
            <div class="inp border-bottom">
                <input type="password" 
                    v-model.trim="pwd"
                    placeholder="请输入密码"
                    ref="inputs"
                    autofocus="autofocus"/>
                <span @click="goForget()">忘记密码</span>            
            </div>
            <login-btn @click.native="logon" :title="title"/>
            <alert :is-alert="alert" :alert='alertText'/>
            <loading :is-load="loading"/>
        </div>   
    </account-login>
</template>

<script>
import accountLogin from './components/accountLogin'
import loginBtn from '@/base/button'
import alert from '@/base/alert'
import loading from '@/base/loading'

import {phoneLoginIn,getUidDetail} from '@/network/api'
// import loading from '@/base/loading'


export default {
    components:{
        accountLogin,
        loginBtn,
        alert,
        loading
    },
    data(){
        return{
            pwd:'',
            title:'登录',
            alertText:'用户名错误或密码错误',
            alert:false,
            loading:false,
            flag:true,
            phone:'',
            step1:{},
            step2:{},
            step3:{},
            
        }
    },
    created(){
        this.phone = this.$route.query.phone

    },
    methods:{
        //点击登录
         logon(){
            if(this.flag){
                if(!this.pwd){                      //密码不为空
                    this.alertEvent('请输入密码')   //弹窗 请输入密码
                }else {
                    this.phoneLogin()              //登录                                     
                }
            }
        },
        async phoneLogin(){
            this.onLoading()  //切换登陆中状态
            this.step1 = await phoneLoginIn(this.phone,this.pwd)  //请求数据
            this.step2 = await this.action(this.step1)//检查密码是否正确,进行后续操作
        },
        //
        action(res){
            if(res.code === 200 ){//密码正确
                this.loginingEnd()
                this.setData(res.profile)
                this.setUidDetail(res.profile.userId)
            }else{//请求失败 弹窗提示       
                this.alertEvent(res.msg)
                this.clearInput() 
                this.loginingEnd()//结束登录状态
                this.flag = true
                return flase
            }
        },
        setData(data){
            localStorage.setItem('account',this.phone)
            //存取用户信息
            localStorage.setItem('avatarUrl',data.avatarUrl)//头像
            localStorage.setItem('nickname',data.nickname)//昵称
            localStorage.setItem('accountUID',data.userId)//uid
            localStorage.setItem('loginState',1)//修改登录状态 为1
            //记录到vuex
            this.$store.commit('ACCOUNT_UID',data.userId)//
            this.$store.commit('LOGIN_STATE',1)
            //页面跳转到find
        },
        async setUidDetail(uid){
            this.step3 = await getUidDetail(uid)
            this.step4 = await this.dothis(this.step3)
        },
        dothis(data){
            if (data.code === 200){
                this.$store.commit('SET_LEVEL', data.level)
                localStorage.setItem('level', data.level)
                this.$router.replace('/')
                console.log('跳转了')
            }
        },
        loginingEnd(){
            this.title = '登录'
            this.loading = false
        },
        //忘记密码
        goForget(){
            this.$router.push(`/login/verify?phone=${this.phone}`)
        },
        //清空内容
        clearInput(){
            this.pwd = ''
        },
        //弹窗提示错误 text为错误内容
        alertEvent(text){
            if(this.timer){
                clearTimeout(this.timer)
                this.timer = null
            }
            this.alertText = text
            this.alert = true
            this.timer = setTimeout(() => {
                this.alert = false
            }, 1000);
        },
        onLoading(){
            this.title = '登录中...'
            this.loading = true
            console.log('登录中')
        },
    },
}
</script>

<style lang="less" scoped>
    .wrapper {
    box-sizing: border-box;
    padding: 0.23rem;
    .inp{
        padding-bottom: 0.1rem;
        display: flex;
        align-items: center;
        input[type="password"]{
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