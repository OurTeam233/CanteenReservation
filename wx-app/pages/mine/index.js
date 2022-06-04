// pages/mine/mine.js
import {
  request
} from '../../utils/request';
Page({
  data: {
    username: '微信用户111',
    signature: null,
    headImgUrl: '../../image/mine/default.png',
    gender: null,
    count:0,
    
  },

  



  onReady(){
    this.getUserInfo();
    // let userInfo = wx.getStorageSync('userInfo');
    // this.setData({
    //   username: userInfo.nickName,
    //   headImgUrl: userInfo.avatarUrl,
    //   gender: userInfo.gender,
    //   signature: userInfo.signature
    // })
  },


  onShow(){
    this.getInfo();
    //获取用户信息
    this.getUserInfo();
  },
  // 跳转个人信息编辑页
  toEditor () {
    wx.navigateTo({
      url: '../edit/index'
    })
  },
  //跳转到聊天页面
  changeToChat(){
    wx.navigateTo({
      url: '../chat/index'
    })
  },
  // 收藏页面跳转
  collecting () {
    wx.navigateTo({
      url: '../collecting/index',
    })
  },
  // 点击跳转到我的关注
  toAttention () {
    wx.navigateTo({
      url: '../../pages/attention/index',
    })
  },
  // 点击跳转到历史订单
  ordered () {
    wx.setStorageSync("orderActivePage", 1);
    wx.switchTab({
      url: '../order/index',
    })
  },
  //我的粉丝
  fans () {
    wx.navigateTo({
      url: '../../pages/fans/index',
    })
  },
  //退出登录
  signOut () {
    console.log('saaaa')
    wx.reLaunch({
      url: '../login/index',
    })
  },

  //跳转到消息界面
  toMsg(){
    wx.navigateTo({
      url: '../../pages/chat/index',
    })
  },

  //跳转到发帖记录
  toPostingRecord(){
    //将自己的studentId传过去
    let studentId = wx.getStorageSync('studentId');
    wx.navigateTo({
      url: '../../pages/minePparticulars/index?studentId=' + studentId,

    })
  },

  //获取未读消息
  getInfo(){
    request({
      url: '/communication/unreadCount',
    }).then(res=>{
      console.log(res)
      this.setData({
          count: res.data
      })
    })
  },


  //获取缓存中的个人信息
  getUserInfo(){
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      username: userInfo.nickName,
      headImgUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      signature: userInfo.signature
      
    })
  },

  
})