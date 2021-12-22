// pages/order/index.js
import{
  request
}from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePage: 0,
    allList:[],//所有订单
    newList:[],//新增订单
    historyList:[],//历史订单
    illegalList:[],//违规订单
  },
  onLoad(){
    this.getAllList();
  },
  // 加载的时候获取缓存中的页面信息
  onShow () {
    // let orderActivePage = wx.getStorageSync("orderActivePage");
    // this.setData({
    //   activePage: orderActivePage
    // })
    // console.log(this.data.activePage)
    this.getAllList();
  },
  // 标签切换事件
  changePage (event) {
    // this.setData({
    //   activePage: this.data.activePage
    // })
    console.log(this.data.activePage)
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    // });
  },
  //获取订单
  getAllList(){
    request({
      url: '/Order/Select'
    }).then(res=>{
      // console.log(res)
      //将订单里的数据全部转成年月日时分秒
      for(const item of res){
      //下单预定时间,将时间转化成年月日时分秒
      var time = new Date(item.orderTime);
      const orderTime  = item.orderTime;
      item.orderTime =time.getHours()+":"+time.getMinutes()
      // console.log('下单预定时间'+item.orderTime);
      //下单取餐截止时间
      const mss = parseInt(orderTime)+30*60*1000;
      var time3 = new Date(mss)
      const getTime = time3.getHours()+":"+time3.getMinutes()
      item.getTime = getTime//插入获取截止时间
      //下单时间时间
      var time2 = new Date(item.time);
      item.time = time2.getFullYear()+"-"+(time2.getMonth()+1)+"-"+time2.getDate()+" "+time2.getHours()+":"+time2.getMinutes()
      // console.log('下单时间'+item.time);
      };
      const newList = new Array();
      const historyList = new Array();
      const illegalList =  new Array();
      for(const item of res){
        //type为0，表示商家未做，1 表示做好未取 2表示历史 3表示违规
        // console.log(item.type)
        if(item.type == 1 || item.type == 0){
          //获取新增订单
          newList.push(item);
        }else{
          if(item.type === 2 || item.type == 4){
            //获取历史订单
            historyList.push(item);
          }else{
            //获取违规订单
            illegalList.push(item);
          }
        }
      };
      this.setData({
        allList:res,
        newList:newList,
        historyList:historyList,
        illegalList:illegalList,
       });
       console.log(this.data.allList);
       console.log(newList);
       console.log(historyList);
       console.log(illegalList)
    })
  },
  //取消订单
  abolishOrder(e){
    //获取参数
    const id = e.currentTarget.dataset.id
    console.log(id);
    request({
      url:'/Order/Cancel?orderId='+id,
    }).then(res=>{
      console.log(res.success)
      if(res.success){
        this.onShow();
      }
    })
  },
  //跳转评价页面
  skipLoad(e){
    wx.navigateTo({
      url:"/page/Loading/index"
  })
  },
  //再来一单
  anotheList(e){
    //获取订单参数
    const orderId = e.currentTarget.dataset.id
    request({
      url:'/Order/One?orderId='+orderId
    }).then(res=>{
      console.log(res)
      const againStoreId = res.storeId
      const againCarts = res.orderDetailsList
      //将再来一单的店铺id 和订单详情 存入本地
      wx.setStorageSync('againStoreId', againStoreId)
      wx.setStorageSync('againCarts', againCarts)
      //跳转页面
      wx.navigateTo({
        url: '../information/index?id='+againStoreId
      })
    })
  },
  //申诉
  appealOrder(){
  }
})