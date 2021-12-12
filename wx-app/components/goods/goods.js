// components/goods/goods.js
Component({
  styleIsolation: 'shared',
  /**
   * 组件的属性列表
   */
  properties: {
    //菜品id
    proId: {
      type: Number,
      value: 0,
    },
    //菜品图片
    proImageURL: {
      type: String,
      value: '',
    },
    //菜品名称
    proMenuName: {
      type: String,
      value: '',
    },
    //菜品原价
    proPrice: {
      type: Number,
      value: 0,
    },
    //菜品vip价
    proVIPPrice: {
      type: Number,
      value: 6,
    },
    //菜品月售
    proMonthSales: {
      type: Number,
      value: 0,
    },
    proNumber: {
      type: Number,
      value: 0,
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapPlus () {
      this.properties.proDishes.forEach(obj => {
        if (obj.id === this.properties.proId) {
          obj.num++
        }
      })
      this.triggerEvent('handleItem', this.properties.proDishes)
    },
    tapMinus () {
      this.properties.proDishes.forEach(obj => {
        if (obj.id === this.properties.proId) {
          obj.num--
        }
      })
      this.triggerEvent('handleItem', this.properties.proDishes)
    }
  },
})