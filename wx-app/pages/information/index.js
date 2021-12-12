
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
  },
  //接口数据要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
  },
 
  

  //事件加载
  onLoad: function (options) {
    // console.log(options)
    //获取上一个页面参数
    this.QueryParams.query = options.id;
    //添加缓存效果
    /*
    1 先判断本地是否有旧数据
    2 没有旧数据，直接发送请请求
    3 有旧数据，同时没有过期就是用本地旧数据，否则就发送请求
     */
    //1 本地存储数据(菜品数据)
    const Cates = wx.getStorageSync('cates')
    //2 判断
    if(!Cates){
      //不存在，发送请求
      this.getMenu();
    }else{
      //有旧数据 判断是否时间过期（过期时间10s）
      if(Date.now()-Cates.time>1000*10){
        //时间过期重新发送请求
        this.getMenu();
      }else{
        //没有过期，使用旧的数据
        this.data.cates = Cates.data;
        //构造左侧菜单数据
        let leftMenuList = this.data.cates.map(v=>v.name);
        //构造右侧商品数据
        let rightContent = this.data.cates[0].dishes;
        this.setData({
          leftMenuList,
          rightContent,
        })
      }
    }
    //1 本地存储数据(店铺数据)
    const Store = wx.getStorageSync('store')
    //2 判断
    if(!Store){
      //不存在，发送请求
      this.getCanteenList()
    }else{
      //有旧数据 判断是否时间过期（过期时间10s）
      if(Date.now()-Cates.time>1000*10){
        //时间过期重新发送请求
        this.getCanteenList()
      }else{
        //没有过期，使用旧的数据
        this.Store = Store.data;
        this.setData({
          store:Store
        })
      }
    }
   
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
      url: '/Dishes?storeId=1',
    }).then(
      res => {
        // console.log(res)
        this.data.cates = res
        // console.log(res)
        //把接口数据存入本地中
        wx.setStorageSync('cates', {time:Date.now(),data:this.data.cates})
        //构造左侧菜单数据
        let leftMenuList = this.data.cates.map(v=>v.name);
        //构造右侧商品数据
        let rightContent = this.data.cates[0].dishes;
        this.setData({
          leftMenuList,
          rightContent,
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
    const index =  event.detail
    const rightContent = this.data.cates[index].dishes;
    this.setData({
      rightContent,
    })
  },
  //点击步进器
  handleItem(e){
    // console.log(e.detail)
    const v = e.detail;
    const id=v.id;
    //判断菜品是否在购物菜品中
    const index = this.data.cart.findIndex(item=>item.id===id);
    if(index===-1){
      //不存在
      this.data.cart.push(v);
      // console.log(this.data.cart);
    }else{
      //存在
      //判断是否删除数据v.num是否为0
      if(v.num===0){
        //删除数据
        this.data.cart.splice(index,1)
      }else{
        this.data.cart[index].num=v.num
      }
    }
    console.log(this.data.cart)
  },
  // 展开全部以选中的菜品
  spreadAllSelectedGoods(event) {
    this.setData({
      showAllSelections: true
    })
  },

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
  /**
   * 生命周期函数--监听页面加载
   */
 

 

})