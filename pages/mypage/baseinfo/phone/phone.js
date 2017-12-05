
// var util = require('../../utils/util.js')
const api = require('../../../../utils/api.js')
let ERR_OK = 0

var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    inputValue: '',
    userInfo: {},
    picCode: '',
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
  getPicCode:  function () {
    let that = this
    wx.downloadFile({
      url: 'https://wx-api.hcl668.com/api/user/validate/code',
      success: function(res) {
        console.log("获取资源图片")
        console.log(res)
        that.setData({
          picCode: res.tempFilePath
        })
        // if (res.statusCode === 200) {
        //   wx.playVoice({
        //     filePath: res.tempFilePath
        //   })
        // }
      }
    }, function (res) {
      console.log('下载图片')
      console.log(res)
    })
  },
  getValidateCode: function () {
    api.getValidateCode({
      token: app.globalData.token
    }, function (res) {
      console.log('获取图片验证码-res')
      console.log(res)
    }, function(err){
      console.log('获取图片验证码-err')
      console.log(err)
    })
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
    
    // 获取验证码
    api.getSmsVcode({
      token: app.globalData.token,
      type: 1,
      mobile: that.data.inputValue,
      verifyCode: "333"
    }, (res) => {
      console.log("获取电话验证码成功--res")
      console.log(res)
    }, (err) => {
      console.log("获取电话验证码失败")
      console.log(err)
    })
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
    that.getPicCode()
    // that.getValidateCode()
    //调用应用实例的方法获取全局数据

  }
})

