import { request } from "../../utils/request";

// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片2',
        isImage: true,
      },
    ],//上传图片
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
  //删除图片
  delete(e){
    console.log(e)
  }
})