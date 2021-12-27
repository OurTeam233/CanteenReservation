// pages/lostFoundInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: [
      '../../image/community/phone1.webp',
      '../../image/community/phone2.webp',
    ],
    phoneNumber: 192168000001,
    wxNumber: 'wx123456789',
  },
  // 预览图片
  tapImage (event) {
    // 帖子编号
    const { index } = event.target.dataset
    wx.previewImage({
      current: this.data.photo[index],
      urls: this.data.photo
    })
  },
  // 复制手机号
  copyPhoneNumber (event) {
    wx.setClipboardData({
      data: this.data.phoneNumber + "",
    })
  },
  // 复制微信号
  copyWxNumber (event) {
    wx.setClipboardData({
      data: this.data.wxNumber,
    })
  }
})