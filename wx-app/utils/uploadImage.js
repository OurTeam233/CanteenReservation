const qiniuUploader = require("./qiniuUploader");
// 初始化七牛相关参数
function initQiniu () {
  let uptoken
  wx.request({
    url: 'http://175.178.216.63:8888/CanteenWeb/image',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      uptoken = res.data.data
      var options = {
        region: 'SCN', // 华北区
        uptokenURL: 'https://rche615yy.hn-bkt.clouddn.com/api/uptoken',
        uptoken,
        domain: 'http://rche615yy.hn-bkt.clouddn.com/'
      };
      qiniuUploader.init(options);
    }
  })
}

export function uploadImage (that) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 9,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      // 交给七牛上传
      let imageObject = that.data.imageObject
      for (let filePath of res.tempFilePaths) {
        qiniuUploader.upload(filePath, (res) => {
          imageObject.push(res)
          that.setData({
            imageObject
          });
        }, (error) => {
          console.error('error: ' + JSON.stringify(error));
        });
      }
    }
  })
}