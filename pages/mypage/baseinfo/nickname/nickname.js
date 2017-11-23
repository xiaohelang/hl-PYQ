//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    inputValue: '',
    userInfo: {}
  },
  //事件处理函数
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
    console.log("inputValue");
    console.log(this.data.inputValue);
  },

  savebtn: function (e) {
    var that = this;
    /*修改昵称请求*/
    app.sendRequest({
      // url: 'https://test.ueker.cn/qunshangquan/user/updateUserByOpenId.action',
      url: app.globalUrl.updateUserByOpenId,
      data: {
        openId: app.globalData.openId,
        sessionKey: app.globalData.sessionKey,
        wechatName: that.data.inputValue
      },
      success: function (res) {
        console.log("修改昵称返回的数据");
        console.log(res);
        if (res.data.resultCode === 0) {
          app.getUserdata();
          wx.showToast({
            title: "修改成功",
            icon: 'success',
            duration: 2000,
            success: function () {
              app.showMode();
            }
          })
        } else {
          wx.showToast({
            title: "修改失败",
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },

  showToast: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 3000,
      success: function (res) {
        console.log("res");
        console.log(res);
      }
    })
  },

  onLoad: function () {
    var that = this
  }
})