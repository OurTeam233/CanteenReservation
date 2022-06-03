// pages/community/index.js
import { formatTime } from '../../utils/util.js'
import {request} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    activeSearch: true, // true为寻物启事，false为失物招领
    list: [],// 帖子
    lostFoundList: [],// 失物招领
    type: 1, //页面跳转参数
    keyword: '',
    totalList:[
      '../../image/headPhone/head2.webp',
      '../../image/headPhone/head1.webp',
      '../../image/headPhone/head4.webp',
      '../../image/headPhone/head3.webp'
    ],   //总数据
    goodsLeftList: [
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head1.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        height:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head2.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head3.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head4.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head5.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'女',
        身高:'180cm',
        
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head6.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'女',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head7.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'女',
        身高:'180cm'
      },
    ],		// 商品左边数据
		goodsRightList: [
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head4.webp',
        nikename:'塔菲的猫',
        age:21,
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head3.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head1.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'女',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head2.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },

      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head7.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head5.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head4.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
    ],		// 商品右边数据
    miaiLeftList: [
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head1.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        height:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head2.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head3.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head4.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        image:'../../image/headPhone/head5.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'女',
        身高:'180cm',
        
      },
      {
        image:'../../image/headPhone/head6.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'女',
        身高:'180cm'
      },
      {
        image:'../../image/headPhone/head7.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'女',
        身高:'180cm'
      },
    ],		// 相亲左边数据
		miaiRightList: [
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head4.webp',
        nikename:'塔菲的猫',
        age:21,
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head3.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:1,
        id:2,
        image:'../../image/headPhone/head1.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'女',
        身高:'180cm'
      },
      {
        studentId:5,
        id:4,
        image:'../../image/headPhone/head2.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },

      {
        studentId:5,
        id:4,
        image:'../../image/headPhone/head7.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:5,
        id:4,
        image:'../../image/headPhone/head5.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
      {
        studentId:5,
        id:4,
        image:'../../image/headPhone/head4.webp',
        nikename:'塔菲的猫',
        age:21,
        sex:'男',
        身高:'180cm'
      },
    ],		// 相亲右边数据
    
  },
  query:{}, 
  leftHeight: 0,
  rightHeight: 0,
  currentPage: 1,

  onLoad() {
    this.getDetail();
  },
  onShow() {
    if (this.data.type == 1) {
      this.getDetail();
    }else if(this.data.type==2){
      this.getDetail();
    } else {
      this.requestLostFound();
    }
  },
  // 标签切换事件
  changePage(event) {
    let index = event.detail.index + 1
    if (index == 4) {
      index++
    }
    this.currentPage = event.detail.index + 1
    if (this.currentPage == 4) {
      this.currentPage++
    }
    this.setData({
      type: index
    })
    console.log(this.data.type)
    if (this.data.type == 1) {
      this.getDetail();
    }else if(this.data.type==2){
      this.getDetail();
    } else if (this.data.type == 3 || this.data.type == 4) {
      this.requestLostFound();
    } else {
      this.requestMyPost()
    }
  },
  // 搜索
  onClick() {
    console.log(this.data.keyword)
  },
  // 点击失物招领
  tapSearch(event) {
    this.setData({
      activeSearch: false,
      type: 4
    })
    console.log(this.data.type)
    this.requestLostFound()
  },
  // 点击寻物启事
  tapFind(event) {
    this.setData({
      activeSearch: true,
      type: 3
    })
    console.log(this.data.type)
    this.requestLostFound()
  },
  // 搜索框搜索时触发
  onChange(e) {
    console.log(e.detail)
    this.setData({
      keyword: e.detail
    })
  },
  // 搜索框聚焦时触发
  focusSearch() {
    this.setData({
      show: false
    })
  },
  // 搜索框失焦时触发
  blurSearch() {
    this.setData({
      show: true
    })

    const token = wx.getStorageSync('token')
    wx.request({
      url: 'https://121.43.56.241/CanteenWeb/LostFound/Like',
      header: {
        token
      },
      method: "POST",
      data: {
        keyword: this.data.keyword
      },
      success: (result) => {
        console.log(result.data)
        let lostFoundList = result.data
        lostFoundList.forEach(v => {
          v.startDate = formatTime(new Date(v.startDate))
        })
        this.setData({
          lostFoundList
        })
      }
    })
  },
  requestLostFound() {
    const type = this.data.type
    const token = wx.getStorageSync('token')
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/LostFound/Select?types=' + type,
      header: {
        token
      },
      method: "GET",
      success: (result) => {
        console.log(result.data)
        let lostFoundList = result.data
        lostFoundList.forEach(v => {
          v.startDate = formatTime(new Date(v.startDate))
        })
        this.setData({
          lostFoundList
        })
      }
    })
  },
  // 发帖
  navigateToPublish() {
    // console.log(this.data.type)
    let url = ''
    if (this.data.type === 1) {
      url = '../publish/index?currentPage=1'
    } else if (this.data.type === 2) {
      url = '../miaipost/index?currentPage=2'
    } else if (this.data.type === 3) {
      url = '../used/index?currentPage=3'
    } else if (this.data.type === 4) {
      url = '../publishLostFound/index?currentPage=4'
    } else if (this.data.type === 5) {
      wx.showToast({
        title: '我的不能发帖哦',
        icon: "error"
      })
    }

    wx.navigateTo({
      url,
    })
  },
  // 跳转失物招领详情页
  intoLostFoundInfo(e) {
    let id = e.currentTarget.dataset.id
    // 将lostFound中id为id的数据传递提取出来
    let lostFoundInfo = this.data.lostFoundList.find(v => v.id == id)
    console.log(lostFoundInfo)
    wx.setStorageSync("lostFoundInfo", lostFoundInfo)
    wx.navigateTo({
      url: `../lostFoundInfo/index?id=${id}`,
    })
  },


  //根据页面跳转参数，获取不同的页面详细信息
  getDetail() {
    const type = this.data.type
    const token = wx.getStorageSync('token')
    request({
      url: '/Post/Select/' + type,
      data:{
        type,
        token
      }
    }).then(res=>{
      console.log(res)
    })
    // wx.request({
    //   url: 'http://175.178.216.63:8888/CanteenWeb/Post/Select/' + type,
    //   header: {
    //     type,
    //     token
    //   },
    //   method: "GET",
    //   success: (result) => {
    //     console.log(result)
    //     let list = []
    //     result.data.forEach(v => {
    //       let post = {}
    //       post.id = v.id
    //       post.touxiang = v.student.avatarUrl
    //       post.nicheng = v.student.nickName
    //       post.shijian = formatTime(new Date(v.time))
    //       post.neirong = v.content
    //       post.tupian = []
    //       v.pictureList.forEach(p => {
    //         post.tupian.push(p.pictureUrl)
    //       })
    //       list.push(post)
    //     })
    //     this.setData({
    //       list
    //     })
    //     // console.log(this.data.list)
    //   },
    // })
  },
  requestMyPost() {
    request({
      url: '/Post/Select/My'
    }).then(result => {
      console.log(result)
      let list = []
      result.forEach(v => {``
        let post = {}
        post.id = v.id
        post.touxiang = v.student.avatarUrl
        post.nicheng = v.student.nickName
        post.shijian = formatTime(new Date(v.time))
        post.neirong = v.content
        post.tupian = []
        v.pictureList.forEach(p => {
          post.tupian.push(p.pictureUrl)
        })
        list.push(post)
      })
      this.setData({
        list
      })
    })
  },

  //点击展示详情，进行页面跳转
  onClickMiai(e){
    console.log(e.currentTarget.dataset)
    var type = this.data.type//帖子类型
    let id=e.currentTarget.dataset.id
    let studentId = e.currentTarget.dataset.studentid
    console.log(studentId)
    console.log(id)
    // 跳转页面
    wx.navigateTo({
      url: '../minePparticulars/index?type='+type+'&id='+id+'&studentId='+studentId,
    })
  }


  // getDataDom(){
  //   let data = this.data;
  //   console.log(data.totalList)
  //   var query
  //   query = uni.createSelectorQuery().in(this);
  //   console.log(query)
  //   for (let item in data.totalList) {
  //     // 判断两边的高度
  //     leftHeight <= rightHeight ? data.leftList.push(data.totalList[item]) : data.rightList.push(data.totalList[item]);
  //     this.getBoxHeight(data.leftList, data.rightList);
  //   }
  // },
  // getBoxHeight(leftList, rightList) {
  //   return new Promise((resolve, reject) => {
  //     this.data.leftList = leftList
  //     this.data.rightList = rightList
  //     query.select('#dis_left').boundingClientRect();
  //     query.select('#dis_right').boundingClientRect();
  //     // 处理异步问题，没有数据
  //     setTimeout(() => {
  //       query.exec((res) => {
  //         leftHeight = res[0].height; //获取左边列表的高度
  //         rightHeight = res[1].height; //获取右边列表的高度
  //         resolve();
  //       });
  //     })
  //   })
  // }
})