// index.js
import { request } from '../../utils/request'
Page({
  data: {
    num: 0,
    arrayList: [],
  },
  onLoad() {
    // 页面加载时发送请求
    request({
      url: '/SelectStoreServlet'
    }).then(
      res => {
        console.log(res)
        res.forEach(obj => {
          obj.title = obj.canteen.name + obj.address
          obj.tagList = []
          obj.tags.forEach(tag => obj.tagList.push(tag.name));
          obj.navUrl = `../information/index?id=${this.data.arrayList.id}`
        })
        this.setData({
          arrayList: res
        })
        console.log(this.data.arrayList)
      }
    )
  },
  handleToSearch() {
    wx.navigateTo({
      url: `../search/index`
    })
  },
  onChange(e) {
    //获取参数
    const operation = e.currentTarget.dataset.operation;
    //将参数赋值给this.data.num
    this.setData({
      num: operation,
    })
    console.log(this.data.num)

    // //发送请求

  }
})