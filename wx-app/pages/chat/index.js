// pages/chat/index.js
import {
  request
} from '../../utils/request';
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    person: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getInfo();
  },
  //跳转页面并传递参数给下一个页面
  changeToChatinfo(e) {
    console.log(e.currentTarget.dataset)
    var studentId = e.currentTarget.dataset.studentid
    var image = e.currentTarget.dataset.image
    var nick =e.currentTarget.dataset.nike
    wx.navigateTo({
      url: '../chatInfo/index?studentId=' + studentId+'&image='+image+'&nike='+nick,
    })
  },
  // 获取所有消息信息，头像，昵称，时间，未读信息量，最近消息,用户id
  getInfo() {
    request({
      url: '/communication/chatUser/list',
    }).then(result => {
      console.log(result);
      result.data.forEach(item => {
        let time = util.getDistanceDay(new Date(item.lastMsgTime))
        item.lastMsgTime=time
      });

      this.setData({
        person: result.data
      })
      console.log(this.data.person)
    })
  },

})