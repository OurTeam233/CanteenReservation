// pages/mine/mine.js
Page({
  data: {},
  //个人中心的消息,点击跳转到我的消息
  info () {
    wx.navigateTo({
      url: '',
    })
  },
  //个人中心的实名认证,点击跳转到实名认证
  realName () {
    wx.navigateTo({
      url: '',
    })
  },
  //个人中心的我的余额,点击跳转到我的余额
  restMoney () {
    wx.navigateTo({
      url: '',
    })
  },
  //个人中心的意见反馈,点击跳转到意见反馈
  view () {
    wx.navigateTo({
      url: '',
    })
  },
  //我的地址
  addr () {
    wx.navigateTo({
      url: '',
    })
  },
  //退出登录
  signOut () {
    console.log('saaaa')
    wx.navigateTo({
      url: '../login/index',
    })
  }
})