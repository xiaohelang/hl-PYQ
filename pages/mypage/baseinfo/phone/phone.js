
// var util = require('../../utils/util.js')
//index.js
//获取应用实例
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    inputValue: '',
    userInfo: {},
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
  inputPhoneyan: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
  //请求验证码
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

    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/verifyCode/sendVerifyCode.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          sessionKey: app.globalData.sessionKey,
          phoneMob: that.data.inputValue,
          verifyType: 1
        })
      },
      success: function (ress) {
        wx.showToast({
          title: "已发送",
          icon: 'success',
          duration: 2000
        })
        console.log("ressss");
        console.log(ress);
        if (ress.data.resultCode === 102) {
          wx.showToast({
            title: ress.data.resultMsg,
            icon: 'success',
            duration: 3000
          })
        }
      }
    })
  },
  //校验验证码
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
    app.sendRequest({
      // url: 'https://test.ueker.cn/qunshangquan//verifyCode/checkVerifyCode.action',
      url: app.globalUrl.checkVerifyCode,
      data: {
        sessionKey: app.globalData.sessionKey,
        phoneMob: that.data.inputValue,
        verifyType: 1,
        code: that.data.code
      },
      success: function (res) {
        if (res.data.resultCode === 0) {
          wx.request({
            url: 'https://test.ueker.cn/qunshangquan/user/updateUserByOpenId.action',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              data: JSON.stringify({
                openId: app.globalData.openId,
                sessionKey: app.globalData.sessionKey,
                phoneMob: that.data.inputValue
              })
            },
            success: function (ress) {
              console.log(ress);
              if (ress.data.resultCode === 0) {
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
                  duration: 2000,
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: "验证码错误",
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan//verifyCode/checkVerifyCode.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          sessionKey: app.globalData.sessionKey,
          phoneMob: that.data.inputValue,
          verifyType: 1,
          code: that.data.code
        })
      },

      success: function (res) {
        console.log("手机号码");
        console.log(res);
        //更改保存数据
        /*
        wx.request({
          url: 'https://test.ueker.cn/qunshangquan/user/updateUserByOpenId.action',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            data: JSON.stringify({
              openId: app.globalData.openId,
              sessionKey: app.globalData.sessionKey,
              phoneMob: that.data.inputValue
            })
          },

          success: function (ress) {
            console.log(ress);
            if (ress.data.resultCode === 0) {
              app.getUserdata();
              app.showMode();
            }
          }
        })
*/


      }
    })
  },


  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据

  }
})

