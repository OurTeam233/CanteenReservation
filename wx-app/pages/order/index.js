// pages/order/index.js
import {
  request
} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePage: 0,
    allList: [], //所有订单
    newList: [], //新增订单
    historyList: [], //历史订单
    illegalList: [], //违规订单
    flag: false //取消订单
  },
  onLoad() {
    this.getAllList();
  },

  /**
   *  加载的时候获取缓存中的页面信息
   */
  onShow() {
    this.getAllList();
  },
  /**
   *  标签切换事件
   */
  changePage(event) {
    this.setData({
      activePage: event.detail.index
    })
  },
  /**
   * 获取订单
   */
  getAllList() {
    request({
      url: '/Order/Select'
    }).then(res => {
      console.log(res)
      const newList = new Array();
      const historyList = new Array();
      const illegalList = new Array();
      for (const item of res) {
        //type为0，表示商家未做，1 表示做好未取 2表示历史 3表示违规 4表示已取消 5表示可取消
        item.totalPrice = item.totalPrice * 0.01

        //转化orderTime
        var dateee = new Date(item.orderTime).toJSON();
        item.orderTime = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

        //转化time
        var dateee = new Date(item.time).toJSON();
        item.time = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        

        if (item.type == 1 || item.type == 0 || item.type == 5) {
          //获取新增订单
          newList.push(item);
        } else {
          if (item.type === 2 || item.type == 4) {
            //获取历史订单
            historyList.push(item);
          } else {
            //获取违规订单
            illegalList.push(item);
          }
        }
      };
      this.setData({
        allList: res,
        newList: newList,
        historyList: historyList,
        illegalList: illegalList,
      });

    })
  },
  /**
   * 取消订单
   * @param {*} e 
   */
  abolishOrder(e) {
    //获取参数
    const id = e.currentTarget.dataset.id
    // console.log(id);
    request({
      url: '/Order/Cancel?orderId=' + id,
    }).then(res => {
      // console.log(res.success)
      if (res.success) {
        wx.showToast({
          title: '已取消',
          icon: "success"
        })
        this.onShow();
      } else {
        wx.showToast({
          title: '无法取消',
          icon: "error"
        })
      }
    })

    // wx.showToast({
    //     title: '无法取消订单',
    //     icon:'error',
    //     duration:5000
    // })    
  },
  /**
   * 跳转评价页面
   * @param {*} e 
   */
  skipLoad(e) {
    wx.navigateTo({
      url: "/page/Loading/index"
    })
  },
  /**
   * 再来一单
   * @param {*} e 
   */
  anotheList(e) {
    //获取订单参数
    const orderId = e.currentTarget.dataset.id
    request({
      url: '/Order/One?orderId=' + orderId
    }).then(res => {
      // console.log(res)
      const againStoreId = res.storeId
      const againCarts = res.orderDetailsList
      //将再来一单的店铺id 和订单详情 存入本地
      wx.setStorageSync('againStoreId', againStoreId)
      wx.setStorageSync('againCarts', againCarts)
      //跳转页面
      wx.navigateTo({
        url: '../information/index?id=' + againStoreId
      })
    })
  },
  /**
   * 申诉
   */
  appealOrder() {
    request({
      url: ''
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '申述成功',
      })
    })
  },
  //刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //重新获取订单详情
    this.getAllList()
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
  // 扫描二维码
  scanCode(e) {
    let orderId = e.currentTarget.dataset.id;
    let refresh = this.onPullDownRefresh
    wx.scanCode({
      success(res) {
        if (res.result == orderId) {
          request({
            url: `/Order/Update?orderId=${res.result}&type=2`
          }).then(res => {
            if (res.success) {
              refresh()
            }
          })
        }
      }
    })
  }
})