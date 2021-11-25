// pages/community/index.js
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
  onChange (e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch () {
    console.log(this.data.value)
  },
  onClick () {
    console.log(this.data.value)
  },
})