// pages/mine/mine.js
<<<<<<< HEAD
=======

>>>>>>> dev-z
import {
  request
} from '../../utils/request';
Page({
  data: {
    username: '系统用户一二三四五六',
    signature: '哈哈哈哈我好牛啊',
    headImgUrl: '../../image/mine/default.png',
    count:0,
    
  },

  onShow(){
    this.getInfo();
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
    wx.navigateTo({
      url: '../../pages/minePparticulars/index',

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
  }
})