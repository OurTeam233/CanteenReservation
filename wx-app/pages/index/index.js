// index.js
Page({
  data: {
    imageURL: 'https://img13.360buyimg.com/seckillcms/s280x280_jfs/t1/201538/1/15733/203257/61922484E96bab620/bc25dc3d9ddfdd57.jpg.webp',
    sales: 300,
    perCost: 10,
    score: 4.4,
    description: "描述描述描述描述描述描述描述描述描述描述描述描述",
    tagList: ['热销', '新品', '推荐', '爆款'],
    navUrl: '../information/index'
  },
  handleToSearch() {
    wx.navigateTo ({
      url: '../search/index'
    })
  }
})
