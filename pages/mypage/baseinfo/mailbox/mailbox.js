//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    inputValue: '',
    userInfo: {},
    email: ''
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
    /*邮箱请求*/
    app.sendRequest({
      // url: 'https://test.ueker.cn/qunshangquan/user/updateUserByOpenId.action',
      url: app.globalUrl.updateUserByOpenId,
      data: {
        openId: app.globalData.openId,
        sessionKey: app.globalData.sessionKey,
        email: that.data.inputValue
      },
      success: function (res) {
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
          // app.getUserdata();
          // app.showMode();
        } else {
          wx.showToast({
            title: "修改失败",
            icon: 'loading',
            duration: 2000,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: "请求失败",
          icon: 'loading',
          duration: 2000,
        })
      }
    })
  },

  //弹出框
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

  onLoad: function (options) {
    console.log('options')
    console.log(options)
    this.setData({
      email: options.email
    })
  }
})