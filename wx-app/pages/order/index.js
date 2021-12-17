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
  // onShow () {
  //   let orderActivePage = wx.getStorageSync("orderActivePage");
  //   this.setData({
  //     activePage: orderActivePage
  //   })
  //   console.log(this.data.activePage)
  // },
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
      console.log(res)
      const newList = new Array();
      const historyList = new Array();
      const illegalList =  new Array();
      for(const item of res){
        //type为0，表示商家未做，1 表示做好未取 2表示历史 3表示违规
        console.log(item.type)
        if(item.type == 1 || item.type == 0){
          //获取新增订单
          newList.push(item);
        }else{
          if(item.type === 2){
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
      //  console.log(this.data.allList);
      //  console.log(newList);
      //  console.log(historyList);
      //  console.log(illegalList)
    })
  },
  //将毫秒数转化成时间
  changeTime(){
  },
  //取消订单
  abolishOrder(){

  },
  //跳转评价页面
  skipLoad(e){
    wx.navigateTo({
      url:"/page/Loading/index"
  })
  },
  //申诉
  appealOrder(){
  }
})