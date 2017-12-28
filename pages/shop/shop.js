const api = require('../../utils/api.js')
const ERR_OK = 0
const PAGESIZE = 10

var app = getApp()

Page({
  data: {
    shopid: '',
    uid: '',
    pageIndex: 1,
    shopInfo: {},
    noText: false,
    noMore: false,
    circleJosn: {
      background: 'http://img5.imgtn.bdimg.com/it/u=679805784,3150507797&fm=27&gp=0.jpg',
      circleName: '小程序1号店',
      shortIntro: '小程序1号店简介小程序1号店简介小程序1号店简介小程序1号店简介小程序1号店简介小程序1号店简介小程序1号店简介小程序1号店简介小程序1号店简介'
    },
    img1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511963777060&di=eea81c6a33b19e4ae5ec87bbf42eb510&imgtype=0&src=http%3A%2F%2Fimg.duote.com%2FqqTxImg%2F2011%2F05%2F23%2F130613964532.jpg',
    articleList: [
      // {
      //   attentions: 0,
      //   commments: 0,
      //   content: '这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品',
      //   createDate: '2017-12-09',
      //   nickname: '大树2',
      //   headImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511963777060&di=eea81c6a33b19e4ae5ec87bbf42eb510&imgtype=0&src=http%3A%2F%2Fimg.duote.com%2FqqTxImg%2F2011%2F05%2F23%2F130613964532.jpg',
      //   images: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511595512641&di=167b61d8957f3624fa66076ebbd2dee4&imgtype=0&src=http%3A%2F%2Fimg6.lady8844.com%2Fforum%2Fmonth_1406%2F1406031425452891ffb384e131.jpg'],
      //   industryId: 'koklk',
      //   industryInfoId: 'lplplp',
      //   praises: 0,
      //   showLocation: 0,
      //   visits: 0,
      //   uid: "2aa42743-6f2c-4fdd-b91e-a649ebe777bf",
      // },
      // {
      //   attentions: 0,
      //   commments: 0,
      //   content: '这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品',
      //   createDate: '2017-12-09',
      //   nickname: '大树2',
      //   headImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511963777060&di=eea81c6a33b19e4ae5ec87bbf42eb510&imgtype=0&src=http%3A%2F%2Fimg.duote.com%2FqqTxImg%2F2011%2F05%2F23%2F130613964532.jpg',
      //   images: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511595512641&di=167b61d8957f3624fa66076ebbd2dee4&imgtype=0&src=http%3A%2F%2Fimg6.lady8844.com%2Fforum%2Fmonth_1406%2F1406031425452891ffb384e131.jpg'],
      //   industryId: 'koklk',
      //   industryInfoId: 'lplplp',
      //   praises: 0,
      //   showLocation: 0,
      //   visits: 0,
      //   uid: "2aa42743-6f2c-4fdd-b91e-a649ebe777bf",
      // }
    ]
  },

  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../buypage/buypage'
    })
  },
  // 27. 商户详情
  getShopInfo: function (shopId ) {
    let that = this
    api.getShopInfo({
      token: app.globalData.token, 
      shopId: shopId 
    }, function(res) {
      console.log("商户详情--res")
      console.log(res)
      if (res.code === ERR_OK) {
        that.setData({
          shopInfo: res.data,
          uid: res.data.uid
        })
        that.getInfoPage(that.data.uid, that.data.pageIndex)
      }
    }, function(err) {
      console.log("商户详情--err")
      console.log(err)
    })
  },
  // 15. 资讯列表
  getInfoPage: function(uid, pageIndex){
    let that = this
    api.getInfoPage({
      uid: uid,
      pageIndex: pageIndex,
      pageSize: PAGESIZE
    }, function(res){
      console.log("资讯列表--res")
      console.log(res)
      if (that.data.articleList.length === 0) {
        that.setData({
          noText: true
        })
        } else{
        that.setData({
          noText: false
        })
      }
      if (res.code === ERR_OK) {
        that.setData({
          articleList: [...that.data.articleList, ...res.data.content]
        })
      }
      if (res.data.totalPages === that.data.pageIndex) {
        that.setData({
          noMore: true
        })
      } else{
        that.setData({
          noMore: false
        })
      }
    }, function(err){
      console.log("资讯列表--err")
      console.log(err)
    })
  },
  // 上拉加载
  onReachBottom: function () {
    let that = this
    that.setData({
      pageIndex: that.data.pageIndex + 1
    })
    that.getInfoPage(that.data.uid, that.data.pageIndex)
  },

  onLoad: function (options) {
    console.log("商户详情---options")
    console.log(options)
    let that = this
    that.setData({
      shopid: options.shopid
    })

    that.getShopInfo(that.data.shopid)

  },
  onShow: function (options) {

    // that.getCircleAll()
    // that.setData({
    //   userInfo: app.globalData.userInfo
    // })
  }
})
