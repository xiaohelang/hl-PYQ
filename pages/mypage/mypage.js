const api = require('../../utils/api.js')
const ERR_OK = 0

var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    avatarUrl:'',
    nickName: "",
    mobilePhone: "",
    realname: "",
    text: '查看',
    shopText: '商家入驻',
    view: '我看过的',
    attention: '我收藏的',
    public: '我发布的',
    phoneText: '绑定手机号码',
    testPhone: false
  },
  // 跳转到基本信息


  toBaseInfo: function() {
    console.log('跳转')
    wx.navigateTo({
      url: '../../pages/mypage/baseinfo/baseinfo'
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../buypage/buypage'
    })
  },
  // 1.获取用户信息
  getUserInfo: function () {
    var that = this
    console.log('token-my')
    console.log(app.globalData.token)
    api.getUserInfo({

      token: app.globalData.token

    }, function(res){
      console.log('获取个人信息')
      console.log(res)
      if (res.code == 0) {
        console.log('获取个人信息')
        console.log(res)
        that.setData({
          nickName: res.data.nickname,
          realname: res.data.realname,
          avatarUrl: res.data.headImgUrl
        })
        if (res.data.realname !== undefined) {
          that.setData({
            realname: res.data.realname,
          })
        }
        if (res.data.mobilePhone !== undefined) {
          that.setData({
            testPhone: true,
            mobilePhone: res.data.mobilePhone,
          })
        }
      } 

    }, function(err) {

    })
  },
  // 跳转到绑定电话页面
  toPhone: function(){
    wx.navigateTo({
      url: '../../pages/mypage/phone/phone'
    })
  },
// 商户入驻
  toCircleset: function() {
    wx.navigateTo({
      url: '../../pages/circleset/circleset'
    })
  },
// 跳转列表页
  toListDetail: function (e) {
    let Type = 'listType'
    let that = this
    console.log('toListDetail')
    console.log(e)
    let listType = e.currentTarget.dataset.listtype
    wx.navigateTo({
      url: '../../pages/lookrecord/lookrecord?' + Type + '=' + listType,
    })
  },
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log('系统获取信息')
        console.log(res)
        that.data.userInfo = res.userInfo
        that.setData({
          nickName: res.userInfo.nickName,
        })
        that.getUserInfo()
      }
    })
    // that.setData({
    //   userInfo: app.globalData.userInfo
    // })
  },
  onShow: function () {
    var that = this;
    // that.setData({
    //   userInfo: app.globalData.userInfo
    // })
  }
})
