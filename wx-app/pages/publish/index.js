import{
  request
}from '../../utils/request' 
Page({
  data: {
    //获取用户信息
    userInfo :[],
    publicationTime:' ',
    //帖子类型
    type:'',
    chooseImage: {
      sourceObj: {},
      isUploaded: false
    },
    //个人信息
    mineInfo: {
      'touxiang': 'http://img5.imgtn.bdimg.com/it/u=183326193,1784969774&fm=26&gp=0.jpg',
      'nicheng': '王一傻子',
    },
    // 图片信息
    fileList: [
    ],
    //帖子文本信息
    text:'',
    //帖子的内容
    invitation:{}
  },
  //事件
  onLoad(e){
    this.setData({
      type:e.currentPage
    })
    this.getPublicationTime();
  },
  // 上传文件
  afterRead (event) {
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
  //发表时间
  getPublicationTime(){
    const invitation=this.data.invitation
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth()+1;
    const day = time.getDate();
    const hour = time.getHours();
    const min = time.getMinutes();
    const publicationTime =`${year}`+'-'+`${month}`+'-'+`${day}`+' '+`${hour}`+':'+`${min}`
    this.setData({
      publicationTime:publicationTime,
    })
  },
  //获取帖子输入的文本内容
  inputText(e){
    const text = e.detail
    this.setData({
      text:text
    })
  },
  //整合帖子数据
  all(){
    const invitation = this.data.invitation;
    //将图片信息插入整合数据中
    invitation.text = this.data.text
    invitation.fileList = this.data.fileList;//图片信息
    invitation.type = this.data.type;//帖子类型
    console.log(invitation)
    const token = wx.getStorageSync('token')
    //发送去请求
    wx.request({
      url: 'https://121.43.56.241/CanteenWeb/Post/Insert',
      data: {
        "text": invitation.text,
        "fileList": invitation.fileList,
        "type": invitation.type
      },
      header:{token},
      method: "POST",
      success: (result) => {
        console.log(result)
      },
    })
  },
})