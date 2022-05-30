// pages/logs/log.js
import {
  request
} from '../../utils/request'
Page({
  data: {
    columns1: [],
    columns2: ["请选择学院"],
    class: [],
    showCollege: false,
    showClass: false,
    valueCollege: '',
    valueClass: '',
    suqence: '',
    dataInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    login:false
  },
  onLoad() {
    this.getClass();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  // 弹出学院选项框
  showPopupCollege() {
    this.setData({
      showCollege: true
    });
  },
  // 弹出班级选项框
  showPopupClass() {
    this.setData({
      showClass: true
    });
  },
  // 关闭选项框
  onClose() {
    this.setData({
      showCollege: false,
      showClass: false
    });
  },
  // 选定学院
  tapConfirmCollege(event) {
    //获取根据学院获取班级数据
    const index = event.detail.index;
    const columns2 = this.data.class[index].map(item => {
      return item.name;
    })
    this.setData({
      columns2: columns2,
      valueCollege: event.detail.value
    });
    this.onClose()
  },
  // 选定班级
  tapConfirmClass(event) {
    this.setData({
      valueClass: event.detail.value
    });
    this.onClose()
  },
  // 获取微信账号
  toggleDialog() {
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
  //获取class
  getClass() {
    request({
      url: '/Login/Class'
    }).then(res => {
      const all = res;
      // 获取学院信息
      const college = all.map(item => {
        return item.simpleName;
      });
      //获取班级信息
      const Class = all.map(item => {
        return item.studentClassList;
      });
      this.setData({
        columns1: college,
        class: Class
      })
      //将信息写入缓存中
      wx.setStorageSync('college', college);
      wx.setStorageSync('class', Class)
    })
  },
  // 发送code和输入的数据，获取token
  handleGetUserInfo() {
    const userInfo = this.data.dataInfo;
    userInfo.class = this.data.valueClass
    userInfo.department = this.data.valueCollege
    userInfo.sequence = this.data.suqence
    console.log(userInfo)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 1. 拿到code
        // console.log(res)
        console.log('code:' + res.code)
        const code = res.code
        // 2. 将code发送给服务器，这里就需要我们的接口了S
        const token = wx.request({
          url: 'http://175.178.216.63:8888/CanteenWeb/Login/Student?code=' + code,
          data: {
            userInfo
          },
          method: "POST",
          success: function (result) {
            //json转化
            console.log(result)
            //解构赋值
            console.log(result.data)
            // openid,
            const {
              success,
              token,
              openId,
              studentId
            } = result.data;
            if (success) {
              console.log(success)
              console.log(token)
              console.log(openId)
              wx.setStorageSync("token", token);
              wx.setStorageSync('openId', openId);
              wx.setStorageSync('studentId', studentId);
              wx.switchTab({
                url: '../../pages/index/index',
              })
            }
          },
        });
      }
    });

    wx.setStorageSync('userInfo', userInfo)
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          dataInfo: res.userInfo,
          hasUserInfo: true,
          login:true
        })
        // wx.setStorageSync('dataInfo',this.data.dataInfo)
        // console.log(this.data.dataInfo)
      }
    })
  },


  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      dataInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this.data.dataInfo)
    this.handleGetUserInfo();
  },

})