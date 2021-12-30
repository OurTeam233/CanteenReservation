// pages/community/index.js
import { formatTime } from '../../utils/util.js'
import {request} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    // true为寻物启事，false为失物招领
    activeSearch: true,
    // 帖子
    list: [],
    // 失物招领
    lostFoundList: [],
    //页面跳转参数
    type: 1,
    keyword: '',
  },
  currentPage: 1,
  onLoad(){
    this.getDetail();
  },
  onShow () {
    console.log("show")
    if (this.data.type == 1 || this.data.type == 2) {
      this.getDetail();
    } else {
      this.requestLostFound();
    }
  },
  // 标签切换事件
  changePage (event) {
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
    if (this.data.type == 1 || this.data.type == 2) {
      this.getDetail();
    } else if (this.data.type == 3 || this.data.type == 4) {
      this.requestLostFound();
    } else {
      this.requestMyPost()
    }
  },
  onClick () {
    console.log(this.data.keyword)
  },
  // 点击失物招领
  tapSearch (event) {
    this.setData({
      activeSearch: false,
      type: 4
    })
    console.log(this.data.type)
    this.requestLostFound()
  },
  // 点击寻物启事
  tapFind (event) {
    this.setData({
      activeSearch: true,
      type: 3
    })
    console.log(this.data.type)
    this.requestLostFound()
  },
  // 搜索框搜索时触发
  onChange (e) {
    console.log(e.detail)
    this.setData({
      keyword: e.detail
    })
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

    const token = wx.getStorageSync('token')
    wx.request({
      url: 'https://121.43.56.241/CanteenWeb/LostFound/Like',
      header: { token },
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
      url: 'https://121.43.56.241/CanteenWeb/LostFound/Select?types=' + type,
      header: { token },
      method: "POST",
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
  navigateToPublish () {
    let url = ''
    if (this.data.type === 1) {
      url = '../publish/index?currentPage=1'
    } else if (this.data.type === 2) {
      url = '../publish/index?currentPage=2'
    } else if (this.data.type === 3) {
      url = '../publishLostFound/index?currentPage=3'
    } else if (this.data.type === 4) {
      url = '../publishLostFound/index?currentPage=4'
    } else if (this.data.type === 5) {
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
  intoLostFoundInfo (e) {
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
  getDetail(){
    const type = this.data.type
    const token = wx.getStorageSync('token')
    wx.request({
      url: 'https://121.43.56.241/CanteenWeb/Post/Select?type='+type,
      header:{token},
      method: "POST",
      success: (result) => {
        console.log(result.data)
        let list = []
        result.data.forEach(v => {
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
      },
    })
  },
  requestMyPost () {
    request({
      url: '/Post/Select/My'
    }).then(result => {
      console.log(result)
      let list = []
      result.forEach(v => {
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
  }
})