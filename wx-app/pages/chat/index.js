// pages/chat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person:[
      {
        nike:"灯火",
        img:"../../image/headPhone/head1.webp",
        time:"2022.05.06",
        unread:13,
        words:"你的过怎么卖的"
      },
      {
        nike:"蓝色大海的泥土",
        img:"../../image/headPhone/head3.webp",
        time:"周一",
        unread:8,
        words:"剪一段烛光,独坐一隅,梦一段红尘,思忆一番。其实,回不去的日子犹如倒映在天蓝色湖面的孤单的影子。"
      },
      {
        nike:"珊瑚",
        img:"../../image/headPhone/head2.webp",
        time:"周三",
        unread:1,
        words:"你的过怎么卖的"
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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
  changeToChatinfo(){
    wx.navigateTo({
      url: '../chatInfo/index',
    })
  }
})