import { request } from "../../utils/request";

// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    array: [{
        id: 1,
        message: "酸辣土豆丝"
      },
      {
        id: 2,
        message: "红烧鸡块"
      },
      {
        id: 3,
        message: "红烧鸡块"
      },
      {
        id: 4,
        message: "红烧鸡块"
      },
      {
        id: 5,
        message: "红烧鸡块"
      },
    ]
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onSearch(e) {
     // event.detail 为当前输入的值
     const keyWord = e.detail
     console.log(keyWord)
      wx.request({
      url: 'http://121.43.56.241:8080/CanteenWeb/Store/Like',
      header: {
        token: wx.getStorageSync('token')
      },
      data:{
        keyword: keyWord
      },
      method:"POST",
      success:function (result) {
        console.log(result)
      }
    })  
  },
  onCance() {

  },
})