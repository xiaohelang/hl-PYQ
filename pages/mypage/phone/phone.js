
// var util = require('../../utils/util.js')
const api = require('../../../utils/api.js')
let ERR_OK = 0

var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    inputValue: '',
    userInfo: {},
    picCode: '',
    piccode: 0,
    random: 0,
    code: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
    console.log("inputValue");
    console.log(this.data.inputValue);
  },
  // 图片验证码输入
  inputPicyan: function (e) {
    this.setData({
      piccode: e.detail.value
    });
    console.log(this.data.piccode)
  },
  // 手机验证码输入
  inputPhoneyan: function (e) {
    this.setData({
      code: e.detail.value
    });
  },

  // 换一张图片验证码
  getImgCode: function () {
    console.log('换一张图片验证码')
    let that = this
    let hh = Math.random()
    console.log(hh)
    that.setData({
      random: hh,
      picCode: 'https://wx-api.hcl668.com/api/user/validate/code?token=' + app.globalData.token
    })
  },
  // 验证图片验证码
  testPicCode: function () {
    let that = this
    api.getValidateVerify({
      token: app.globalData.token,
      code: that.data.piccode
    }, function (res) {
      console.log('验证码验证-res')
      console.log(res)
      if (res.code === ERR_OK) {
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000
        })
      } else{
        wx.showToast({
          title: "验证码有误",
          icon: 'success',
          duration: 2000
        })
      }
    }, function (err) {
      wx.showToast({
        title: "验证码有误",
        icon: 'success',
        duration: 2000
      })
    })
  },

  //请求手机验证码
  getVerCode: function (e) {
    var that = this;
    if (!(/^1[34578]\d{9}$/.test(that.data.inputValue))) {
      wx.showToast({
        title: "请正确输入手机号码",
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    if (that.data.piccode === '') {
      wx.showToast({
        title: "图片验证码不能为空",
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    api.getSmsVcode({
      token: app.globalData.token,
      type: 1,
      mobile: that.data.inputValue,
      verifyCode: that.data.piccode
    }, function (res) {
      if (res.code === ERR_OK) {
        wx.showToast({
          title: "发送成功",
          icon: 'success',
          duration: 2000
        })
        return false;
      } else{
        wx.showToast({
          title: "发送失败",
          icon: 'success',
          duration: 2000
        })
        return false;
      }
    }, function (err) {
      wx.showToast({
        title: "发送失败",
        icon: 'success',
        duration: 2000
      })
      console.log("获取验证码失败-err")
      console.log(err)
      return false;
    })


    // // 获取验证码
    // api.getSmsVcode({
    //   token: app.globalData.token,
    //   type: 1,
    //   mobile: that.data.inputValue,
    //   verifyCode: "333"
    // }, (res) => {
    //   console.log("获取电话验证码成功--res")
    //   console.log(res)
    // }, (err) => {
    //   console.log("获取电话验证码失败")
    //   console.log(err)
    // })
    // wx.request({
    //   url: 'https://test.ueker.cn/qunshangquan/verifyCode/sendVerifyCode.action',
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     data: JSON.stringify({
    //       sessionKey: app.globalData.sessionKey,
    //       phoneMob: that.data.inputValue,
    //       verifyType: 1
    //     })
    //   },
    //   success: function (ress) {
    //     wx.showToast({
    //       title: "已发送",
    //       icon: 'success',
    //       duration: 2000
    //     })
    //     console.log("ressss");
    //     console.log(ress);
    //     if (ress.data.resultCode === 102) {
    //       wx.showToast({
    //         title: ress.data.resultMsg,
    //         icon: 'success',
    //         duration: 3000
    //       })
    //     }
    //   }
    // })
  },
  successBack: function (message) {
    wx.showToast({
      title: message,
      icon: 'success',
      duration: 2000,
      success: function () {
        setTimeout(function () {
          wx.navigateBack({

          })
        }, 2000)
      }
    })
  },
  //绑定手机号码
  saveUserInfo: function (e) {
    var that = this;
    if (!(/^1[34578]\d{9}$/.test(that.data.inputValue))) {
      wx.showToast({
        title: "请正确输入手机号码",
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    if (that.data.code == 0) {
      wx.showToast({
        title: "请输入验证码",
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    api.getMobileBind({
      token: app.globalData.token,
      vcode: that.data.code,
      mobile: that.data.inputValue
    }, function (res) {
      console.log('绑定手机号码--res')
      console.log(res)
      if (res.code === ERR_OK) {
        that.successBack("绑定成功")
      } else {
        wx.showToast({
          title: "绑定失败",
          icon: 'success',
          duration: 2000
        })
        return false;
      }

     }, function (err) {
       console.log('绑定手机号码--err')
       console.log(err)
       wx.showToast({
         title: "绑定失败",
         icon: 'success',
         duration: 2000
       })
       return false;
    })
  },


  onLoad: function () {
    var that = this
    // that.getPicCode()
    that.setData({
      picCode: 'https://wx-api.hcl668.com/api/user/validate/code?token=' + app.globalData.token
    })
    console.log('图片验证码带token')
    console.log(that.data.picCode)
    //调用应用实例的方法获取全局数据

  }
})

