// pages/minePparticulars/index.js
import Notify from '@vant/weapp/notify/notify';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前页的id
    item: 0,

    //关于这个页面的学生信息
    //这个页面的学生id
    thisPageStudentId: null,
    //是否是我的页面
    isMyPage:true,
    //是否了关注页面的主人
    isAtt: false,
    headImgUrl: "../../image/mine/default.png",
    username: '系统用户',
    signature: '该用户什么都没留下',

    




    //二手数据
    // 发帖数据
    postList: [],
    //二手数据
    usedList: [],

    //相亲轮播图设置
    indicatorDots: true,
    vertical: true,
    autoplay: false,
    interval: 2000,
    duration: 2000,
    
    

    // 相亲中的数据
    miaiId: null,
    backgroundImage: [
      '../../image/information/women3.webp',
      '../../image/information/women.webp',
      '../../image/information/women2.webp'
    ],
    haveMiai: false,
    person: {
      name: '海的味道我知道',
      age: '21',
      sex: '女',
      height: '167cm',
      weight: '56kg',
      address: '江苏南通',
      manifesto: '我能享受平淡，但我也能够经得起风浪',
      hobby:'吃饭',
    },
    person1: {
      age: '21~24',
      sex: '男',
      height: '176cm以上',
      condition:'有趣的灵魂',
    },
    
  },


  // 预览图片
  previewImage: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let list = this.data.usedList[index];
    let urls = list.pictures;
    let current = urls[0];
    
    // console.log(current);
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls, // 需要预览的图片http链接列表
    })
  },


  onReady(){
    this.getUserInfo();
    this.getStudentPosts();
  },

  onLoad: function(e){
    //获取从上个页面传过来的学生id
    console.log(e)
    this.setData({
      thisPageStudentId: e.studentId
    });

    this.isMyPage();

    //从社区进入定位到特定的分类
    if(e.type == "2") {
      this.setData({
        item: 2
      })
    } else if(e.type == "1"){
      this.setData({
        item: 0
      })
    } else if(e.type == "3"){
      this.setData({
        item: 1
      })
    }
    // console.log(e)

    //查看是否关注了该用户
    this.isAttention();

    //查看发帖
    this.getStudentPosts();
    //查看二手
    this.getStudentUseds();
    //查看相亲
    this.getStudentMiai();
    
  },


  // 标签页的标题栏点击事件
  changeItem: function (e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      item: item
    })
    console.log(this.data.item);
  },
  // 滑动页监听事件
  changeTab: function (e) {
    let current = e.detail.current;
    this.setData({
      item: current
    })
  },


  //获取studentId对应的学生信息
  getUserInfo(){
    let thisPageStudentId = this.data.thisPageStudentId;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/student/' + thisPageStudentId,
      header: {token},
      method: "GET",
      success: (res) => {
        console.log(res.data.data)
        let {avatarUrl, id, nickname, signature} = res.data.data;
        this.setData({
          headImgUrl: avatarUrl,
          username: nickname,
          signature: signature
        })
      },
      error: (res) => {
        console.log("no")
      }

    })
  },



  //获取特定用户的发帖
  getStudentPosts(){
    let _this = this;
    let studentId = this.data.thisPageStudentId;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Post/Select/' + studentId + '/1',
      header: {token},
      method: "GET",
      success: (res) => {
        //返回的结果数组
        let resList = res.data.data;
        let postList = [];
        console.log(resList)
        resList.forEach(function(item, index){
          let {avatarUrl, id, nickname} = item.student;
          let content = item.content;
          let pictureList = [];
          item.pictureList.forEach((i) => {
            pictureList.push(i.pictureUrl)
          })

          //转化orderTime
          let dateee = new Date(item.time).toJSON();
          dateee = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          let postId = item.id;
          // let time = item.time;
          let like = item.like;
          
          postList.push({
            id: postId,
            studentId: id,
            touxiang: avatarUrl,
            nicheng: nickname,
            shijian: dateee,
            neirong: content,
            tupian: pictureList,
            dianzanliang: like
          });

        })
        _this.setData({
          postList
        });

      },
      error: (res) => {

      }
    })
  },


  //获取特定用户的二手
  getStudentUseds(){
    let _this = this;
    let studentId = this.data.thisPageStudentId;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Post/Select/' + studentId + '/3',
      header: {token},
      method: "GET",
      success: (res) => {
        //返回的结果数组
        let resList = res.data.data;
        let usedList = [];
        console.log(resList)
        resList.forEach(function(item, index){
          let id = item.id;
          // let pictures = item.pictureList;
          let pictures = [];
          item.pictureList.forEach((item) => {
            pictures.push(item.pictureUrl)
          })
          let name = item.used.name;
          let description = item.used.description;
          let price = item.used.price;
          let del = item.del;
          //如果用户没有添加商品图片
          if(pictures.length === 0){
            console.log("没有图片")
            pictures.push('http://www.sucaijishi.com/uploadfile/2020/0110/20200110051242482.png')
          }

          usedList.push({
            id,
            del,
            name,
            description,
            price,
            pictures
          });

        })
        


        _this.setData({
          usedList
        });
      },
      error: (res) => {

      }
    })
  },

  //获取特定用户的相亲
  getStudentMiai(){
    let _this = this;
    let studentId = this.data.thisPageStudentId;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Post/Select/' + studentId + '/2',
      header: {token},
      method: "GET",
      success: (res) => {
        //返回的结果数组中有数据就进行更新，没有数据就不处理
        if(res.data.data.length != 0) {
          this.setData({
            haveMiai: true
          })
          let resList = res.data.data[0];
          console.log(resList)

          let backgroundImage = [];
          if(resList.pictureList.length != 0){
            resList.pictureList.forEach((item) => {
              backgroundImage.push(item.pictureUrl)
            })
          }
          
          //相亲的帖子id
          let miaiId = resList.id;

          //自己的信息
          let name = this.data.username;
          let address = resList.postDetail.myAddress;
          let manifesto = resList.postDetail.myDeclaration;
          let hobby = resList.postDetail.myHobby;
          let myGender = '';
          if(resList.postDetail.myGender == 1) {
            myGender = '男';
          } else {
            myGender = '女';
          }

          //理想型的信息
          let oGender = '';
          if(resList.postDetail.otherGender == 1) {
            oGender = '男';
          } else {
            oGender = '女';
          }
          //计算年龄区间
          let oAge = '';
          let startAge = resList.postDetail.otherStartAge;
          let endAge = resList.postDetail.otherEndAge;
          if(startAge == 0){
            oAge = endAge + '以下';
          } else if(endAge == 100){
            oAge = startAge + '以上';
          } else {
            oAge = startAge + '~' + endAge;
          }
          //计算身高区间
          let oHeight = '';
          let startHeight = resList.postDetail.otherStartHeight;
          let endHeight = resList.postDetail.otherEndHeight;
          if(startHeight == 0){
            oHeight = endHeight + 'cm以下';
          } else if(endHeight == 200){
            oHeight = startHeight + 'cm以上';
          } else {
            oHeight = startHeight + '~' + endHeight + 'cm';
          }
          

          _this.setData({
            miaiId,
            backgroundImage,
            'person.name': name, 
            'person.address': address,
            'person.manifesto': manifesto,
            'person.hobby': hobby,
            'person.height': resList.postDetail.myHeight,
            'person.weight': resList.postDetail.myWeight,
            'person.age': resList.postDetail.myAge,
            'person.sex': myGender,

            'person1.condition': resList.postDetail.other,
            'person1.age': oAge,
            'person1.sex': oGender,
            'person1.height': oHeight,
            
          })
        }

        

        console.log(this.data.person)
      },
      error: (res) => {

      }
    })
  },



  //查看该用户是否被自己关注
  isAttention(){
    let token = wx.getStorageSync('token');
    let thisPageStudentId = this.data.thisPageStudentId;
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/focus/isFocus/' + thisPageStudentId,
      header: {token},
      method: "GET",
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          isAtt: res.data.data
        })
      }
    })
  },


  //关注    (现在还没获取到当前页面的学生id!!!)
  toAttention (e) {
    // 获取点击的id
    let index = e.currentTarget.dataset.id
    console.log(index)
    let toStudentId = this.data.thisPageStudentId;
    let studentId = wx.getStorageSync('studentId');
    console.log(studentId);
    let token = wx.getStorageSync('token');
    if(studentId == toStudentId){
      Notify({ type: 'warning', message: '不能关注自己' });
    } else {
      wx.request({
        url: 'http://175.178.216.63:8888/CanteenWeb/focus/' +toStudentId,
        header: {token},
        method: "PUT",
        success: (res) => {
          console.log("ok");

          this.setData({
            isAtt: !this.data.isAtt
          })
        },
        error: (res) => {

        }
      })
    }
  },




  //私信
  toMsg(){
    let studentId = wx.getStorageSync('studentId')
    let toStudentId = this.data.thisPageStudentId;
    let image = this.data.headImgUrl;
    let nick = this.data.username;
    
    if(toStudentId == studentId){
      Notify({ type: 'warning', message: '不能私信自己' });
    } else {
      wx.navigateTo({
        url: '../chatInfo/index?studentId=' + toStudentId+'&image='+image+'&nike='+nick,
      })
    }
    
  },


  //判断这个页面是不是自己的页面
  isMyPage(){
    let studentId = wx.getStorageSync('studentId');
    console.log("有吗有吗")
    if(this.data.thisPageStudentId == studentId){
      this.setData({
        isMyPage: true
      })
    } else {
      this.setData({
        isMyPage: false
      })
    }
  },

  //删除自己的相亲
  delMiai(){
    let id = this.data.miaiId;
    let token = wx.getStorageSync('token')
    console.log(id)
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Post?id=' + id,
      header: {token},
      method: 'DELETE',
      success: (res) => {
        console.log("ok");
        this.getStudentMiai();
      },
      error: (res) => {

      }
    })

  },

  //删除自己的二手
  delUsed(e){
    // console.log(e.target.dataset.id);
    let id = e.target.dataset.id;
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://175.178.216.63:8888/CanteenWeb/Post?id=' + id,
      header: {token},
      method: 'DELETE',
      success: (res) => {
        console.log("ok");
        this.getStudentUseds();
      },
      error: (res) => {

      }
    })
  }






})