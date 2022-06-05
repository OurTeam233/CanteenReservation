// pages/miaipost/index.js
var util = require('../../utils/util');
const {
  uploadImage
} = require('../../utils/uploadImage.js')
import {
  request
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 1张图片
    picturePathLocal: "",
    showPic: true,
    itemhide: false,
    // 多张图片
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    time: '',
    type:3,
    allMoney: 0,
    describle: '',
    thingName: '',

    // 图片
    imageObject: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.currentPage
    let that = this;

    setInterval(function () {
      that.setData({
        type,
        time: util.formatTime(new Date())
      });
    }, 1000);
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.picturePathLocal,
    })
  },
  // 删除图片
  clearImg: function (e) {
    let that = this;
    that.setData({
      showPic: true,
      itemhide: false,
      picturePathLocal: ""
    })
  },
  //选择图片
  choosePic: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认1
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        that.setData({
          showPic: false,
          itemhide: true,
          picturePathLocal: res.tempFilePaths[0]
        })
      }
    })
  },
  /**
   * 上传图片
   * @param {*} e 
   */
  upload: function (e) {
    var that = this;
    // console.log("上传成功",that.data.picturePathLocal)
    wx.uploadFile({
      url: '上传的地址', //仅为示例，非真实的接口地址
      filePath: that.data.picturePathLocal,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success(res) {
        console.log("上传成功", res)
        // const data = res.data
        //do something
      },
      fail(e) {
        console.log("上传失败", e)
      }

    })
  },
  /*********1、上传单张图片******************end */

  /*********2、上传多张图片******************begin */
  //展示图片
  showImg_d: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  // 删除图片
  clearImg_d: function (e) {
    var nowList = []; //新数据
    var uploaderList = this.data.uploaderList; //原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //选择图片
  choosePic_d: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
      }
    })
  },

  //点击获取当前点击时间
  getTime: function () {
    let that = this;
    let currentTime = util.formatTime(new Date());
    that.setData({
      time: currentTime
    })
  },


  //提交
  submit() {
    let used = {}
    //获取图片
    let imageObject = this.data.imageObject
    let fileList = []
    imageObject.forEach(item => {
      fileList.push(item.imageURL)
    });

    let type = this.data.type
    console.log(type)
    used.name = this.data.thingName
    used.price = this.data.allMoney
    used.description = this.data.describle
    let token = wx.getStorageSync('token')

    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Post/used',
      data: {
        type:type,
        used,
        fileList
      },
      header: {
        token
      },
      method: "POST",
      success: (result) => {
        console.log(result)
        wx.navigateBack({
          delta: 1,//上一个页面
          success: () => {
              //调用前一个页面的方法takePhoto()。
              prevPage.takePhoto()
          }
      });
      },
      error: (result) => {
        console.log(result)
        console.log("失败了")
      }
    })
  },



  //使用七牛云上传数据
  uploadToQn(event) {
    const {
      file
    } = event.detail;
    var that = this
    let imageUrl = uploadImage(that, file)
    console.log(imageUrl)
  },
  // 上传图片文件
  afterRead(event) {
    let that = this
    let imageObject = that.data.imageObject
    let i = 0;
    imageObject.forEach(item => {
      i++
    });
    if (i < 9) {
      uploadImage(that)
    } else {
      wx.showModal({
        title: '提示',
        content: '最多添加9张',
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            console.log('用户点击确定')
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
  },


})