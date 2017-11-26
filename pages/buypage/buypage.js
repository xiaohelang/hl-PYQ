//获取应用实例
let api = require('../../utils/api.js')
var app = getApp()
let ERR_OK = 0
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    testlist: [1, 2, 3, 4],
    industryArray: [],
    industryId: 0,
    articleList: [
      {
        attentions: 0,
        commments: 0,
        content: '这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品',
        createDate: '2017-12-09',
        nickname: '大树',
        headImgUrl:'',
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

  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../addpage/addpage'
    })
  },
  // 切换tab 分类
  tabClick: function (e) {
    this.setData({
      industryId: e.currentTarget.id
    });
    this.getInfoPage(this.data.industryId)
  },
  // 获取行业分类id和名字
  getIndustryStr: function (cbFn) {
    let that = this
    api.getIndustryStr({

    }, function (res) {
      console.log('获取行业id')
      if (res.code === ERR_OK) {
        that.setData({
          industryArray: res.data.recordList,
          industryId: res.data.recordList[0].industryId
        })
        cbFn && cbFn(res.data.recordList[0].industryId)
      }
      console.log(res)
    }, function (err) {
      console.log('行业id错误')
      console.log(err)
    })
  },
  // 获取资讯列表
  getInfoPage: function (industryId) {
    let that = this
    api.getInfoPage({
      industryId: industryId,
      pageIndex: 1,
      pageSize: 6
    }, function(res){
      console.log('行业-res')
      console.log(res)
      if (res.code === ERR_OK) {
        that.setData({
          articleList: res.data.content
        })
      }
    }, function(err){
      console.log('行业-err')
      console.log(err)
    })
  },
  // 详情
  getInfoPageDetail: function () {
    let that = this
    api.getInfoPageDetail({
      industryInfoId: "bd4d5db6-84b6-41b8-af92-bae7ecc6ccd5"
    }, function(res){
      console.log('详情res')
      console.log(res)
    },function(err){
      console.log('详情err')
      console.log(err)
    })
  },
  // 获取发布者的相关信息bulishStr
  getBulishStr: function() {
    let that = this
    api.getBulishStr({
      uid: "2aa42743-6f2c-4fdd-b91e-a649ebe777bf"
    }, function (res) {
      console.log('发布者的相关信息res')
      console.log(res)
    }, function (err) {
      console.log('发布者的相关信息err')
      console.log(err)
    })
  },

  onLoad: function () {
    let that = this
    this.getIndustryStr(function (industryId) {
      that.getInfoPage(industryId)
      that.getInfoPageDetail()
      that.getBulishStr()
    })
    console.log('onLoad');
  },
  // onShow: function () {
  //   var that = this;
  //   that.setData({
  //     userInfo: app.globalData.userInfo
  //   })
  // }
})
