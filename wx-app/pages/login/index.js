// pages/logs/log.js
Page({
  data: {
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    showCollege: false,
    showClass: false,
    valueCollege: '',
    valueClass: '',
  },
  // 弹出学院选项框
  showPopupCollege () {
    this.setData({ showCollege: true });
  },
  // 弹出班级选项框
  showPopupClass () {
    this.setData({ showClass: true });
  },
  // 关闭选项框
  onClose () {
    this.setData({
      showCollege: false,
      showClass: false
    });
  },
  // 选定学院
  tapConfirmCollege (event) {
    this.setData({ valueCollege: event.detail.value });
    this.onClose()
  },
  // 选定班级
  tapConfirmClass (event) {
    this.setData({ valueClass: event.detail.value });
    this.onClose()
  },
  // 获取微信账号
  toggleDialog () {
    // 获取用户code
    wx.login({
      timeout: 10000,
      success: (result) => {
        console.log(result);
      },
      fail: (err) => {
        console.log(err);
      }
    });
    // 跳转到首页
    wx.switchTab({
      url: '../../pages/index/index',
    })
  },
  // 获取昵称和头像
  handleGetUserInfo (e) {
    console.log(e);
    const { userInfo } = e.detail;
    console.log(userInfo)
    wx.navigateBack({
      delta: 1
    });
  }
})