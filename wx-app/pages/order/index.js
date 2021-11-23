// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePage: 1,
  },
  // 标签切换事件
  changePage (event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
})