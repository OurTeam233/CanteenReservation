// components/goods/goods.js
Component({
  styleIsolation: 'shared',
  /**
   * 组件的属性列表
   */
  properties: {
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
      type: String,
      value: '',
    },
    //菜品月售
    proMonthSales: {
      type: Number,
      value: '',
    },
    //菜品总金额
    proMoney: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //菜品支付价格
    num: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击数量变化，并进行单个菜品金额总计算
    onChange(e) {
      //获取参数点菜分数
      const num = e.detail
      //将参数赋值给this.data.num
      this.setData({
        num:num,
      })
      console.log(this.data.num)
      //将点餐次数传给父page
      this.triggerEvent("calculation",this.data.num)
    }
  }
})