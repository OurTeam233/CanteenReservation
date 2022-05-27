// pages/mine/mine.js
Page({
  data: {
    username: '系统用户一二三四五六',
    signature: '哈哈哈哈我好牛啊',
    headImgUrl: '../../image/mine/default.png',
    
  },
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
      url: '../../pages/chatInfo/index',
    })
  }
})