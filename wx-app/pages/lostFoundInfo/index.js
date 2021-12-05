// pages/lostFoundInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: [
      'https://bkimg.cdn.bcebos.com/pic/d1a20cf431adcbef7609c52e60e539dda3cc7cd931ca?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto',
      'https://bkimg.cdn.bcebos.com/pic/b3b7d0a20cf431adcbeffb11877cbbaf2edda3cc32ca?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto',
      'https://bkimg.cdn.bcebos.com/pic/5882b2b7d0a20cf431ad47f7ba435c36acaf2edd33ca?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto'
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