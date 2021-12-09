// components/goods/goods.js
Component({
  styleIsolation: 'shared',
  /**
   * 组件的属性列表
   */
  properties: {
    proId:{
      type:Number,
      value:0
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
    all: {
      amount: 0,
      money: 0,
      opt: 1,
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击数量变化，并进行单个菜品金额总计算
    onChange(e) {
      //获取参数点菜分数
      const amount = e.detail
      const money = amount*this.properties.proPrice
      const all = {amount, money}
      console.log(amount, money)
      //将参数赋值给this.data.amount
      this.setData({
        all:all
      })
     
      //将点餐次数传给父page
      console.log(this.data.all)
      this.triggerEvent("calculation", {all})
    },

    // stepperPlus(e) {
    //   const amount = this.data.amount + 1
    //   const money = this.data.money
    //   const all = {amount, money}
    //   this.setData({
    //     all,
    //   })
    // },
    // stepperMinus (e) {
    //   const amount = this.data.amount - 1
    //   const money = this.data.money
    //   const all = {amount, money}
    //   this.setData({
    //     all,
    //   })
    // }
  }
})