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
    describe:'',//物品描述
    name:'',//物品名称
    phone:'',//联系电话
    time:0,//发生时间毫秒值
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
  },
   //获取物品名称
  onChange(event) {
    this.setData({
      name: event.detail,
    });
  },
  //获取物品描述详情
  thingsDesc(e){
    this.setData({
      describe:e.detail
    })
  },
  //获得电话号码
  phone(e){
    this.setData({
      phone:e.detail
    })
  },
  //获取时间（毫秒）
  getMillisecond(){
    const time =  (new Date(`${this.data.year}/${this.data.month}/${this.data.day} 00:00:00`)).getTime(); 
    this.setData({
      time:time
    })
  },
  //选取发生时间
  confirm() {
    // console.log(this.data.currentDate);
    this.setData({
      show: false,
      currentChoose: this.data.currentDate,
      year: new Date(this.data.currentDate).getFullYear(),
      month: new Date(this.data.currentDate).getMonth() + 1,
      day: new Date(this.data.currentDate).getDay()
    });
    this.getMillisecond();
    console.log(this.data.day);
  },
  //上传图片
  afterRead(event) {
    const { file } = event.detail;
    const fileList = this.data.fileList
    fileList.push(event.detail.file)
    this.setData({
      fileList:fileList
    })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://121.43.56.241/upload', // 仅为示例，非真实的接口地址
      filePath: "../../image/commityPhone",
      name: 'file',
      formData: { user: 'test' },
      success (res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
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
    invitation.fileList = this.data.fileList
    invitation.name= this.data.name
    invitation.describe = this.data.describe
    invitation.phone=this.data.phone
    invitation.type = this.data.type
    console.log(invitation)
    //发送请求
    request({
      url:'',
      data:{
        invitation
      }
    }).then(res=>{
      // console.log(res)
    })
    //跳转页面

  },

});