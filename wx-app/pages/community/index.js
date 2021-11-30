// pages/community/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePage: 1,
    imageList: [
      'https://img.yzcdn.cn/vant/cat.jpeg',
    ],
    imageURL: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
    show: true,
    // true为寻物启事，false为失物招领
    activeSearch: true,
  },

  // 标签切换事件
  changePage (event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  onClick () {
    console.log(this.data.value)
  },
  // 点击失物招领
  tapSearch (event) {
    this.setData({
      activeSearch: false,
    })
  },
  // 点击寻物启事
  tapFind (event) {
    this.setData({
      activeSearch: true,
    })
  },
  // 搜索框搜索时触发
  onSearch () {
    console.log(this.data.value)
  },
  // 搜索框聚焦时触发
  focusSearch () {
    this.setData({
      show: false
    })
  },
  // 搜索框失焦时触发
  blurSearch () {
    this.setData({
      show: true
    })
  },
})