// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePage: 0,
  },
  // 加载的时候获取缓存中的页面信息
  onShow () {
    let orderActivePage = wx.getStorageSync("orderActivePage");
    this.setData({
      activePage: orderActivePage
    })
    console.log(this.data.activePage)
  },
  // 标签切换事件
  changePage (event) {
    this.setData({
      activePage: this.data.activePage
    })
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
    });
  },
})