//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      nickName: "夜幕小草",
      name: "夜幕小草姓名",
      avatarUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511331532948&di=a496d39faae8a83f5a2a385be7c3ac05&imgtype=0&src=http%3A%2F%2Fi1.muzisoft.com%2Fuploads%2Fhct%2F20160705%2Fbsbdx133345bsbdx133345.png",
      phoneMob: "13544323774",
      email: "392783080@qq.com",
      company: "微革网络",
      position: "web前端",
      address: "勤天大厦",
      resume: "我自信我牛逼"
    },
    email: "392783080@qq.com",
    text: 'hhh'
  },
  // 编辑信息
  toEidtInfo: function (e) {
    let emailType = 'email2'
    let that = this
    console.log(e)
    // console.log(e.currentTarget.dataset.email)
    let editData = e.currentTarget.dataset.email
    wx.navigateTo({
      url: '../../../pages/mypage/baseinfo/mailbox/mailbox?' + emailType + '=' + editData,
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  choosePhoto: function () {
    let that = this;
    // app.chooseImage(function (imgUrl) {
    //   that.setData({
    //     // 'userInfo.cover_thumb': imgUrl
    //   })
    // });
    // wx.chooseImage({
    //   count: 1, // 最多可以选择的图片张数，默认9
    //   sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
    //   success: function (res) {
    //     // success
    //     console.log("11");
    //     console.log(res);
    //     that.setData({
    //       'userInfo.avatarUrl': res.tempFilePaths[0]
    //     });
    //   },
    //   fail: function (res) {
    //     // fail
    //   },
    //   complete: function (res) {
    //     // complete
    //   }
    // })
  },

  onShow : function() {
    // console.log("app.globalData.userInfo-baseinfo");
    // console.log(app.globalData.userInfo);
    // var that = this;
    // that.setData({
    //   userInfo: app.globalData.userInfo
    // })
    // console.log("that.data.userInfo");
    // console.log(that.data.userInfo);
  }
})
