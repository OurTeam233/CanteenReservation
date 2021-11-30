// components/canteen/canteen.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propertyImageURL: { // 图片地址
      type: String,
      value: '',
    },
    propertySales: {    // 月售
      type: Number,
      value: 0,
    },
    propertyPerCost: {  // 人均消费
      type: Number,
      value: 0,
    },
    propertyScore: {    // 评分
      type: Number,
      value: 0,
    },
    propertyDescription: { // 描述信息
      type: String,
      value: '',
    },
    propertyTagList: { // 标签列表}
      type: Array,
      value: [],
    },
    propertyNavUrl: {  // 跳转地址
      type: String,
      value: '',
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    description: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击跳转
    navTo (event) {
      wx.navigateTo({
        url: this.data.propertyNavUrl,
      })
    },
  },
  lifetimes: {
    ready: function () {
      // 对描述信息进行处理
      this.setData({
        propertyDescription: this.propertyDescription,
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 监听器
  observers: {
    // 对描述信息做处理
    'propertyDescription': function (propertyDescription) {
      if (propertyDescription && propertyDescription.length > 0) {
        let description = '\"' + propertyDescription.substr(0, 9) + '\"'
        this.setData({
          description: description,
        })
      }
    },
  },
})
