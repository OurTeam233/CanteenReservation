Page({

  data: {
    isAttention: true,
    i: 0,
    // isFollow:false,
    myFollowList: []
  },


  onLoad(){
    this.getAttentionList();
  },




  // 可以id来进行判断
  toAttention (e) {
    // 获取点击的id
    let index = e.currentTarget.dataset.id
    console.log(index)
    let isFollow = this.data.myFollowList[index].isFollow;
    let studentId = this.data.myFollowList[index].studentId;
    console.log(studentId);
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/focus/' + studentId,
      header: {token},
      method: "PUT",
      success: (res) => {
        console.log("ok")
      },
      error: (res) => {

      }
    })
    
    this.setData({
      [`myFollowList[${index}].isFollow`]: !isFollow
    })
    
    
  },


  //获取关注列表
  getAttentionList(){
    let studentId = wx.getStorageSync('studentId');
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/focus/' + studentId,
      header: {token},
      method: 'GET',
      success: (res) => {
        console.log("ok");
        console.log(res.data.data);
        let myFollowList = [];
        let resList = res.data.data;
        resList.forEach(function(item,index){
          let {avatarUrl, id, nickname, signature} = item.student2;
          if(signature == null){
            signature = '该用户什么都没写'
          }
          myFollowList.push({
            id: index,
            studentId: id,
            nickname,
            signature,
            avatarUrl,
            isFollow: true
          })
        });
        console.log(myFollowList);
        this.setData({
          myFollowList
        })


      },
      error: (res) => {
        console.log("no");
      }
    })

  },

  //私信
  //跳转页面并传递参数给下一个页面
  changeToChatinfo(e) {
    let index = e.currentTarget.dataset.id;
    let studentId = this.data.myFollowList[index].studentId;
    let image = this.data.myFollowList[index].avatarUrl;
    let nick = this.data.myFollowList[index].nickname;
    wx.navigateTo({
      url: '../chatInfo/index?studentId=' + studentId+'&image='+image+'&nike='+nick,
    })
  },


  //跳转到该用户的个人主页
  toPostingRecord(e){
    let index = e.currentTarget.dataset.id;
    let studentId = this.data.myFollowList[index].studentId;
    wx.navigateTo({
      url: '../../pages/minePparticulars/index?studentId=' + studentId,

    })
  },

})