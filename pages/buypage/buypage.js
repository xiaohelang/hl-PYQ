//获取应用实例
let api = require('../../utils/api.js')
var app = getApp()
let ERR_OK = 0
Page({
  data: {
    circleList: [
      // {
      //   circleId: '',
      //   circleLogo: '',
      //   circleName: ''
      // }
    ],
    userInfo: {},
    a: {
      name: "夜幕小草",
      age: 90
    },
    blist: [
      {
        name: "夜幕小草1",
        age: 191
      },
      {
        name: "夜幕小草2",
        age: 192
      },
      {
        name: "夜幕小草3",
        age: 193
      },
    ],
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
  // 获取行业分类id和名字
  getIndustryStr: function (cbFn) {
    let that = this
    api.getIndustryStr({}, function (res) {
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
    }, function (res) {
      console.log('行业-res')
      console.log(res)
      if (res.code === ERR_OK) {
        that.setData({
          articleList: res.data.content
        })
      }
    }, function (err) {
      console.log('行业-err')
      console.log(err)
    })
  },
  // 18.所有商圈
  getCircleAll: function () {
    let that = this
    api.getCircleAll({}, function (res) {
      console.log('所有商圈')
      if (res.code === ERR_OK) {
        // that.data.circleList = res.data.recordList
        that.setData({
          circleList: res.data.recordList
        })
      }
      console.log(res)
    }, function (err) {
      console.log('所有商圈-err')
      console.log(err)
    })
  },
  // 跳转到商圈详情
  toCircle: function (e) {
    let circleid = e.currentTarget.dataset.circleid
    wx.navigateTo({
      url: '../../pages/tradearea/tradearea?circleid=' + circleid,
    })
  },

  //分享页面
  onShareAppMessage: function (options) {
    var industryinfoid = this.data.industryinfoid;
    return {
      title: '你的微信好友发布了一条新消息~~~ ',
      path: 'pages/buypage/buypage',
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

  onLoad: function () {
    let that = this
    that.getCircleAll()
    this.getIndustryStr(function (industryId) {
      that.getInfoPage(industryId)
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
