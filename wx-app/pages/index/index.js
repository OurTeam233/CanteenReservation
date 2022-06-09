// index.js
import {
  request
} from '../../utils/request'

const qiniuUploader = require("../../utils/qiniuUploader");
const app = getApp()
// var url = app.globalData.url

Page({
  data: {
    current: 0,
    //轮播样式数组
    slideshowArray: [],
    //导航信息
    navigation: [],
    //导航对应的数组信息
    arrayList: [],
    num: 0,
    keyWord: " "
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  onLoad() {
    this.getSlideshow();
    this.getDetial();
  },
  //轮播数据获取
  getSlideshow() {
    //获取缓存里面的token
    const token = wx.getStorageSync('token');
    //发送请求
    request({
      url: '/Slideshow',
    }).then(res => {
      this.SlideshowArray = res
      //把接口数据存入本地
      wx.setStorageSync('slideshowArray', {
        time: Date.now(),
        data: this.SlideshowArray
      })
      this.setData({
        slideshowArray: res,
      })
    })
  },
  //获取详细信息
  getDetial() {
    request({
      url: '/StoreList',
    }).then(
      res => {
        //把接口数据存入本地中
        this.ArrayList = res
        console.log(res)
        wx.setStorageSync('arrayList', {
          time: Date.now(),
          data: this.ArrayList
        })
        res.forEach(obj => {
          obj.title = obj.canteen.name + obj.address
          obj.tagList = []
          obj.score = obj.score.toFixed(1)
          obj.tags.forEach(tag => obj.tagList.push(tag.name));
          // console.log(obj.id)
          obj.navUrl = `../information/index?id=${obj.id}`
        })
        this.setData({
          arrayList: res
        })
      })
  },
  //点击搜索框事件
  handleToSearch(e) {
    //获取输入框内容
    const keyWord = e.detail
    //发送请求
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Store/Like',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        keyword: keyWord
      },
      method: "POST",
      success: (res) => {
        console.log(res.data.data)
        res.data.data.forEach(obj => {
          obj.title = obj.canteen.name + obj.address
          obj.tagList = []
          obj.score = obj.score.toFixed(1)
          obj.tags.forEach(tag => obj.tagList.push(tag.name));
          obj.navUrl = `../information/index?id=${obj.id}`
        })
        this.setData({
          arrayList: res.data.data
        })
        console.log(this.data.arrayList)
      },
    })

  },
  //点击导航——菜品分类事件
  onChange(e) {
    //获取参数
    const operation = e.currentTarget.dataset.operation;
    // console.log(operation)
    //发送请求
    request({
      url: '/StoreList?canteenId=' + operation
    }).then(
      res => {
        // console.log(res)
        res.forEach(obj => {
          obj.title = obj.canteen.name + obj.address
          obj.tagList = []
          obj.score = obj.score.toFixed(1)
          obj.tags.forEach(tag => obj.tagList.push(tag.name));
          obj.navUrl = `../information/index?id=${obj.id}`
        })
        this.setData({
          arrayList: res
        })
        // console.log(res)
      })
  },

  //点击导航——推荐菜品事件
  onCommand(e) {
    //获取参数
    const operation = e.currentTarget.dataset.operation;
    // console.log(operation)
    //发送请求
    request({
      url: '/StoreList?tagsId=' + operation
    }).then(
      res => {
        console.log(res)
        res.forEach(obj => {
          obj.title = obj.canteen.name + obj.address
          obj.tagList = []
          obj.score = obj.score.toFixed(1)
          obj.tags.forEach(tag => obj.tagList.push(tag.name));
          obj.navUrl = `../information/index?id=${obj.id}`
        })
        this.setData({
          arrayList: res
        })
      })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //重置数组
    this.setData({
      arrayList: []
    })
    //获取店铺数据
    request({
      url: '/Store/Recommend'
    }).then(res => {
      this.ArrayList = res
      wx.setStorageSync('arrayList', res)
      res.forEach(obj => {
        obj.title = obj.canteen.name + obj.address
        obj.tagList = []
        obj.score = obj.score.toFixed(1)
        obj.tags.forEach(tag => obj.tagList.push(tag.name));
        // console.log(obj.id)
        obj.navUrl = `../information/index?id=${obj.id}`
      })
      this.setData({
        arrayList: res
      })
    })
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
  //推荐菜品
  recommend() {
    request({
      url: '/Store/Recommend'
    }).then(
      res => {
        console.log(res)
        res.forEach(obj => {
          obj.title = obj.canteen.name + obj.address
          obj.tagList = []
          obj.score = obj.score.toFixed(1)
          obj.tags.forEach(tag => obj.tagList.push(tag.name));
          obj.navUrl = `../information/index?id=${obj.id}`
        })
        this.setData({
          arrayList: res
        })
      })
  },


})