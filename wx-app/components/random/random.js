Component({
  data:{
    return:{
      totalList:[
        "../../static/dis_icon.jpg",
        "../../static/dis_icon2.jpeg",
        "../../static/dis_icon3.jpeg",
        "../../static/dis_icon4.jpg",
        "../../static/dis_icon5.jpg",
        "../../static/dis_icon6.jpg",
        "../../static/dis_icon.jpg",
        "../../static/dis_icon7.jpg",
        "../../static/dis_icon8.jpg",
        "../../static/dis_icon5.jpg",
        "../../static/dis_icon2.jpeg",
        "../../static/dis_icon3.jpeg",
        "../../static/dis_icon4.jpg",
        "../../static/dis_icon5.jpg",
        "../../static/dis_icon6.jpg",
        "../../static/dis_icon.jpg",
        "../../static/dis_icon2.jpeg",
        "../../static/dis_icon3.jpeg",
        "../../static/dis_icon4.jpg",
        "../../static/dis_icon5.jpg",
        "../../static/dis_icon2.jpeg",
        "../../static/dis_icon.jpg",
        "../../static/dis_icon7.jpg",
        "../../static/dis_icon8.jpg",
        "../../static/dis_icon5.jpg",
        "../../static/dis_icon2.jpeg",
        "../../static/dis_icon3.jpeg",
        "../../static/dis_icon4.jpg",
        "../../static/dis_icon5.jpg",
        "../../static/dis_icon6.jpg"
      ],		// 总数居
      leftList: [],		// 左边数据
      rightList: [],		// 右边数据
    },
    query:{},
  leftHeight:0, rightHeight:0,
  },
  
  mounted() {
    this.getDataDom()
  },
  methods: {
    async getDataDom() {
      let data = this.$data;
      query = uni.createSelectorQuery().in(this);
      for (let item in data.totalList) {
        // 判断两边的高度
        leftHeight <= rightHeight ? data.leftList.push(data.totalList[item]) : data.rightList.push(data.totalList[item]);
        await this.getBoxHeight(data.leftList, data.rightList);
      }
    },
  
    getBoxHeight(leftList, rightList) {
      return new Promise((resolve, reject) => {
        this.$data.leftList = leftList
        this.$data.rightList = rightList
        query.select('#dis_left').boundingClientRect();
        query.select('#dis_right').boundingClientRect();
        // 处理异步问题，没有数据
        setTimeout(() => {
          query.exec((res) => {
            leftHeight = res[0].height; //获取左边列表的高度
            rightHeight = res[1].height; //获取右边列表的高度
            resolve();
          });
        })
      })
    }
  }
})


