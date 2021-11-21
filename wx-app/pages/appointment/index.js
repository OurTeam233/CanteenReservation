// pages/appointment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
    showSelectTime: false,
    selectDate: new Date().getTime(),
    startHour: new Date().getHours(),
    startMin: new Date().getMinutes(),
  },
  // 监听时间选择器
  onInput (event) {
    this.setData({
      selectDate: event.detail,
    });
  },
  // 点击打开时间选择栏
  selectTime: function () {
    this.setData({
      startHour: new Date().getHours(),
      startMin: new Date().getMinutes(),
    })
    this.setData({
      showSelectTime: true
    })
  },
  // 关闭时间选择栏
  closeSelectTime: function () {

    this.setData({
      showSelectTime: false
    })
  },
})