// pages/minePparticulars/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImgUrl: "../../image/mine/default.png",
    username: '系统用户一二三四五六',
    signature: '哈哈哈哈我好牛啊',
    item: 0,
    
  },

  // 标签页的标题栏点击事件
  changeItem: function (e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      item: item
    })
  },
  // 滑动页监听事件
  changeTab: function (e) {
    var current = e.detail.current;
    this.setData({
      item: current
    })
  },
})