// pages/information/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //分类标签
    num: 0,
    // 评分
    grade: '3',
    // logo的url
    logoUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
    // 左侧导航栏被选中的元素
    activeKey: 0,
    // 商品图片的url
    imageURL: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
    // 选中商品的总价值
    sumPrice: "99.00",
    // 选中商品的数量
    dishesNumber: 999,
    // 是否展开全部商品
    showAllSelections: false,
    //每个标签
    titleName: [{
        id: 1,
        titleName: '荤菜'
      },
      {
        id: 2,
        titleName: '素菜'
      },
      {
        id: 3,
        titleName: '主食'
      },
    ],
    //每个标签对应的菜品列表
    titleMenu: [{
      title: '荤菜',
      goods: [{
          imageURL: '',
          menuName: '豆芽',
          price: '5',
          vipPrice: '8',
          monthSales: '11000001',
        },
        {
          imageURL: '',
          menuName: '红烧鸡柳',
          price: '8',
          vipPrice: '6',
          monthSales: '201',
        }
      ]
    },
    {
      title: '素菜',
      goods: [{
          imageURL: '',
          menuName: '猪脚饭',
          price: '12',
          vipPrice: '8',
          monthSales: '111',
        },
        {
          imageURL: '',
          menuName: '红烧鸡柳',
          price: '8',
          vipPrice: '6',
          monthSales: '201',
        }
      ]
    }, 
   ]

  },



  // 触摸左侧菜单导航栏
  handleMenuNavigation(event) {
    this.setData({
      num: event.detail
    })
    console.log(this.data.num)
  },
  // 展开全部以选中的菜品
  spreadAllSelectedGoods(event) {
    this.setData({
      showAllSelections: true
    })
  },

  closeAllSelectedGoods(event) {
    this.setData({
      showAllSelections: false
    })
  },
  // 点击选择好了
  tapSubmit(event) {
    wx.navigateTo({
      url: '/pages/appointment/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 隐藏TabBar
    wx.hideTabBar({})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})