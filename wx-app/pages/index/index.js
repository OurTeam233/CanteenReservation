// index.js
Page({
  data: {
    num: 0,
    // 一食堂餐口
    No1array: [{
        title: '一食堂一楼餐口1',
        imageURL: 'https://img13.360buyimg.com/seckillcms/s280x280_jfs/t1/201538/1/15733/203257/61922484E96bab620/bc25dc3d9ddfdd57.jpg.webp',
        sales: 300,
        perCost: 10,
        score: 4.4,
        description: "描述描述描述描述描述描述描述描述描述描述描述描述",
        tagList: ['热销', '新品', '推荐', '爆款'],
        navUrl: '../information/index',
      },
      {
        title: '一食堂一楼餐口1',
        imageURL: 'https://img13.360buyimg.com/seckillcms/s280x280_jfs/t1/201538/1/15733/203257/61922484E96bab620/bc25dc3d9ddfdd57.jpg.webp',
        sales: 300,
        perCost: 10,
        score: 4.4,
        description: "描述描述描述描述描述描述描述描述描述描述描述描述",
        tagList: ['热销', '新品', '推荐', '爆款'],
        navUrl: '../information/index',
      },

    ],
    //二食堂餐口
    No2array: [{
        title: '二食堂一楼餐口1',
        imageURL: 'https://img13.360buyimg.com/seckillcms/s280x280_jfs/t1/201538/1/15733/203257/61922484E96bab620/bc25dc3d9ddfdd57.jpg.webp',
        sales: 300,
        perCost: 10,
        score: 4.4,
        description: "描述描述描述描述描述描述描述描述描述描述描述描述",
        tagList: ['热销', '新品', '推荐', '爆款'],
        navUrl: '../information/index',
      },
      {
        title: '二食堂一楼餐口1',
        imageURL: 'https://img13.360buyimg.com/seckillcms/s280x280_jfs/t1/201538/1/15733/203257/61922484E96bab620/bc25dc3d9ddfdd57.jpg.webp',
        sales: 300,
        perCost: 10,
        score: 4.4,
        description: "描述描述描述描述描述描述描述描述描述描述描述描述",
        tagList: ['热销', '新品', '推荐', '爆款'],
        navUrl: '../information/index',
      },
    ],
    arrayList: [{
      title: '二食堂一楼餐口1',
      imageURL: 'https://img13.360buyimg.com/seckillcms/s280x280_jfs/t1/201538/1/15733/203257/61922484E96bab620/bc25dc3d9ddfdd57.jpg.webp',
      sales: 300,
      perCost: 10,
      score: 4.4,
      description: "描述描述描述描述描述描述描述描述描述描述描述描述",
      tagList: ['热销', '新品', '推荐', '爆款'],
      navUrl: '../information/index',
    }],
  },
  onLoad() {
    // 页面加载时发送请
  },
  handleToSearch() {
    wx.navigateTo({
      url: '../search/index'
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
    wx.request({
      url: 'http://canteen?page=' + num,
      data: {},
      //请求成功
      success: function (params) {
        this.setData({
          arrayList: params
        })
      }
    })
  }
})