Page({
  data: {
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
    ],
    showUploadHeader: false,
    nickName: '小明同学',
    studentNumber: '20190202975',
    college: '计算机科学与大数据学院',
    career: '计算机科学与技术',
    gender: '1',
    profileValue: '',
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
})