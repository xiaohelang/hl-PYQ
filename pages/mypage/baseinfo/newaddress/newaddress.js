var util = require('../../../../util/util.js')
var formatLocation = util.formatLocation
var app = getApp()

Page({
  data: {
    hasLocation: false,
    inputValue: '',
    userInfo: {},
    address: ''
  },
  //事件处理函数
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
    console.log("inputValue");
    console.log(this.data.inputValue);
  },
  //更改地址
  savebtn: function (e) {
    var that = this;
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/user/updateUserByOpenId.action',
      method: "POST",
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          openId: app.globalData.openId,
          sessionKey: app.globalData.sessionKey,
          address: that.data.locationAddress
        })
      },

      success: function (ress) {
        console.log("修改名字返回的数据");

        console.log(ress);
        console.log("ress.data.resultCode");
        console.log(ress.data.resultCode);
        if (ress.data.resultCode === 0) {
          app.getUserdata();
          app.showMode();
        }
      }
    })
  },
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
        })
      }
    })
  },
  clear: function () {
    this.setData({
      hasLocation: false
    })
  },
    onLoad: function (options) {
    this.setData({
      address: options.address
    })
  }
  
})