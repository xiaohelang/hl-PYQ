//index.js
//获取应用实例
const api = require('../../../../utils/api.js')
const ERR_OK = 0

var app = getApp()
Page({
  data: {
    inputValue: '',
    userInfo: {},
    email: '',
    dataType: '',
    info: '',
    placeholder: ''
  },
  //事件处理函数
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
    console.log("inputValue");
    console.log(this.data.inputValue);
  },
  getPreInfoStr: function(option, successFn, errorFn) {
    let that = this
    api.getPreInfoStr(option,  function(res){
      successFn && successFn(res)
    }, function(err){
      errorFn && errorFn(err)
      console.log('修改信息')
      console.log(err)
    })
  },
  successBack: function (message){
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
  errorToast: function (message) {
    wx.showToast({
      title: message,
      icon: 'success',
      duration: 2000
    })
  },
  savebtn: function() {
    let that = this
    switch (this.data.dataType) {
      case 'emailType':
        this.getPreInfoStr({
          token: app.globalData.token,
          email: that.data.inputValue
        }, function (res) {
          if(res.code == ERR_OK) {
            that.successBack(res.message)
          } else{
            that.errorToast(res.message)
          }
          console.log('修改信息2res')
          console.log(res)
        }, function (err) {
          console.log('修改信息2err')
          console.log(err)
        })
        break;
      case 'companyType':
        this.getPreInfoStr({
          token: app.globalData.token,
          company: that.data.inputValue
        }, function (res) {
          console.log('修改信息2res')
          console.log(res)
        }, function (err) {
          console.log('修改信息2err')
          console.log(err)
        })
        break;
      case 'positionType':
        this.getPreInfoStr({
          token: app.globalData.token,
          job: that.data.inputValue
        }, function (res) {
          console.log('修改信息2res')
          console.log(res)
        }, function (err) {
          console.log('修改信息2err')
          console.log(err)
        })
        break;
      case 'realnameType':
        this.getPreInfoStr({
          token: app.globalData.token,
          realname: that.data.inputValue
        }, function (res) {
          console.log('修改信息2res')
          console.log(res)
        }, function (err) {
          console.log('修改信息2err')
          console.log(err)
        })
        break;
    }
  },
  savebtn2: function (e) {
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
      dataType: options.dataType,
      info: options.info
    })
    switch(this.data.dataType) {
      case 'emailType':
        this.setData({
          placeholder: '请输入邮箱地址'
        })
        break;
      case 'companyType':
        this.setData({
          placeholder: '请输入公司名称'
        })
        break;
      case 'positionType':
        this.setData({
          placeholder: '请输入职位'
        })
        break;
      case 'realnameType':
        this.setData({
          placeholder: '请输入姓名'
        })
        break;
    }

  }
})