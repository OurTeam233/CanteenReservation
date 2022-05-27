// index.js
var msg = null;
Page({
  data: {
    scrollTop: '',
    list: []    // 聊天内容
  },

  onLoad: function(){
    // 开始连接服务器socket
    wx.connectSocket({
      url: 'ws://175.178.216.63:8888/CanteenWeb/Websocket/1'  // 服务器地址
    })
    // 连接成功监听
    wx.onSocketOpen((result) => {
      console.log('连接建立');
    })
    // 服务器消息发送监听
    wx.onSocketMessage((msg) => {
      var list = this.data.list;
        list.push({
          role: 'server',
          content: msg.data
        });
        this.setData({
          list: list
        })
        this.rollingBottom();
    })
    // 连接错误监听
    wx.onSocketError((error) => {
      console.log(error);
    })
  },

  // 聊天输入监听
  bindChange: function(e){
    msg = e.detail.value;
  },

  send:function(){
    wx.sendSocketMessage({
      data: msg,
      success: res=> {
        var list = this.data.list;
        list.push({
          role: 'me',
          content: msg
        });
        this.setData({
          list: list
        })
        this.rollingBottom();
      }
    })
  },

  // 聊天内容始终显示在最低端
  rollingBottom(e) {
    wx.createSelectorQuery().selectAll('.list').boundingClientRect(rects => {
      rects.forEach(rect => {
        this.setData({
          scrollTop: rect.bottom
        })
      })
    }).exec()
  }
})
