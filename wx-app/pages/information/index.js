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
    store: [],
    //左侧菜单列表
    leftMenuList: [],
    //右侧菜品列表
    rightContent: [],
    //定义购物车数组
    carts: [],
    //接口返回数据（所有分类菜品）
    cates: [],

    // 评分
    grade: '4',
    // logo的url
    logoUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
    // 左侧导航栏被选中的元素
    activeKey: 0,
    // 商品图片的url
    imageURL: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
    // 选中商品的总价值
    sumPrice: 0,
    // 选中商品的数量
    dishesNumber: 0,
    // 是否展开全部商品
    showAllSelections: false,
    // 左侧菜单被选中的id
    leftIndex: 0,
    //是否跳转选好了界面
    flag:'false',
  },
  //接口数据要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  //事件加载
  onLoad(options) {
    console.log(options)
    //获取上一个页面参数
    this.QueryParams.query = options.id;
    //或去缓存数据
    this.getCanteenList()
    this.getMenu()
    this.getCount()
   
  },
  onReady() {
    // console.log(this.data.cates)
    // let rightContent = this.data.cates[0].dishes;
    // this.setData({
    //   rightContent,
    // })
  },
  //获取店铺数据
  getCanteenList() {
    request({
      url: '/Store?storeId='+this.QueryParams.query
    }).then(
      res => {
        // console.log(res)
        this.Store = res
        // console.log(res.score)
        const score = res.score.toFixed(1)
        res.score = score
        //将店铺数据存入本地中
        wx.setStorageSync('store', this.Store)
        this.setData({
          store: res,
        })
      })
  },
  //获取店铺菜品数据
  getMenu() {
    // //判断缓存中是否有数据
    const againCarts = wx.getStorageSync('againCarts')
    request({
        url: `/Dishes?storeId=`+this.QueryParams.query
      }).then(
        res => {
          let cates = res
          console.log(res)
          //将店铺菜品数据写入本地
          wx.setStorageSync('cates', res)
          //构造左侧菜单数据
          let leftMenuList = cates.map(v => v.name);
          // 解析出所有菜品并加入num字段
          const dishesNumber = 0;
          cates.forEach(obj => {
            obj.dishes.forEach(v => {
              v.num = 0;
              for(const item of againCarts){
                if(item.dishesId == v.id){
                  v.num = parseInt(item.num)
                  this.dishesNumber = this.dishesNumber + v.num
                  this.sumPrice = this.sumPrice + v.num*v.price
                }
              }
            })
          })
          console.log(cates)
          //将数据存入本地
          wx.setStorageSync('cates', cates)
          //构造右侧商品数据
          let rightContent = cates[0].dishes;
          this.setData({
            leftMenuList,
            rightContent,
            cates,
            dishesNumber:this.dishesNumber,
            sumPrice:this.sumPrice
          })
        }
        
      );
      wx.setStorageSync('againCarts', [])
  },
  // 触摸左侧菜单导航栏
  handleMenuNavigation(event) {
    /*
    1 获取被点击的标题的索引
    2 给data里面的index赋值
    3 根据不同的索引进行渲染
    */
    let rightContent = this.data.cates[event.detail].dishes;
    // console.log(rightContent)
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
    //判断是否进行跳转，如果购车是空的，弹出弹窗，无法跳转，否则进行调换
    this.flag = 'false'
    const cates = this.data.cates;
    for (const item1 of cates) {
      for (const item2 of item1.dishes) {
        if (item2.num != 0) {
          this.flag='true'
          break;
        }
      }
    };
    this.setData({
      flag:this.flag
    })
    console.log(this.flag);
    if (!this.data.flag) {
      wx.showToast({
        title: '请先加入购物车', //弹框内容
        icon: 'error', //弹框模式
        duration: 2000 //弹框显示时间
      })
    } else {
      wx.navigateTo({
        url: '/pages/appointment/index'
      })
    }
  },
  // 监听步进器的改变
  handleStepperChange(e) {
    let id = e.target.dataset.id
    let value = e.detail
    console.log(e.detail)
    let temp = this.data.cates
    temp.forEach(obj => {
      obj.dishes.forEach(v => {
        if (v.id === id) {
          v.num = value
        }
      })
    })
    // console.log(temp)
    let rightContent = this.data.cates[this.data.leftIndex].dishes;
    this.setData({
      rightContent,
      cates: temp
    })
    // console.log(this.data.cates)
    this.getCount();
    //存入本地
    wx.setStorageSync('cates', this.data.cates)
  },
  //计算总价格和数量
  getCount() {
    const carts = this.data.cates
    console.log(carts);
    this.sumPrice = 0;
    this.dishesNumber = 0;
    for (const item1 of carts) {
      for (const item2 of item1.dishes) {
        if (item2.num != 0) {
          this.dishesNumber += item2.num
          this.sumPrice += item2.num * item2.price;
        }
      }
    }

    this.setData({
      sumPrice: this.sumPrice,
      dishesNumber: this.dishesNumber
    })
    //存入本地
    wx.setStorageSync('sumPrice', this.data.sumPrice)
    wx.setStorageSync('dishesNumber', this.data.dishesNumber)
  },
  //清除购物车
  clearCates() {
    const cates = this.data.cates;
    for (const item1 of cates) {
      for (const item2 of item1.dishes) {
        item2.num = 0;
      }
    }
    this.setData({
      sumPrice: 0,
      dishesNumber: 0,
      cates:cates,
    })
    wx.setStorageSync('cates', this.data.cates);
    wx.setStorageSync('sumPrice', this.data.sumPrice);
    wx.setStorageSync('dishesNumber', this.data.dishesNumber);
    this.getMenu();
    this.closeAllSelectedGoods();
  },
})