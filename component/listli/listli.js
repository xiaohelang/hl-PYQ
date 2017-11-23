//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      nickname: "夜幕小草",
      sex: "男",
      avatarUrl: ""
    }
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
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log("获取数据");
      console.log(userInfo);
     var  data = {
              'userInfo.nickname': userInfo.nickname,
              'userInfo.sex': userInfo.sex,
              'userInfo.avatarUrl': userInfo.avatarUrl
            };
      that.setData(data);
    })
  },
  choosePhoto2: function () {
    var that = this;
    // app.chooseImage(function (imgUrl) {
    //   that.setData({
    //     // 'userInfo.cover_thumb': imgUrl
    //   })
    // });
    app.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // success
        console.log("11");
        console.log(res);
         that.setData({
           'userInfo.avatarUrl': res.tempFilePaths[0]
         });
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
})