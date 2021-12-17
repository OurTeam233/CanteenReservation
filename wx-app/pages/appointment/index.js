// pages/appointment/index.js
import{
  request
}from '../../utils/request'
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
    this.getCarts()
  },
  //获取加入购物车的菜品
  getCarts(){
    const cates = this.data.cates;
    const carts = []
    for(const item1 of cates){
      for(const item2 of item1.dishes){
        if(item2.num!=0){
          var v = new Object();
          //为对象添加动态属性
          v.dishesId=item2.id;
          v.num = item2.num
          carts.push(v);
        }
      }
    };
    this.setData({
      carts
    })
    console.log(this.data.carts)
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
    const token = wx.getStorageSync('token')
    //发送请求给后端
    wx.request({
      url: 'http://121.43.56.241:8080/CanteenWeb/Order/Insert',
      data: {
        order,
      },
      header:{token},
      method: "POST",
      success: (result) => {
        console.log(result)
        console.log("成功了吗")
      },
    })
  
    
    //跳转也页面
    wx.switchTab({
      url: '/pages/order/index'
    })
    // TODO 提交成功代码
  },
  //整合传递数据，
  all(){
    const order=new Object();
    const store = wx.getStorageSync('store');
    //或去当前时间的毫秒值
    const time = new Date().getTime();
    console.log(time);
    //获取去当前年月日
    const currentYear = this.data.currentYear;
    const currentMonth = this.data.currentMonth;
    const currentDay = this.data.currentDay;
    //获取预定时间
    const startHour = this.data.startHour;
    const startMin = this.data.startMin;
    if(currentMonth<10){
      currentMonth = `0${currentMonth}`
    };
    if(currentDay<10){
      currentDay = `0${currentDay}`
    };
    //拼接预定时间 (new Date("2017/04/25 19:44:11"))
    const ordertime = `${currentYear}/${currentMonth}/${currentDay} ${startHour}:${startMin}:00`
    //获取预定时间毫秒值
    const orderTime =  (new Date(ordertime)).getTime(); 
    console.log(orderTime);
    console.log(this.data.carts)
    order.storeId  = store.id;//店铺id
    order.dishes = this.data.carts;//菜品数据（id,num）
    order.totalPrice = this.data.sumPrice;//总价
    order.note = this.data.notesValue;//备注、
    order.time = time//当前下单时间（ms）
    order.orderTime = ordertime;//预定时间(ms)
    this.setData({
      order
    });
    // console.log(this.data.order);
    return this.data.order;
  },

})