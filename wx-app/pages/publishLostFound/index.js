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
  
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  confirm() {
    // console.log(this.data.currentDate);
    this.setData({
      show: false,
      currentChoose: this.data.currentDate,
      year: new Date(this.data.currentDate).getFullYear(),
      month: new Date(this.data.currentDate).getMonth() + 1,
      day: new Date(this.data.currentDate).getDay()
    });
    console.log(this.data.day);
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
});