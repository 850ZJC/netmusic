import {request} from './require'
//=======================发现页面
// 轮播图
export function getBanner(){
  return request({
    url:'/banner?type=1',
  })
}
//歌单分类
export function getCatlist(){
  return request({
    url:`/playlist/catlist`,
  })
}
// 推荐歌单，歌单广场
export function getRageList(limit=30,offset=1,cat,order='hot',){
  return request({
    url:'/top/playlist',
    params:{
      limit,//数量
      order,//最热or最新
      offset,//分页
      cat//分类
    }
  })
}
//每日推荐歌单
export function getRecSongList(){
  return request({
    // url:`/recommend/resource`,
    url:`/personalized?limit=30`,
  })
}
//精品歌单
export function getHighList(before,cat,limit=30){
  return request({
    // url:`/recommend/resource`,
    url:`/top/playlist/highquality`,
    params:{
      before,cat,limit
    }
  })
}

// 发现页新碟
export function getNewDish(limit=10,offset=0,id){
  return request({
    url:`/top/album`,
    params:{
      limit,
      offset,
      id
    }
  })
}
//发现页面新歌 type:0 type: 地区类型 id
export function getNewSong(type=0){
  return request({
    url:`/top/song?type=${type}`,
  })
}


//======================登录页
  //手机号码登录
  export function phoneLoginIn(phone,password){
    return request({
      url:`/login/cellphone`,
      params:{
        phone,
        password,
      }
    })
  }
  //号码是否被注册
  export function phoneResistered(num){
    return request({
      url:`/cellphone/existence/check?phone=${num}`,
    })
  }
  /**注册或修改密码
  *captcha: 验证码
  *phone : 手机号码
  *password: 密码
  *nickname: 昵称
  */
  export function register(phone,captcha,password,nickname){
    return request({
      url:`/register/cellphone`,
      params:{
        phone,captcha,password,nickname
      }
    })
  }

  //发送验证码
  export function sentCaptcha(phone){
    return request({
      url:`/captcha/sent?phone=${phone}`,
    })
  }

  //验证
  export function verifyCaptcha(phone,captcha){
    return request({
      url:`/captcha/verify?phone=${phone}captcha=${captcha}`,
    })
  }
  //登陆后 获取用户信息
    export function getUidDetail(uid){
      return request({
        url:`/user/detail?uid=${uid}`,
      })
    }
  //签到
  export function signIn(type=0){
    return request({
      url:`/daily_signin?type=${type}`,
    })
  }


// 歌单详情页 歌单信息
export function getListDetail(id){
  return request({
    url:`/playlist/detail?id=${id}`,
  })
}
// 歌曲信息
export function getSongDetail(id){
  return request({
    url:`/song/url?id=${id}`,
  })
}

// 推荐页面MV
export function getMvList(){
  return request({
    url:'/personalized/mv',
  })
}
// 歌单页面数据
export function getPlayList(offset,limit){
  return request({
    url:'/top/playlist',
    params:{
      offset,
      limit
    },
  })
//

}