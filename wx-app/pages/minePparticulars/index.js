// pages/minePparticulars/index.js
import Notify from '@vant/weapp/notify/notify';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前页的id
    item: 0,

    //关于这个页面的学生信息
    //这个页面的学生id
    thisPageStudentId: null,
    //是否了关注页面的主人
    isAtt: false,
    headImgUrl: "../../image/mine/default.png",
    username: '系统用户',
    signature: '该用户什么都没留下',




    //二手数据
    // 发帖数据
    postList: [],
    
    

    // miai中的数据
    backgroundImage: [
      '../../image/information/women3.webp',
      '../../image/information/women.webp',
      '../../image/information/women2.webp'
    ],
    indicatorDots: true,
    vertical: true,
    autoplay: false,
    interval: 2000,
    duration: 2000,
    time: '2020.2.7',

    person: {
      name: '海的味道我知道',
      age: '21',
      sex: '女',
      height: '167cm',
      weight: '56kg',
      address: '江苏南通',
      type: '可爱',
      manifesto: '我能享受平淡，但我也能够经得起风浪',
      hobby:['钢琴','写作业'],
    },
    person1: {
      age: '21~24',
      sex: '男',
      height: '176cm以上',
      condition:'有趣的灵魂',
    }
    
  },

  onReady(){
    this.getUserInfo();
    this.getStudentPosts();
  },

  onLoad: function(e){
    //获取从上个页面传过来的学生id
    this.setData({
      thisPageStudentId: e.studentId
    });

    //查看是否关注了该用户
    this.isAttention();

    //查看发帖
    this.getStudentPosts();
    
  },


  // 标签页的标题栏点击事件
  changeItem: function (e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      item: item
    })
    console.log(this.data.item);
  },
  // 滑动页监听事件
  changeTab: function (e) {
    let current = e.detail.current;
    this.setData({
      item: current
    })
  },


  //获取studentId对应的学生信息
  getUserInfo(){
    let thisPageStudentId = this.data.thisPageStudentId;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/student/' + thisPageStudentId,
      header: {token},
      method: "GET",
      success: (res) => {
        console.log(res.data.data)
        let {avatarUrl, id, nickname, signature} = res.data.data;
        this.setData({
          headImgUrl: avatarUrl,
          username: nickname,
          signature: signature
        })
      },
      error: (res) => {
        console.log("no")
      }

    })
  },



  //获取特定用户的发帖
  getStudentPosts(){
    let _this = this;
    let studentId = this.data.thisPageStudentId;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Post/Select/' + studentId + '/1',
      header: {token},
      method: "GET",
      success: (res) => {
        //返回的结果数组
        let resList = res.data.data;
        let postList = [];
        console.log(resList)
        resList.forEach(function(item, index){
          let {avatarUrl, id, nickname} = item.student;
          let content = item.content;
          let pictureList = item.pictureList;//点赞还没有写
          let postId = item.id;
          let time = item.time;
          let like = item.like;
          
          postList.push({
            id: postId,
            studentId: id,
            touxiang: avatarUrl,
            nicheng: nickname,
            shijian: time,
            neirong: content,
            tupian: pictureList,
            dianzanliang: like
          });

          _this.setData({
            postList
          })

        })

      },
      error: (res) => {

      }
    })
  },

  //查看该用户是否被自己关注
  isAttention(){
    let token = wx.getStorageSync('token');
    let thisPageStudentId = this.data.thisPageStudentId;
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/focus/isFocus/' + thisPageStudentId,
      header: {token},
      method: "GET",
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          isAtt: res.data.data
        })
      }
    })
  },


  //关注    (现在还没获取到当前页面的学生id!!!)
  toAttention (e) {
    // 获取点击的id
    let index = e.currentTarget.dataset.id
    console.log(index)
    let toStudentId = this.data.thisPageStudentId;
    let studentId = wx.getStorageSync('studentId');
    console.log(studentId);
    let token = wx.getStorageSync('token');
    if(studentId == toStudentId){
      Notify({ type: 'warning', message: '不能关注自己' });
    } else {
      wx.request({
        url: 'http://175.178.216.63:8888/CanteenWeb/focus/' +toStudentId,
        header: {token},
        method: "PUT",
        success: (res) => {
          console.log("ok");

          this.setData({
            isAtt: !this.data.isAtt
          })
        },
        error: (res) => {

        }
      })
    }
  },




  //私信
  toMsg(){
    let studentId = wx.getStorageSync('studentId')
    let toStudentId = this.data.thisPageStudentId;
    let image = this.data.headImgUrl;
    let nick = this.data.username;
    
    if(toStudentId == studentId){
      Notify({ type: 'warning', message: '不能私信自己' });
    } else {
      wx.navigateTo({
        url: '../chatInfo/index?studentId=' + toStudentId+'&image='+image+'&nike='+nick,
      })
    }
    
  }






})