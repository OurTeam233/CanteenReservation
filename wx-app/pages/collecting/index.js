import { request } from "../../utils/request"

// pages/collecting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: 'https://img13.360buyimg.com/seckillcms/s280x280_jfs/t1/201538/1/15733/203257/61922484E96bab620/bc25dc3d9ddfdd57.jpg.webp',
    sales: 300,
    perCost: 10,
    score: 4.4,
    description: "描述描述描述描述描述描述描述描述描述描述描述描述",
    tagList: ['热销', '新品', '推荐', '爆款'],
    navUrl: '../information/index',
    collect:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectStore()
  },

  /**
   * 获取收藏店铺信息
  */
  getCollectStore(){
    //获取收藏店铺信息
    request({
      url:'/Collection/Store'
    }).then(res=>{
      console.log(res)
      res.forEach(obj => {
        obj.title = obj.canteen.name + obj.address
        obj.tagList = []
        obj.tags.forEach(tag => obj.tagList.push(tag.name));
        // console.log(obj.id)
        obj.navUrl = `../information/index?id=${obj.id}`
      })
      this.setData({
        collect:res
      })
      console.log(this.data.collect)
    })
  }
})