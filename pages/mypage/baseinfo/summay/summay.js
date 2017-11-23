//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    inputValue: '',
    userInfo: {},
    resume: ''
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
    app.sendRequest({
      // url: 'https://test.ueker.cn/qunshangquan/user/updateUserByOpenId.action',
      url: app.globalUrl.updateUserByOpenId,
      data: {
        openId: app.globalData.openId,
        sessionKey: app.globalData.sessionKey,
        resume: that.data.inputValue
      },
      success: function (res) {
        console.log("简介成功");
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
          // app.getUserdata();
          // app.showMode();
        }
      },
      fail: function() {
        console.log("简介失败");
        console.log(res);
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


  onLoad: function (options) {
    this.setData({
      resume: options.resume
    })
  }
})