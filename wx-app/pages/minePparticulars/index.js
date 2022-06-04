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
    // 主贴
    topic: [
      {
        'id': "1",
        'touxiang': '../../image/headPhone/head1.webp',
        'nicheng': '王二傻子',
        'dingwei': '/images/zuixin/app_img_location.png',
        'shijian': '32分钟前',
        'neirong': '如果哪一天你突然想起我，请拿起手机拨通我的号码，哪怕我再忙再没空，只要你一句“我请你吃饭”，我都会风雨无阻的出现在你的面前。这是我对朋友一生一世的承诺！',
        'tupian': [
          'data:../../../../image/commityPhone/commity15.webp',
          'data:../../../../image/commityPhone/commity16.webp',
          'data:../../../../image/commityPhone/commity17.webp',
        ],
        'liulantu': '/images/zuixin/eye.png',
        'pinglunliang': '450',
        'dianzanliang': '560',
      },
    ],
    // 评论
    comment: [
      {
        'id': "1",
        'touxiang': '../../image/headPhone/head5.webp',
        'nicheng': '不是傻子',
        'dingwei': '/images/zuixin/app_img_location.png',
        'shijian': '32分钟前',
        'neirong': '想要的是什么呢？真实的状态是怎样的呢？有时候见你只是想要个合理的理由',
        'tupian': [
        ],
        'liulantu': '/images/zuixin/eye.png',
        'pinglunliang': '450',
        'dianzanliang': '560',
      },
      {
        'id': "2",
        'touxiang': '../../image/headPhone/head4.webp',
        'nicheng': '无非',
        'dingwei': '/images/zuixin/app_img_location.png',
        'shijian': '32分钟前',
        'neirong': '二话不说走起',
        'tupian': [
        ],
        'liulantu': '/images/zuixin/eye.png',
        'pinglunliang': '450',
        'dianzanliang': '530',
      },
      {
        'id': "3",
        'touxiang': '../../image/headPhone/head7.webp',
        'nicheng': '吱吱吱吱',
        'dingwei': '/images/zuixin/app_img_location.png',
        'shijian': '32分钟前',
        'neirong': '多年以后的重逢，是喜悦还是遗憾呢',
        'tupian': [
        ],
        'liulantu': '/images/zuixin/eye.png',
        'pinglunliang': '450',
        'dianzanliang': '500',
      },
      {
        'id': "4",
        'touxiang': '../../image/headPhone/head6.webp',
        'nicheng': '看雪',
        'dingwei': '/images/zuixin/app_img_location.png',
        'shijian': '32分钟前',
        'neirong': '珍惜珍惜，虽然这是个段子但反映这个当下社会常态',
        'tupian': [
        ],
        'liulantu': '/images/zuixin/eye.png',
        'pinglunliang': '450',
        'dianzanliang': '660',
      },
    ],
    

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
  
  

  // //获取缓存中的个人信息
  // getUserInfo(){
  //   let userInfo = wx.getStorageSync('userInfo');
  //   this.setData({
  //     username: userInfo.nickName,
  //     headImgUrl: userInfo.avatarUrl,
  //     gender: userInfo.gender,
  //     signature: userInfo.signature
  //   })
  // },

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
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Post/Select/2/1',
      header: {token},
      method: "GET",
      success: (res) => {
        console.log(res)
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