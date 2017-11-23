//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    testlist: [1, 2, 3, 4],
    images: [
      {
        "address": "勤天大厦1",
        "name": "买手1",
        "sort": "232",
        "distance": "79",
        "series_pic_url": "http://img5.imgtn.bdimg.com/it/u=2623601157,2992105230&fm=23&gp=0.jpg"
      },
      {
        "address": "勤天大厦2",
        "name": "买手2",
        "sort": "555",
        "distance": "88",
        "series_pic_url": "http://img5.imgtn.bdimg.com/it/u=2623601157,2992105230&fm=23&gp=0.jpg"
      },
      {
        "address": "勤天大厦3",
        "name": "买手3",
        "sort": "5556",
        "distance": "888",
        "series_pic_url": "http://img5.imgtn.bdimg.com/it/u=2623601157,2992105230&fm=23&gp=0.jpg"
      },
      {
        "address": "勤天大厦4",
        "name": "买手4",
        "sort": "555",
        "distance": "88",
        "series_pic_url": "http://img5.imgtn.bdimg.com/it/u=2623601157,2992105230&fm=23&gp=0.jpg"
      },
    ]
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    /*
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    */
  }
})
