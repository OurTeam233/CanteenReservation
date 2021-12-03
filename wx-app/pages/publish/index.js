Page({
  data: {
    chooseImage: {
      sourceObj: {},
      isUploaded: false
    },
    mineInfo: {
      'touxiang': 'http://img5.imgtn.bdimg.com/it/u=183326193,1784969774&fm=26&gp=0.jpg',
      'nicheng': '王一傻子',
    },
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
    ],
  },
  // 上传文件
  afterRead (event) {
    const { file } = event.detail;
    console.log(event)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: '', // 仅为示例，非真实的接口地址
      filePath: file.url,
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
})