// components/zuixin/zuixin.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // true是浏览帖子，false是表白墙帖子
    proUsedFor: {
      type: Boolean,
      value: true
    },
    proList: {
      type: Array,
      value: []
    },
    proClickable: {
      type: Boolean,
      value: true
    },
    proTags: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 预览图片
    tapImage (event) {
      // 帖子编号
      const {index} = event.target.dataset
      // 当前帖子的所有信息
      const listIndex = this.properties.proList[index]
      // 图片数组
      const photoList = listIndex.tupian
      // 当前图片编号
      const photoIndex = event.target.dataset.photoindex
      wx.previewImage({
        current: photoList[photoIndex],
        urls: photoList
      })
    },
    // 进入帖子详情
    intoPost (event) {
      if (!this.properties.proClickable) {
        return
      }
      // 跳转到帖子详情页
      // wx.navigateTo({
      //   url: `../../pages/posts/index?postId=${1}`
      // })
      console.log(this.properties.proList);
    },
    // 点赞相关逻辑
    tapLike (event) {
      // console.log(event)
      let proList = this.properties.proList
      let index = event.currentTarget.dataset.index
      this.properties.tapLike=!this.properties.tapLike
      let postId = proList[index].id
      console.log(postId);
      const token = wx.getStorageSync('token')
      wx.request({
        url: 'http://175.178.216.63:8888/CanteenWeb/Post/like?postId=' + postId,
        header: {
          token
        },
        method: "POST",
        success: (result) => {
          console.log(result)
        }
      })
      proList[index].likeNum++
      this.setData({
        proList
      })
     console.log(proList);
    }
  }
})
