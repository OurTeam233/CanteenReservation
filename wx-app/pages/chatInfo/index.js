var utils = require("../../utils/util.js")
const app = getApp()
const api = require('../../utils/request.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receivebaseInfo: {}, //收到的other信息
    sendAvatar: '', //own头像
    newsList: [{
        date: "2020.10.19",
        message: '哈喽，好久不见',
        type: 0
      },
      {
        date: "2020.10.20",
        message: '是呀，好久不见',
        type: 1
      },
      
      
    ], //消息列表
    historyList: [], //历史列表
    input: null,
    connectemoji: ["😘", "😡", "😔", "😄", "❤"],
    emoji_list: ['emoji1i1', 'emoji2i2', 'emoji3i3', 'emoji4i4', 'emoji5i5'],
    emotionVisible: false,
    inputShowed: false,
    scrollTop: 0,
    inputBottom: '0px',
    receiveMemberId: null,
    sendMemberId: null,
    scrollid: 'scrollid',
    scrollHeight: '100px',
    //  下拉刷新
    triggered: true,
    //  历史记录当前页
    pageNo: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var receiveMemberId = options.receiveMemberId
    var sendAvatar = wx.getStorageSync('avatarUrl');
    var _this = this;
    _this.setData({
      receiveMemberId:2,
      sendMemberId:1
    })
    
    //  获取内存中的数据
    this.getStorageBaseInfo()
    //  设置滚动区域的高度
    this.setScrollHeight()
    //  获取历史记录 
    this.getHistory()
    // 初始化websocket
    this.initWebSocket()
    //  页面进入滚动到底部
    this.scrollBottom()
  },

 

  //  websocket初始化
  initWebSocket: function () {
    var _this = this;
    var {
      receiveMemberId,
      sendMemberId
    } = this.data
    //建立连接
    wx.connectSocket({
      url: `ws://175.178.216.63:8888/CanteenWeb/chat/1/2`, //本地
      success: function (e) {
        console.log(e)
        console.log('websocket连接成功~')
      },
      fail: function () {
        console.log('websocket连接失败~')
      },
    })

    //连接成功
    wx.onSocketOpen(function () {
      console.log('onSocketOpen', '连接成功,真正的成功');
    })

    //  接收服务器的消息事件
    wx.onSocketMessage(function (msg) {

      // 接收到的消息{date,message,type}  type类型为 1 是对方的消息 为 0 是自己的消息

      var list = [];
      list = _this.data.newsList;
      list.push({
        type: 1,
        message: msg.data
      })
      console.log(list)
      _this.setData({
        newsList: list
      })
      _this.scrollBottom()
    }, )

  },

  // 获取历史记录
  getHistory: function () {
    var {
      receiveMemberId,
      sendMemberId,
      pageNo
    } = this.data
    var params = {
      receiveMemberId,
      sendMemberId,
      pageNo,
      pageSize: 5,
    }
    // api.get("/zxxt/chat/msg/list", params, (res) => {
    //   if (res.code == 'success') {
    //     // var historyList = res.data.data
    //     var historyList = [...res.data.data, ...this.data.historyList]
    //     if (historyList && historyList.length > 0) {
    //       historyList.forEach(item => {
    //         if (item.send_member_id == sendMemberId) {
    //           item.type = 0
    //         } else {
    //           item.type = 1
    //         }
    //       });
    //       this.setData({
    //         historyList
    //       })
    //       console.log(this.data.historyList, '历史记录数据')
    //     } else {
    //       // 判断是否是第一次进入查看历史记录：是（不显示弹框，不是则显示弹框）
    //       if (this.data.pageNo > 1) {
    //         wx.showToast({
    //           title: "没有更多历史记录了",
    //           icon: 'none',
    //           duration: 2000
    //         })
    //       }
    //     }
    //   } else {
    //     if (res.message) {
    //       wx.showToast({
    //         title: res.message,
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   }
    // }, (res) => {
    //   if (res.message) {
    //     wx.showToast({
    //       title: res.message,
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })
  },

  // 滚动到底部
  scrollBottom: function () {
    var {
      newsList
    } = this.data
    var scrollid = `scrollid${newsList.length - 1}`
    this.setData({
      scrollid
    })
  },

  // 设置滚动区域的高度
  setScrollHeight: function () {
    const client = wx.getSystemInfoSync().windowHeight // 获取当前窗口的高度
    var scrollHeight = (client - 130) + 'px'
    this.setData({
      scrollHeight
    })
  },

  // 获取内存中聊天列表的用户信息
  getStorageBaseInfo: function () {
    //获取存储信息
    wx.getStorage({
      key: 'receivebaseInfo',
      success: (res) => {
        this.setData({
          receivebaseInfo: res.data
        })
      }
    })
  },

  // 自定义下拉刷新
  refresh: function () {
    // 下拉的实际操作
    var pageNo = this.data.pageNo + 1
    this.setData({
      pageNo
    })
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.setData({
        triggered: false
      })
      this.getHistory()
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 页面销毁时断开长连接
    wx.closeSocket({
      code: 1000,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  send: function () {
    var _this = this;
    if (_this.data.input) {
      wx.sendSocketMessage({
        data: _this.data.input,
        success: (res) => {
          console.log(res)
        },
        fail: (err) => {
          console.log('sendSocketMessage', '失败')
        }
      })
      var list = [];
      list = this.data.newsList;
      var temp = {
        'message': _this.data.input,
        'date': utils.formatTime(new Date()),
        type: 0
      };
      list.push(temp);
      this.setData({
        newsList: list,
        input: null
      })

      this.scrollBottom()
      //  表情选择隐藏
      this.setData({
        emotionVisible: false,
      })

    }

    //  this.bottom()
    const client = wx.getSystemInfoSync().windowHeight // 获取当前窗口的高度
    console.log(client, 'shurugaodu')

  },
  bindChange: function (res) {
    this.setData({
      input: res.detail.value,
    })
  },
  back: function () {
    wx.closeSocket();
    console.log('连接断开');
  },
  emotionChange: function () {
    this.setData({
      emotionVisible: !this.data.emotionVisible
    })
  },
  addemotion: function (e) {
    console.log(e.currentTarget.dataset.index, "点了设默默")
    let {
      connectemoji,
      input
    } = this.data
    if (input) {
      input = input + connectemoji[e.currentTarget.dataset.index];
    } else {
      input = connectemoji[e.currentTarget.dataset.index]
    }

    console.log(input, '输入框额值')
    this.setData({
      input
    })
  },
  // 公共聚焦方法，方法比较笨，但是过度效果平滑流畅
  bottom: function () {

    var that = this;

    // 获取元素的高度
    let query = wx.createSelectorQuery();
    query.select('.news').boundingClientRect(rect => {
      //获取到元素
      let scrollTop = rect.height;
      this.setData({
        scrollTop
      })
    }).exec();

    console.log(this.data.scrollTop, 'hahah')

    wx.pageScrollTo({
      // scrollTop: this.data.scrollTop + 30,
      scrollTop: 10000,
      // duration: 0
    })
  },
})