import {
  request
} from '../../utils/request'
const {
  uploadImage
} = require('../../utils/uploadImage.js')
Page({
  data: {
    //获取用户信息
    userInfo: [],
    publicationTime: ' ',
    //帖子类型
    type:1,
    chooseImage: {
      sourceObj: {},
      isUploaded: false
    },
    //个人信息
    mineInfo: {},
    // 图片信息
    fileList: [],
    //帖子文本信息
    text: '',
    //帖子的内容
    invitation: {},
    imgUrls: [],
    // 图片
    imageObject: []
  },
  //事件
  onLoad(e) {
    this.getPublicationTime();
  },


  // 上传文件
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



  //删除图片
  deleteImg(e) {
    const fileList = this.data.fileList
    //获取删除图片的索引值
    const index = e.detail.index
    //删除特定索引的图片
    fileList.splice(index, 1)
    this.setData({
      fileList: fileList
    })
  },
  //发表时间
  getPublicationTime() {
    const invitation = this.data.invitation
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const min = time.getMinutes();
    const publicationTime = `${year}` + '-' + `${month}` + '-' + `${day}` + ' ' + `${hour}` + ':' + `${min}`
    this.setData({
      publicationTime: publicationTime,
    })
  },
  //获取帖子输入的文本内容
  inputText(e) {
    const text = e.detail
    this.setData({
      text: text
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

  //整合帖子数据
  all() {

    //获取图片
    let imageObject=this.data.imageObject
    let fileList = []
    imageObject.forEach(item => {
      fileList.push(item.imageURL)
    });
    //获取类型
    let types = this.data.type
    //获取文本
    let text = this.data.text 
    const token = wx.getStorageSync('token')
    console.log(fileList)
    console.log(types)
    console.log(text)
    //发送去请求
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Post/Insert',
      data: {
        text,
        fileList,
        type: types
      },
      header: {
        token
      },
      method: "POST",
      success: (result) => {
        console.log(result)
        if (result.data.success) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../community',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },
})