// components/goods/goods.js
Component({
  styleIsolation: 'shared',
  /**
   * 组件的属性列表
   */
  properties: {
    //菜品id
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
      type: Number,
      value:6,
    },
    //菜品月售
    proMonthSales: {
      type: Number,
      value: 0,
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
     //监听到输入值的变化
  onChange(event) {
    // console.log(event.detail);
    const v ={
      id:this.properties.proId,
      num:event.detail,
    }
     //将菜品id和num返回给父页面
      this.triggerEvent('handleItem',v)
  }
  }
})