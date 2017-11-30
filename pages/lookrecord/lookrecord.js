//获取应用实例
let api = require('../../utils/api.js')
var app = getApp()
let ERR_OK = 0
Page({
  data: {
    userInfo: {},
    industryArray: [],
    industryId: 0,
    listType: '',
    articleList: [
      {
        attentioned: 2,
        attentions: 0,
        commments: 0,
        content: '这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品',
        createDate: '2017-12-09',
        nickname: '大树',
        praised: 1,
        status: 1,
        headImgUrl: '',
        images: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511595512641&di=167b61d8957f3624fa66076ebbd2dee4&imgtype=0&src=http%3A%2F%2Fimg6.lady8844.com%2Fforum%2Fmonth_1406%2F1406031425452891ffb384e131.jpg'],
        industryId: 'koklk',
        industryInfoId: 'lplplp',
        praises: 0,
        showLocation: 0,
        visits: 0,
        uid: "2aa42743-6f2c-4fdd-b91e-a649ebe777bf",
      }
    ],
    isBuy: true,
    isLoad: true,
    showKeyWord: true
  },


  // 跳转到详情页
  toDetail: function (e) {
    let that = this
    console.log(e)
    let industryinfoid = e.currentTarget.dataset.industryinfoid
    wx.navigateTo({
      url: '../../pages/buypage/buydetails/buydetails?industryinfoid=' + industryinfoid,
    })
  },
  // 跳转到发布者个人信息
  toUserInfo: function (e) {
    let uid = e.currentTarget.dataset.uid
    wx.navigateTo({
      url: '../../pages/buypage/userinfo/userinfo?uid=' + uid,
    })
  },
  // 获取个人发布列表
  getPersonPage: function() {
    api.getPersonPage({
      token: app.globalData.token,
      pageIndex: 1,
      pageSize: 8
    }, function(res){
      console.log("发布列表-res")
      console.log(res)
    },  function(err){
      console.log("发布列表-err")
      console.log(err)
    })
  },
  // 获取收藏列表
  getAttentionPage: function(){
    api.getAttentionPage({
      token: app.globalData.token,
      pageIndex: 1, 
      pageSize: 8
    },  function(res){
      console.log('收藏列表')
      console.log(res)
    }, function(err){
      console.log('收藏列表')
      console.log(err)
    })
  },
  // 获取我看过列表
  getIvisitPage: function(){
    api.getIvisitPage({
      token: app.globalData.token,
      pageIndex: 1,
      pageSize: 8
    }, function(res){
      console.log("我看过列表--res")
      console.log(res)
    }, function(err){
      console.log("我看过列表--err")
      console.log(err)
    })
  },

  // switch刷选
  switchTag: function (listType) {
    let that = this
    switch (listType) {
      case "publicType":
        that.getPersonPage()
        break
      case "attentionType":
        that.getAttentionPage()
        break
      case "viewType":
        that.getIvisitPage()
        break

    }
  },

  onLoad: function (options) {
    console.log("look-options")
    console.log(options)
    let that = this
    that.switchTag(options.listType)
    console.log("listType")
    console.log(that.data.listType)

    console.log('onLoad');
    // that.getAttentionPage()
  },
  // onShow: function () {
  //   var that = this;
  //   that.setData({
  //     userInfo: app.globalData.userInfo
  //   })
  // }
})
