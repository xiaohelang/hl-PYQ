let api = require('../../../utils/api.js')
var app = getApp()
let ERR_OK = 0
var app = getApp()
Page({
  data: {
    uid: '',
    userinfo: {
      province: '',
      city: '',
      district: '',
      detailAddress: '',
      headImgUrl: '',
      job: '',
      mobilePhone: '',
      nickname: '',
      realname: '',
      shortIntro: '',
      verified: '',
      uid: '',
      company: '',
    }
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 获取发布者的相关信息bulishStr
  getBulishStr: function (uid) {
    let that = this
    api.getBulishStr({
      uid: uid
    }, function (res) {
      if (res.code === ERR_OK) {
        that.setData({
          userinfo: res.data
        })
      } else {}
      console.log(res)
    }, function (err) {
      console.log('发布者的相关信息err')
      console.log(err)
    })
  },
  //删除事件
  saveUserInfo: function () {
    var that = this;
    wx.showModal({
      title: "提示",
      content: "是否确认删除",
      showCancel: true,
      cancelText: "取消",
      confirmText: "确认",
      success: function (res) {
        if (res.confirm === true) {
          that.deleteItem();
        }
      }
    })
  },
  //打电话功能
  phoneCall: function (e) {
    var testId = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: testId
    })
  },
  //分享页面
  onShareAppMessage: function (options) {
    var industryinfoid = this.data.industryinfoid;
    return {
      title: '这是你想要的~~~ ',
      path: '/pages/buypage/buydetails/buydetails?industryinfoid=' + industryinfoid,
      success: function (res) {
        // 分享成功
        console.log("分享成功");
        console.log(res);
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },

  searchTap2: function () {
    this.setData({
      showSearch: true
    })
  },

  onLoad: function (options) {
    console.log('uid')
    console.log(options)
    console.log(options.uid)
    this.setData({
      uid: options.uid
    });
    var that = this;
    that.getBulishStr(that.data.uid)
  }
})
