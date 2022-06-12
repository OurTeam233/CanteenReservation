// pages/lostFoundInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictureList: [],
    phone: '',
    wxNumber: '',
    queryId: '',
    itemName: '',
    description: '',
    wechat: '',
    startDate:'',
    address: '',
    typeName:''
  },
  lostFoundInfo: [],
  onLoad (query) {
    // 获取页面参数
    console.log(query.id)
    let id = query.id
    this.setData({
      queryId: id
    })
    this.lostFoundInfo = wx.getStorageSync("lostFoundInfo")
    console.log(this.lostFoundInfo)

  },
  onReady () {
    console.log("ready")
    let pictureList = []
    this.lostFoundInfo.pictureList.forEach(v => {
      pictureList.push(v.pictureUrl)
    })
    this.setData({
      pictureList,
      phone: this.lostFoundInfo.phone,
      wxNumber: this.lostFoundInfo.wxNumber,
      itemName: this.lostFoundInfo.itemName,
      description: this.lostFoundInfo.description,
      wechat: this.lostFoundInfo.wechat,
      startDate: this.lostFoundInfo.startDate,
      address: this.lostFoundInfo.address
    })
  },
  // 预览图片
  tapImage (event) {
    // 帖子编号
    const { index } = event.target.dataset
    wx.previewImage({
      current: this.data.pictureList[index],
      urls: this.data.pictureList
    })
  },
  // 复制手机号
  copyPhoneNumber (event) {
    wx.setClipboardData({
      data: this.data.phone + "",
    })
  },
  // 复制微信号
  copyWxNumber (event) {
    wx.setClipboardData({
      data: this.data.wxNumber,
    })
  }
})