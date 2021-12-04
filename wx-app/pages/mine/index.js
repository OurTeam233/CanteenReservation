// pages/mine/mine.js
Page({
  data: {},
  // 跳转个人信息编辑页
  toEditor () {
    wx.navigateTo({
      url: '../edit/index'
    })
  },
  // 收藏页面跳转
  collecting () {
    wx.navigateTo({
      url: '../collecting/index',
    })
  },
  //个人中心的实名认证,点击跳转到实名认证
  realName () {
    wx.navigateTo({
      url: '',
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
  }
})