import{
  request
}from '../../utils/request'
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
    type:'',//帖子类型
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
  },
  onLoad(e){
    this.setData({
      type:e.currentPage
    })
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
  //整合数据
  all(){
    const invitation = new Object();
    invitation.pictureList = []
    this.data.fileList.forEach(item => {
      let obj = {}
      obj.pictureUrl = item.url
      invitation.pictureList.push(obj)
    })
    invitation.itemName= this.data.itemName
    invitation.description = this.data.description
    invitation.phone=this.data.phone
    invitation.types = this.data.type
    invitation.startDate = this.data.currentDate
    invitation.address = this.data.address
    console.log(invitation)
    const token = wx.getStorageSync('token')
    //发送请求
    wx.request({
      url: 'https://121.43.56.241/CanteenWeb/LostFound/Insert',
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
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
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

});