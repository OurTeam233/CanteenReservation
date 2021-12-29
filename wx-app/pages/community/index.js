// pages/community/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePage: 1,
    imageList: [
      'https://img.yzcdn.cn/vant/cat.jpeg',
    ],
    imageURL: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
    show: true,
    // true为寻物启事，false为失物招领
    activeSearch: true,
    list: [
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
      {
        'id': "2",
        'touxiang': '../../image/headPhone/head2.webp',
        'nicheng': '孙小贝大大',
        'tianqi': '/images/zuixin/app_img_weather_2.png',
        'shijian': '55分钟前',
        'neirong': '.此刻有谁在世上某处哭， 无缘无故在世上哭， 在哭我。此刻有谁在夜间某处笑， 无缘无故在夜间笑， 在笑我。      此刻有谁在世上某处走， 无缘无故在世上走， 走向我。          此刻有谁在世上某处死， 无缘无故在世上死， 望着我',
        'tupian': [
          'data:../../../../image/commityPhone/commity1.webp',
        ],
        'pinglunliang': '600',
        'dianzanliang': '234',
      },
      {
        'id': "3",
        'touxiang': 'http://img2.imgtn.bdimg.com/it/u=1077287175,1506372161&fm=26&gp=0.jpg',
        'nicheng': '无趣的TA',
        'shijian': '一小时前',
        'neirong': '小区的停车场设计的太差了，简直跟迷宫一样，每次出门都要找好长时间，才能发现我没有车！。',
        'tupian': [
          'data:../../../../image/commityPhone/commity2.webp',
          'data:../../../../image/commityPhone/commity3.webp',
          'data:../../../../image/commityPhone/commity4.webp',
        ],
        'pinglunliang': '567',
        'dianzanliang': '122',
      },
      {
        'id': "4",
        'touxiang': 'http://img5.imgtn.bdimg.com/it/u=1967122488,1967216897&fm=26&gp=0.jpg',
        'nicheng': 'love-me',
        'shijian': '两小时前',
        'neirong': '我不够富，不能像我希望的那样爱你；我不够穷，不能像你希望的那样被你爱，让我们彼此忘却——你是忘却一个对你说来相当冷酷的姓名，我是忘却一种我供养不起的幸福。',
        'tupian': [
        ],
        'pinglunliang': '333',
        'dianzanliang': '111',
      },
      {
        'id': "5",
        'touxiang': '../../image/headPhone/head4.webp',
        'nicheng': '看雪',
        'shijian': '两小时前',
        'neirong': '想看雪，那就去',
        'tupian': [
          'data:../../../../image/commityPhone/commity11.jfif',

        ],
        'pinglunliang': '123',
        'dianzanliang': '11',
      },
      {
        'id': "6",
        'touxiang': '../../image/headPhone/head5.webp',
        'nicheng': '淘气一点',
        'shijian': '两小时前',
        'neirong': '#无文案',
        'tupian': [
          'data:../../../../image/commityPhone/commity14.webp',
          'data:../../../../image/commityPhone/commity13.webp',
          'data:../../../../image/commityPhone/commity12.webp',
          'data:../../../../image/commityPhone/commity18.webp',
        ],
        'pinglunliang': '335',
        'dianzanliang': '117',
      }
    ],
  },
  currentPage: 0,
  // 标签切换事件
  changePage (event) {
    // console.log(event.detail.index)
    this.currentPage = event.detail.index
  },
  onClick () {
    console.log(this.data.value)
  },
  // 点击失物招领
  tapSearch (event) {
    this.setData({
      activeSearch: false,
    })
  },
  // 点击寻物启事
  tapFind (event) {
    this.setData({
      activeSearch: true,
    })
  },
  // 搜索框搜索时触发
  onSearch () {
    console.log(this.data.value)
  },
  // 搜索框聚焦时触发
  focusSearch () {
    this.setData({
      show: false
    })
  },
  // 搜索框失焦时触发
  blurSearch () {
    this.setData({
      show: true
    })
  },
  // 发帖
  navigateToPublish () {
    let url = ''
    // console.log(this.currentPage)
    if (this.currentPage === 0) {
      url = '../publish/index?currentPage=1'
    } else if (this.currentPage === 1) {
      url = '../publish/index?currentPage=2'
    } else if (this.currentPage === 2) {
      url = '../publishLostFound/index?currentPage=3'
    } else if (this.currentPage === 3) {
      wx.showToast({
        title: '我的不能发帖哦',
        icon:"error"
      })
    }

    wx.navigateTo({
      url,
    })
  },
  // 跳转失物招领详情页
  intoLostFoundInfo () {
    wx.navigateTo({
      url: `../lostFoundInfo/index?id=${1}`,
    })
  },

})