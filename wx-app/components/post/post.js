// components/zuixin/zuixin.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    proUsedFor: {
      type: Boolean,
      value: true
    },
    proList: {
      type: Array,
      value: []
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
    }
  }
})
