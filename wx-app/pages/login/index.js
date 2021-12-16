// pages/logs/log.js
import {
  request
} from '../../utils/request'
Page({
  data: {
    columns1: [],
    columns2:["请选择学院"],
    class:[],
    showCollege: false,
    showClass: false,
    valueCollege: '',
    valueClass: '',
    suqence: ''
  },
  onLoad(){
    this.getClass();
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
    // console.log(event.detail.index)
    //获取根据学院获取班级数据
    const index=event.detail.index;
    const columns2=this.data.class[index].map(item=>{
      return item.name;
    })
    // console.log(index)
    // console.log(columns2)
    // console.log(this.data.class)
    this.setData({
      columns2:columns2,
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
  getClass(){
    request({ 
      url: '/Login/Class'
    }).then(res=>{
      // console.log(res);
      const all = res;
      // console.log(all);
      // 获取学院信息
      const college = all.map(item=>{
        return item.simpleName;
      });
      //获取班级信息
      const Class = all.map(item=>{
        return item.studentClassList;
      });
      this.setData({
        columns1:college,
        class:Class
      })
      //将信息写入缓存中
      wx.setStorageSync('college', college);
      wx.setStorageSync('class', Class)
      // console.log(college);
      // console.log(this.data.class);

    })
  },
  // 发送code和输入的数据，获取token
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
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
          url: 'http://121.43.56.241:8080/CanteenWeb/Login/Student?code=' + code,
          data: {
            userInfo
          },
          method:"POST",
          success: function (result) {
            //json转化
            console.log(result)
            //解构赋值
            console.log(result.data)
             // openid,
            const {
              success,
              token,
              openId
            } = result.data;
            if (success) {
              console.log(success)
              console.log(token)
              console.log(openId)
              wx.setStorageSync("token", token);
              wx.setStorageSync('openId', openId)
              wx.switchTab({
                url: '../../pages/index/index',
              })
            }
          },
        });
      }
    });
  }
})