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
    shopText: '',
    view: '我看过的',
    attention: '我收藏的',
    public: '我发布的',
    phoneText: '绑定手机号码',
    testPhone: "",
    shopId: '',
    shopIdType: ''
  },
  // 跳转到基本信息
  toBaseInfo: function() {
    if (app.globalData.token === null) {
      return
    }
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
        } else {
          that.setData({
            testPhone: "未绑定",
            realname: ""
          })
        }
        if (res.data.mobilePhone !== null) {
          that.setData({
            testPhone: "已绑定",
            mobilePhone: res.data.mobilePhone,
          })
        } else {
          that.setData({
            testPhone: "未绑定",
            mobilePhone: ""
          })
        }
        if (res.data.shopId !== null) {
          that.setData({
            shopIdType: 'shopType',
            shopId: res.data.shopId,
            shopText: '我的店铺'
          })
        } else{
          that.setData({
            shopIdType: 'noShopType',
            shopId: '',
            shopText: '商家入驻'
          })
        }
      } 

    }, function(err) {

    })
  },
  // 跳转到绑定电话页面
  toPhone: function(){
    if (app.globalData.token === null) {
      return
    }
    wx.navigateTo({
      url: '../../pages/mypage/phone/phone'
    })
  },
// 商户入驻
  toCircleset: function() {
    if (app.globalData.token === null) {
      return
    }
    wx.navigateTo({
      url: '../../pages/circleset/circleset'
    })
  },
// 跳转列表页
  toListDetail: function (e) {
    if (app.globalData.token === null) {
      return
    }
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
    var timer = null;
    clearInterval(timer)
    timer = setInterval(function(){
      if (app.globalData.token !== null) {
        clearInterval(timer)
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
      }
    }, 1000)

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
