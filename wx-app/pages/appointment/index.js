// pages/appointment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
    showSelectTime: false,
    cates: [], //菜品数据
    carts:[],//菜品购物车
    sumPrice: 0, //购物总金额
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate(),
    currentHour: new Date().getHours(),
    currentMinute: new Date().getMinutes(),
    selectDate: '',
    startHour: '00',
    startMin: '00',
    endHour: '00',
    endMin: '00',
    formatter(type, value) {
      if (type === 'hour') {
        return `${value}时`;
      }
      if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
    notesValue: '',
    order:{}

  },
  //事件加载
  onLoad() {
    //获取菜品数据和总金额
    const cates = wx.getStorageSync('cates');
    const sumPrice = wx.getStorageSync('sumPrice');
    this.setData({
      cates: cates,
      sumPrice: sumPrice,
    })
  },
  //获取加入购物车的菜品
  getCarts(){
    const cates = this.data.cates;
    const carts = []
    for(const item1 of cates){
      for(const item2 of item1.dishes){
        if(item2.num!=0){
          this.v;
          v.id=item2.id;
          v.num = item2.num
          carts.push(v);
        }
      }
    };
    this.setData({
      carts
    })
  },
  // 点击打开时间选择栏
  selectTime: function () {
    this.setData({
      showSelectTime: true
    })
  },
  // 关闭时间选择栏
  closeSelectTime: function () {
    this.setData({
      showSelectTime: false
    })
  },
  // 点击选择时间完成按钮
  tapConfirm: function (event) {
    const [startHour, startMin] = event.detail.split(':')
    let afterDate = new Date()
    afterDate.setHours(startHour)
    afterDate.setMinutes(Number.parseInt(startMin) + 30)
    // console.log(afterDate)
    const endHour = String(afterDate.getHours()).padStart(2, '0')
    const endMin = String(afterDate.getMinutes()).padStart(2, '0')
    this.setData({
      startHour,
      startMin,
      endHour,
      endMin,
      showSelectTime: false
    })
  },
  // 输入备注
  inputNotes: function (event) {
    this.setData({
      notesValue: event.detail
    })
  },
  // 底部栏
  tapSubmit: function (event) {
    const order = this.all();
    console.log(order);
    //发送请求给后端
    request({
      url: 'url',
      data: order,
    }).then(res=>{
      console.log(res)
    })
    //跳转也页面
    wx.switchTab({
      url: '/pages/order/index'
    })
    // TODO 提交成功代码
  },
  //整合传递数据，
  all(){
    const order={};
    const store = wx.getStorageSync('store');
    order.storeId = store.id;//店铺id
    order.carts = this.data.carts;//菜品数据（id,num）
    order.sumPrice = this.data.sumPrice;//总价
    order.notesValue = this.data.notesValue;//备注
    order.startHour = this.data.startHour;//开始时间hour
    order.startMin = this.data.startMin;//开始时间min
    order.endHour = this.data.endHour;//结束时间hour
    order.endMin = this.data.endMin;//结束时间min
    this.setData({
      order
    });
    // console.log(this.data.order);
    return this.data.order;
  },

})