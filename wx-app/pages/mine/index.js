// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  editProfile: function () {
    wx.navigateTo({
      url: '/pages/editProfile/index',
    })
  }
})