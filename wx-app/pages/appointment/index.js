// pages/appointment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
    showSelectTime: false,
    carts:[],//购物车
    sumPrice:0,//购物总金额
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate(),
    currentHour: new Date().getHours(),
    currentMinute: new Date().getMinutes(),
    selectDate: '',
    startHour: '00',
    startMin: '00',
    endHour: '00',
    endMin: '00',
    formatter (type, value) {
      if (type === 'hour') {
        return `${value}时`;
      }
      if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
    notesValue: '',

  },
  //事件加载
  onLoad(){
    //获取购物车数据
    const carts = wx.getStorageSync('carts');
    const sumPrice = wx.getStorageSync('sumPrice');
    this.setData({
      carts:carts,
      sumPrice:sumPrice,
    })
  },
  // 点击打开时间选择栏
  selectTime: function () {
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
  // 点击选择时间完成按钮
  tapConfirm: function (event) {
    const [startHour, startMin] = event.detail.split(':')
    let afterDate = new Date()
    afterDate.setHours(startHour)
    afterDate.setMinutes(Number.parseInt(startMin) + 30)
    // console.log(afterDate)
    const endHour = String(afterDate.getHours()).padStart(2, '0')
    const endMin = String(afterDate.getMinutes()).padStart(2, '0')
    this.setData({
      startHour,
      startMin,
      endHour,
      endMin,
      showSelectTime: false
    })

  },
  // 输入备注
  inputNotes: function (event) {
    this.setData({
      notesValue: event.detail
    })
  },
  // 底部栏
  tapSubmit: function (event) {
    wx.switchTab({
      url: '/pages/order/index'
    })
    // TODO 提交成功代码
  }
  //监听步进器
  
})