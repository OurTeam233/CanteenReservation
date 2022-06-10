import{
  request
}from '../../utils/request'
const {
  uploadImage
} = require('../../utils/uploadImage.js')
Page({
  data: {
    show: false,
    value: '',
    minHour: 0,
    maxHour: 24,
    minDate: new Date(2020,1,1).getTime(),
    maxtDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    currentChoose:'',
    checked: true,
    types:5,//帖子类型
    description:'',//物品描述
    itemName:'',//物品名称
    phone:'',//联系电话
    time:0,//发生时间毫秒值
    address:'',
    fileList:[],
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },


     // 图片
     imageObject: []
  },


  onLoad(e){
    console.log(e)
    // this.setData({
    //   types:e.currentPage
    // })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
    console.log(this.data.currentDate)
    let choosenDate = new Date(this.data.currentDate)
    this.setData({
      year: choosenDate.getFullYear(),
      month: choosenDate.getMonth() + 1,
      day: choosenDate.getDate(),
    })
  },
   //获取物品名称
  onChange(event) {
    this.setData({
      itemName: event.detail,
    });
    console.log(this.data.itemName)
  },
  //获取物品描述详情
  thingsDesc(e){
    this.setData({
      description:e.detail
    })
    console.log(this.data.description)
  },
  //获得电话号码
  phone(e){
    this.setData({
      phone:e.detail
    })
    console.log(this.data.phone)
  },
  // 获取地址
  thingsAddress(e) {
    this.setData({
      address: e.detail
    })
    console.log(this.data.address)
  },
  // //获取时间（毫秒）
  // getMillisecond(){
  //   const time =  (new Date(`${this.data.year}/${this.data.month}/${this.data.day} 00:00:00`)).getTime();
  //   this.setData({
  //     time:time
  //   })
  //   console.log(time)
  // },
  //选取发生时间
  confirm() {
    this.setData({
      show: false
    })
    // console.log(this.data.currentDate);
    // this.setData({
    //   show: false,
    //   currentChoose: this.data.currentDate,
    //   year: new Date(this.data.currentDate).getFullYear(),
    //   month: new Date(this.data.currentDate).getMonth() + 1,
    //   day: new Date(this.data.currentDate).getDay()
    // });
    // this.getMillisecond();
    // console.log(this.data.day);
  },
  // 上传图片
  afterRead(event) {
    const { file } = event.detail;
    let that = this
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://121.43.56.241/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      success (res) {
        // 上传完成需要更新 fileList
        let parse = JSON.parse(res.data)
        const { fileList = [] } = that.data;
        let url = "http://121.43.56.241" + parse.msg
        console.log(url)
        fileList.push({ ...file, url });
        that.setData({ fileList });
      },
    });
  },
  //删除图片
  deleteImg(e){
    const fileList = this.data.fileList
    //获取删除图片的索引值
    const index = e.detail.index
    //删除特定索引的图片
    fileList.splice(index,1)
    this.setData({
      fileList:fileList
    })
  },
  //寻物启示发布 type = 5
  allOne(){
    console.log(this.data.types)
     //获取图片
     let imageObject=this.data.imageObject
     let pictureList = []
     imageObject.forEach(item => {
       let v = {}
       v.url = item.imageURL
      pictureList.push(v)
     });
     
     console.log
    const invitation = new Object();
    invitation.pictureList = pictureList//图片
    invitation.itemName= this.data.itemName
    invitation.description = this.data.description
    invitation.phone=this.data.phone
    invitation.types = 5
    invitation.startDate = this.data.currentDate
    invitation.address = this.data.address
    invitation.wechat = '**********'
    console.log(invitation)
    const token = wx.getStorageSync('token')
    //发送请求
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/LostFound/Insert',
      data:{
        post: invitation
      },
      header:{token},
      method: "POST",
      success: (result) => {
        console.log(result)
        if (result.data.success) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1000
          })
          wx.navigateBack({
            delta: 1,//上一个页面
            success: () => {
                //调用前一个页面的方法takePhoto()。
                prevPage.takePhoto()
            }
        });
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 1000
          })
        }
      },
    })
    //跳转页面
  },

  // 失物招领   type=6
  allTwo(){
    console.log(this.data.types)
     //获取图片
     let imageObject=this.data.imageObject
     let pictureList = []
     imageObject.forEach(item => {
       let v = {}
       v.url = item.imageURL
      pictureList.push(v)
     });
     
     console.log
    const invitation = new Object();
    invitation.pictureList = pictureList//图片
    invitation.itemName= this.data.itemName
    invitation.description = this.data.description
    invitation.phone=this.data.phone
    invitation.types = 6
    invitation.startDate = this.data.currentDate
    invitation.address = this.data.address
    invitation.wechat = '**********'
    console.log(invitation)
    const token = wx.getStorageSync('token')
    //发送请求
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/LostFound/Insert',
      data:{
        post: invitation
      },
      header:{token},
      method: "POST",
      success: (result) => {
        console.log(result)
        if (result.data.success) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1000
          })
          wx.navigateBack({
            delta: 1,//上一个页面
            success: () => {
                //调用前一个页面的方法takePhoto()。
                prevPage.takePhoto()
            }
        });
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 1000
          })
        }
      },
    })
    //跳转页面
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


});