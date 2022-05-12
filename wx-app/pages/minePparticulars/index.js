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

    // miai中的数据
    backgroundImage: [
      '../../image/information/women3.webp',
      '../../image/information/women.webp',
      '../../image/information/women2.webp'
    ],
    indicatorDots: true,
    vertical: true,
    autoplay: false,
    interval: 2000,
    duration: 2000,
    time: '2020.2.7',

    person: {
      name: '海的味道我知道',
      age: '21',
      sex: '女',
      height: '167cm',
      weight: '56kg',
      address: '江苏南通',
      type: '可爱',
      manifesto: '我能享受平淡，但我也能够经得起风浪',
      hobby:['钢琴','写作业'],
    },
    person1: {
      age: '21~24',
      sex: '男',
      height: '176cm以上',
      condition:'有趣的灵魂',
    }
    
  },


  // miai中的函数
  onLoad(){
    wx.loadFontFace({
      family: 'webfont',
      source: 'url("//at.alicdn.com/t/webfont_1f7b3qbimiv.eot")',
      success: function (res) {
          console.log(res.status) //  loaded
      },
      fail: function (res) {
          console.log(res.status) //  error
      },
      complete: function (res) {
          console.log(res.status);
      }
  });
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },




  // 标签页的标题栏点击事件
  changeItem: function (e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      item: item
    })
  },
  // 滑动页监听事件
  changeTab: function (e) {
    let current = e.detail.current;
    this.setData({
      item: current
    })
  },



})