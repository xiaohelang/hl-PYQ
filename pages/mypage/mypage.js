var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511331532948&di=a496d39faae8a83f5a2a385be7c3ac05&imgtype=0&src=http%3A%2F%2Fi1.muzisoft.com%2Fuploads%2Fhct%2F20160705%2Fbsbdx133345bsbdx133345.png',
      nickName: "夜幕小草",
      phoneMob: "13544323774",
      name: "夜幕小草姓名"
    },
    text: '查看'
  },
  // 跳转到基本信息
  toBaseInfo: function() {
    console.log('跳转')
    wx.navigateTo({
      url: '../../pages/mypage/baseinfo/baseinfo'
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../buypage/buypage'
    })
  },
  onLoad: function () {
    // var that = this;

    // that.setData({
    //   userInfo: app.globalData.userInfo
    // })
  },
  onShow: function () {
    var that = this;
    // that.setData({
    //   userInfo: app.globalData.userInfo
    // })
  }
})
