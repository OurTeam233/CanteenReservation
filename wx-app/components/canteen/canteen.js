// components/canteen/canteen.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageURL: { // 图片地址
      type: String,
      value: ""
    },
    sales: {    // 月售
      type: Number,
      value: 0
    },
    perCost: {  // 人均消费
      type: Number,
      value: 0
    },
    score: {    // 评分
      type: Number,
      value: 0
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

  }
})
