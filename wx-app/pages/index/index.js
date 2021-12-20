// index.js
import {
  request
} from '../../utils/request'
Page({
  data: {
    current: 0,
    //轮播样式数组
    slideshowArray: [],
    //导航信息
    navigation:[],
    //导航对应的数组信息
    arrayList: [],
    num: 0,
  },  

  onLoad() {
    /*
    1 先判断有无旧数据
    2 没有数据就直接发送请求
    3 有旧的数据同时没有过期就是使用本地存储的旧数据
     */

     // 1 获取轮播本地存储数据
     const SlideshowArray = wx.getStorageSync('slideshowArray');
     //判断 
     if(!SlideshowArray){
       //不存在，发送请求获取数据
       this.getSlideshow()
     }else{
       //有旧数据 定义过期时间1000s
       if((Date.now()-SlideshowArray.time)>1000*100){
         //重新发送请求数据
         this.getSlideshow();
       }else{
         //可以使用旧数据
         this.data.slideshowArray=SlideshowArray
       }
     }

     // 1 获取详细信息本地存储数据
     const ArrayList = wx.getStorageSync('arrayList');
     //判断 
     if(!ArrayList){
       //不存在，发送请求获取数据
       this.getDetial();
     }else{
       //有旧数据 定义过期时间1000s
       if((Date.now()-ArrayList.time)>1000*1000){
         //重新发送请求数据
         this.getDetial();
       }else{
         //可以使用旧数据
         this.data.arrayList=ArrayList
       }
     }
  },

  //轮播数据获取
  getSlideshow(){
     //获取缓存里面的token
     const token = wx.getStorageSync('token');
    //发送请求
    request({
      url: '/Slideshow',
    }).then(res=>{
        this.SlideshowArray = res
        //把接口数据存入本地
        wx.setStorageSync('slideshowArray', {time:Date.now(),data:this.SlideshowArray})
        this.setData({
          slideshowArray:res,
        })
      })
  },

  //获取详细信息
  getDetial(){
    request({
      url: '/StoreList',
    }).then(
      res => {
        //把接口数据存入本地中
        this.ArrayList=res
        wx.setStorageSync('arrayList', {time:Date.now(),data:this.ArrayList})
        res.forEach(obj => {
          obj.title = obj.canteen.name + obj.address
          obj.tagList = []
          obj.tags.forEach(tag => obj.tagList.push(tag.name));
          console.log(obj.id)
          obj.navUrl = `../information/index?id=${obj.id}`
        })
        this.setData({
          arrayList: res
        })
      })
  },
  //点击搜索框事件
  handleToSearch() {
    wx.navigateTo({
      url: `../search/index`
    })
  },
  //点击导航——菜品分类事件
  onChange(e) {
    //获取参数
    const operation = e.currentTarget.dataset.operation;
    console.log(operation)
    //发送请求
    request({
      url: '/StoreList?canteenId='+operation
    }).then(
      res => {
        // console.log(res)
        res.forEach(obj => {
          obj.title = obj.canteen.name + obj.address
          obj.tagList = []
          obj.tags.forEach(tag => obj.tagList.push(tag.name));
          obj.navUrl = `../information/index?id=${obj.id}`
        })
        this.setData({
          arrayList: res
        })
      })
    // //将参数赋值给this.data.num
    // this.setData({
    //   num: operation,
    // })
    // console.log(this.data.num)
  },

  //点击导航——推荐菜品事件
  onCommand(e) {
    //获取参数
    const operation = e.currentTarget.dataset.operation;
    console.log(operation)
    //发送请求
    request({
      url: '/StoreList?tagsId='+operation
    }).then(
      res => {
        console.log(res)
        res.forEach(obj => {
          obj.title = obj.canteen.name + obj.address
          obj.tagList = []                               
          obj.tags.forEach(tag => obj.tagList.push(tag.name));
          obj.navUrl = `../information/index?id=${obj.id}`
        })
        this.setData({
          arrayList: res
        })
      })
  },

})