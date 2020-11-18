import axios from 'axios'
import Toast from 'vant'

export function request(config){
  const instance = axios.create({
    baseURL :'http://192.168.8.108:3000/',
    timeout:300000,
    withCredentials : true
    // method:'post',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
  // 2、axios拦截器  请求拦截 响应拦截
  instance.interceptors.request.use(config => {
    if(document.cookie){
      //登陆后，服务器发送一个Cookies 用作登录凭证，保存在cookie上，自动添加到params上
      // config.params.cookie = document.cookie
      console.log('cookie有内容')
    }
    console.log('请求拦截')
    return config
  },err => {
    console.log(err)

  })

  instance.interceptors.response.use(res => {
    if(res.status === 200 ){
      if(res.data.cookie){
        document.cookie = res.data.cookie
        console.log('200，有cookie')
      }else { console.log('200，没有cookie')}
      console.log('==========响应拦截=======')
      return res.data
    }
  },err => {
    console.log(err)
  })

  //3、发送真正的网络请求
  return instance(config)
}