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
    // 获取用户信息
    wx.getUserInfo({
      success: function (res) {
        let userInfo = res.userInfo
        // const {nickName, avatarUrl, gender, province, city, country}
        //   = userInfo
        let nickName = userInfo.nickName
        let avatarUrl = userInfo.avatarUrl
        let gender = userInfo.gender //性别 0：未知、1：男、2：女
        let province = userInfo.province
        let city = userInfo.city
        let country = userInfo.country
        console.log(userInfo)
      }
    })
    // 跳转到首页
    wx.switchTab({
      url: '../../pages/index/index',
    })
  },
})