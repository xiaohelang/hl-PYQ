//index.js
//获取应用实例
const api = require('../../../../utils/api.js')
const ERR_OK = 0

var app = getApp()
Page({
  data: {
    inputValue: '',
    dataType: '',
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
    this.getPreInfoStr({
      token: app.globalData.token,
      shortIntro: that.data.inputValue
    }, function (res) {
      if (res.code == ERR_OK) {
        that.successBack(res.message)
      } else {
        that.errorToast(res.message)
      }
    }, function (err) {
      console.log('修改信息2err')
      console.log(err)
    })
  },
// 修改信息
  getPreInfoStr: function (option, successFn, errorFn) {
    let that = this
    api.getPreInfoStr(option, function (res) {
      successFn && successFn(res)
    }, function (err) {
      errorFn && errorFn(err)
      console.log('修改信息')
      console.log(err)
    })
  },

  successBack: function (message) {
    wx.showToast({
      title: message,
      icon: 'success',
      duration: 2000,
      success: function () {
        setTimeout(function () {
          app.showMode();
        }, 2000)
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      dataType: options.dataType,
      resume: options.info
    })
  }
})