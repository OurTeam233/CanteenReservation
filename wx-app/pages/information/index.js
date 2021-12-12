
// index.js
import {
  request
} from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //店铺信息
    store:[],
    //左侧菜单列表
    leftMenuList:[],
    //右侧菜品列表
    rightContent:[],
    //定义购物车数组
    cart:[],
    //接口返回数据（所有分类菜品）
    cates:[],

    // 评分
    grade: '4',
    // logo的url
    logoUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
    // 左侧导航栏被选中的元素
    activeKey: 0,
    // 商品图片的url
    imageURL: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
    // 选中商品的总价值
    sumPrice: "99.00",
    // 选中商品的数量
    dishesNumber: 10,
    // 是否展开全部商品
    showAllSelections: false,
    // 左侧菜单被选中的id
    leftIndex: 0,
  },
  //接口数据要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
  },



  //事件加载
  onLoad (options) {
    // console.log(options)
    //获取上一个页面参数
    this.QueryParams.query = options.id;
    this.getMenu()
  },
  onReady () {
    // console.log(this.data.cates)
    // let rightContent = this.data.cates[0].dishes;
    // this.setData({
    //   rightContent,
    // })
  },
  //获取店铺数据
  getCanteenList(){
    request({
      url: '/Store?storeId=4'
    }).then(
      res => {
        // console.log(res)
        this.Store=res
        //将数据存入本地中
        wx.setStorageSync('store', {time:Date.now(),data:this.Store})
        this.setData({
          store:res,
        })
    })
  },
  //获取店铺菜品数据
  getMenu(){
    request({
      url: `/Dishes?storeId=1`,
    }).then(
      res => {
        let cates = res
        //构造左侧菜单数据
        let leftMenuList = cates.map(v=>v.name);
        // 解析出所有菜品并加入num字段
        cates.forEach(obj => {
          obj.dishes.forEach(v=>{
            v.num = 0
          })
        })
        //构造右侧商品数据
        let rightContent = cates[0].dishes;
        this.setData({
          leftMenuList,
          rightContent,
          cates
        })
      }
    )
  },
  // 触摸左侧菜单导航栏
  handleMenuNavigation(event) {
    /*
    1 获取被点击的标题的索引
    2 给data里面的index赋值
    3 根据不同的索引进行渲染
    */
    let rightContent = this.data.cates[event.detail].dishes;
    console.log(rightContent)
    this.setData({
      rightContent,
      leftIndex: event.detail
    })
  },
  // 展开全部以选中的菜品
  spreadAllSelectedGoods(event) {
    this.setData({
      showAllSelections: true
    })
  },
  // 关闭全部以选中的菜品
  closeAllSelectedGoods(event) {
    this.setData({
      showAllSelections: false
    })
  },
  // 点击选择好了
  tapSubmit(event) {
    wx.navigateTo({
      url: '/pages/appointment/index'
    })
  },
  // 监听步进器的改变
  handleStepperChange(e) {
    let id = e.target.dataset.id
    let value = e.detail
    console.log(e.detail)
    let temp = this.data.cates
    this.data.cates.forEach(obj=>{
      obj.dishes.forEach(v=>{
        if (v.id === id) {
          v.num = value
        }
      })
    })
    let rightContent = this.data.cates[this.data.leftIndex].dishes;
    this.setData({
      rightContent,
      cates:temp
    })
  }
})