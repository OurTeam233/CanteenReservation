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
    cates: [], //菜品数据
    carts:[],//菜品购物车
    sumPrice: 0, //购物总金额
    //
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    maxDate:new Date().getTime()+24*60*60*1000*2,
    //
    showSelectTime: false,
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate(),
    currentHour: new Date().getHours(),
    currentMinute: new Date().getMinutes(),
    minHour:6,
    minMin:0,
    //预约年月日
    year:new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date:new Date().getDate(),
    millisecond:new Date().getTime(),
    //
    selectDate: '',
    startHour: '00',
    startMin: '00',
    endHour: '00',
    endMin: '00',
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 15 === 0);
      }

      return options;
    },
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
    // console.log(this.data.carts)
  },
  //日期弹出层打开
  showPopup() {
    this.setData({ show: true });
  },
  //日期弹出层关闭
  onClose() {
    this.setData({ show: false });
  },
  //日期
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  //点击选择日期完成按钮
  dateConfirm: function (e){
    const year = new Date(e.detail).getFullYear();
    const date = new Date(e.detail).getDate();
    const month = new Date(e.detail).getMonth()+1;
    // console.log(year,month,date)
    this.setData({
      year:year,
      month:month,
      date:date, 
      millisecond:e.detail,
      show: false
     });
  },
  //点击选择日期取消按钮
  dateCancel(){
    this.setData({ show: false });
  },
  // 点击打开时间选择栏
  selectTime: function () {
    this.minHourAndMinMin();
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
    // console.log(afterDate)
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
    this.legalTime();
  },
  //确定最小时间
  minHourAndMinMin(){
    //获取预约日期
    const year = this.data.year;
    const month = this.data.month;
    const date = this.data.date;
    // console.log(year,month,date)
    //将日期对应成毫秒
    //拼接预定时间 (new Date("2017/04/25 19:44:11"))
    // const time = `${year}/${month}/${date} 00:00:00`
    const ordertime =  (new Date(`${year}/${month}/${date} 00:00:00`)).getTime(); 
    // console.log(ordertime)
    //获取当前时间毫秒值
    const time = new Date().getTime()
    const hour = new Date().getHours()
    const min = new Date().getMinutes()
    // console.log(hour)
    // console.log(time)
    if(ordertime>time){
      this.setData({
        minHour:6,
      })
    }else{
      this.setData({
        minHour:hour,
      })
    }

  },
  //判断预定时间是否符合条件
  legalTime(){
    //获取当前时间
    const time = new Date().getTime();
    const ordertime = this.getMillisecond();
    console.log(time)
    console.log(ordertime)
    if(ordertime<time){
       //预约无效
       wx.showToast({
        title: '预约时间无效',
        icon: 'error',
      })
      return false;
    }
    //获取预定时间
    const startHour = Number.parseInt(this.data.startHour); 
    /*预约取餐合法时间 早上6:00-9:00 中午10:00-13:00 晚上16:00-19:00 */
    if((startHour>=6&&startHour<=13)||(startHour>=16&&startHour<=19)){
      //合法预约
      return true;
    }else{
      //预约无效
      wx.showToast({
        title: '无效预约时间',
        icon: 'error',
      })
      this.setData({
        startHour:'00',
        startMin:'00',
        endHour:'00',
        endMin:'00'
      })
      return false;
    }
  },
  // 输入备注
  inputNotes: function (event) {
    this.setData({
      notesValue: event.detail
    })
  },
  // 底部栏
  tapSubmit: function (event) {
    const flag = this.legalTime();
    console.log(flag)
    const order = this.all();
    // console.log(order);
    const token = wx.getStorageSync('token')
    //发送请求给后端
    if(flag){
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
        wx.setStorageSync('cates', [])
      },
    })
    //跳转也页面
    wx.switchTab({
      url: '/pages/order/index'
    })
  }

    
    // TODO 提交成功代码
  },
 //获取预约时间毫秒值
  getMillisecond(){
    //获取预定年月日
    const currentYear = this.data.year;
    const currentMonth = this.data.month;
    const currentDay = this.data.date;
    //获取预定时间
    const startHour = this.data.startHour;
    const startMin = this.data.startMin;
    //拼接预定时间 (new Date("2017/04/25 19:44:11"))
    const ordertime = `${currentYear}/${currentMonth}/${currentDay} ${startHour}:${startMin}:00`
    // console.log(ordertime)
    //获取预定时间毫秒值
    const orderTime =  (new Date(ordertime)).getTime(); 
    // console.log(orderTime)
    return orderTime;
},
  //整合传递数据，
  all(){
    const order=new Object();
    const store = wx.getStorageSync('store');
    const ordertime = this.getMillisecond();
    order.storeId  = store.id;//店铺id
    // console.log(order.storeId)
    order.dishes = this.data.carts;//菜品数据（id,num）
    order.totalPrice = this.data.sumPrice*100;//总价（分）
    order.note = this.data.notesValue;//备注、
    order.time = new Date().getTime()//当前下单时间（ms）
    order.orderTime = ordertime;//预定时间(ms)
    this.setData({
      order
    });
    // console.log(this.data.order);
    return this.data.order;
  },

 

})