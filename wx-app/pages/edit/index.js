import {
  request
} from '../../utils/request';
// import Toast from '@vant/weapp/toast/toast';


Page({
  data: {
    fileList: [
      {
        url: 'https://thirdwx.qlogo.cn/mmopen/vi_32/37yaHibjtjPM4r55rYMQEFI1aFEyfcvVFhjtP4lUiaBHOKhv3w3S7ibHumdBP6L3HZl62Y7iavMQVQa3XkOZZD4Miag/132',
        name: '图片2',
        isImage: true,
        deletable: true,
      },
    ],
    showUploadHeader: false,
    nickName: '小明同学',
    studentNumber: null,
    college: null,
    gender: '1',
    profileValue: '',
    studentId: null,
  },

  onReady(){
    let userInfo = wx.getStorageSync('userInfo');
    let studentId = wx.getStorageSync('studentId');
    this.setData({
      nickName: userInfo.nickName,
      headImgUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      studentNumber: userInfo.sequence,
      college: userInfo.department,
      profileValue: userInfo.signature,
      'fileList[0].url': userInfo.avatarUrl,
      studentId: studentId
    })
   console.log(this.data.fileList);
  },




  // 图片
  tapShowUpload () {
    this.setData({
      showUploadHeader: true,
    })
    setTimeout(() => {
      this.setData({
        showUploadHeader: false,
      })
    }, 5000)
  },
  // 修改性别
  onChangeGender (event) {
    this.setData({
      gender: event.detail,
    })
  },

  //获取缓存中的个人信息
  getUserInfo(){
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      nickName: userInfo.nickName,
      headImgUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      studentNumber: userInfo.sequence,
      college: userInfo.department

    })
  },


  //更新个人信息
  updateUserInfo(){
    const token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/student',
      data: {
        id: this.data.studentId,
        avatarUrl: this.data.fileList[0].url,
        gender: this.data.gender,
        nickname: this.data.nickName,
        signature: this.data.profileValue,
      },
      header: {token},
      method: "PUT",
      success: (res) => {
        console.log('ok')
        // wx.setStorage('userInfo', {
        //   nickName: this.data.nickName,
        //   signature: this.data.profileValue,
        //   gender: this.data.gender,
        // })
        // 更新缓存中的信息
        let userInfo = wx.getStorageSync('userInfo');
        userInfo.gender = this.data.gender;
        userInfo.nickName = this.data.nickName;
        userInfo.signature = this.data.profileValue;
        wx.setStorageSync('userInfo', userInfo);

        //修改成功后返回上一级
        wx.navigateBack();
        
      },
      error: (res) => {
        console.log('no')
      }
    })
  },

  
})