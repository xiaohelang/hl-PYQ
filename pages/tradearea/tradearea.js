const api = require('../../utils/api.js')
const ERR_OK = 0

var app = getApp()

Page({
  data: {
    squareList: [
      { img: 'http://img5.imgtn.bdimg.com/it/u=679805784,3150507797&fm=27&gp=0.jpg', text: '娱乐1店' },
      { img: 'http://img3.imgtn.bdimg.com/it/u=2220894694,3086574981&fm=27&gp=0.jpg', text: '店铺4' },
      { img: 'http://img3.imgtn.bdimg.com/it/u=2220894694,3086574981&fm=27&gp=0.jpg', text: '店铺5' },
      { img: 'http://img3.imgtn.bdimg.com/it/u=2220894694,3086574981&fm=27&gp=0.jpg', text: '店铺6' },
      { img: 'http://img3.imgtn.bdimg.com/it/u=2220894694,3086574981&fm=27&gp=0.jpg', text: '店铺7' },
      { img: 'http://img3.imgtn.bdimg.com/it/u=2220894694,3086574981&fm=27&gp=0.jpg', text: '店铺8' },
      { img: 'http://img3.imgtn.bdimg.com/it/u=2220894694,3086574981&fm=27&gp=0.jpg', text: '店铺9' },
      { img: 'http://img3.imgtn.bdimg.com/it/u=2220894694,3086574981&fm=27&gp=0.jpg', text: '店铺10' }
    ],
    isSquare: false,
    noAddress: true,
    circleJosn: {
      background: '',
      circleName: '',
      shortIntro: ''
    },
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
    ],
    industryArray: [
      // {
      //   industryId: 0,
      //   industryName: '美食',
      // },
      // {
      //   industryId: 0,
      //   industryName: '服装',
      // },
      // {
      //   industryId: 0,
      //   industryName: '娱乐',
      // },
      // {
      //   industryId: 0,
      //   industryName: '餐饮',
      // }
    ],
    industryId: '',
    pageIndex: 1,
    totalPages: 0,
    circleId: '',
    noText: false,
    noMore: false,
    text: '查看',
    shopText: '商家入驻',
    view: '我看过的',
    attention: '我收藏的',
    public: '我发布的'
  },
  // 跳转到基本信息


  toBaseInfo: function () {
    console.log('跳转')
    wx.navigateTo({
      url: '../../pages/mypage/baseinfo/baseinfo'
    })
  },

  // 跳转到店铺
  toShop: function (e) {
    console.log("跳转店铺---shopid")
    console.log(e)
    let shopid = e.currentTarget.dataset.shopid
    wx.navigateTo({
      url: '../../pages/shop/shop?shopid=' + shopid,
    })
  },
  // 切换tab 分类
  tabClick: function (e) {
    let that = this
    console.log(e)
    this.setData({
      industryId: e.currentTarget.id,
      pageIndex: 1,
      articleList: [],
      totalPages: 0,
      noMore: false
    });
    // this.getInfoPage(this.data.industryId)
    that.getInfoPage(that.data.circleId, that.data.industryId, that.data.pageIndex)
  },
  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../buypage/buypage'
    })
  },

  // 15. 资讯列表
  getInfoPage: function (circleId, industryId, pageIndex) {
    let that = this
    api.getInfoPage({
      pageIndex: pageIndex,
      pageSize: 10,
      circleId: circleId,
      industryId: industryId
    }, function (res) {
      console.log("资讯列表--res")
      console.log(res)
      that.setData({
        totalPages: res.data.totalPages,
        articleList: [...that.data.articleList, ...res.data.content]
      })
      if (that.data.articleList.length === 0) {
        that.setData({
          noText: true
        })
      } else {
        that.setData({
          noText: false
        })
      }
      if (that.data.totalPages === that.data.pageIndex) {
        that.setData({
          noMore: true
        })
      } else {
        that.setData({
          noMore: false
        })
      }
    }, function (err) {
      console.log("资讯列表--err")
      console.log(err)
    })
  },
  // 上拉加载
  onReachBottom: function () {
    let that = this
    // that.getInfoPage()
    that.setData({
      pageIndex: that.data.pageIndex + 1
    })
    console.log('上拉加载')
    if (that.data.pageIndex > that.data.totalPages) {
      return
    } else {
      that.getInfoPage(that.data.circleId, that.data.industryId, that.data.pageIndex)
    }
    console.log(that.data.pageIndex)
  },

  // 18.商圈详情
  getCircleInfo: function (circleid) {
    let that = this
    api.getCircleInfo({
      circleId: circleid
    }, function (res) {
      console.log('商圈详情-res')
      console.log(res)
      if (res.code === ERR_OK) {
        that.setData({
          circleJosn: res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.circleName
        })
      }
    }, function (err) {
      console.log('商圈详情-err')
      console.log(err)
    })
  },
  // 28.商家列表
  getShopPage: function (circleId) {
    let that = this;
    api.getShopPage({
      token: app.globalData.token,
      pageIndex: 1,
      pageSize: 8,
      circleId: circleId,
      sortType: 1
    }, function (res) {
      console.log("商家列表-res")
      console.log(res)
      if (res.code === ERR_OK) {
        that.setData({
          squareList: res.data.content
        })
        if (that.data.squareList.length === 0) {
          that.setData({
            isSquare: true
          })
        } else {
          that.setData({
            isSquare: false
          })
        }
      }
    }, function (err) {
      console.log("商家列表-err")
      console.log(err)
    })
  },

  // 31. 获取商圈的所有行业
  getCircleIndustryAll: function (circleId) {
    let that = this
    api.getCircleIndustryAll({
      circleId: circleId
    }, function (res) {
      console.log("获取商圈的所有行业-res")
      console.log(res)
      if (res.code === ERR_OK) {
        that.setData({
          industryArray: res.data.recordList,
          industryId: res.data.recordList[0].industryId
        })
        that.getInfoPage(that.data.circleId, that.data.industryId, that.data.pageIndex)
      }
    }, function (err) {
      console.log('获取商圈的所有行业-err')
      console.log(err)
    })
  },

  onLoad: function (options) {
    console.log('options-area')
    console.log(options.circleid)
    var that = this;
    let circleid = options.circleid
    that.setData({
      circleId: circleid
    })
    var that = this;
    that.getCircleInfo(circleid)
    that.getShopPage(circleid)
    that.getCircleIndustryAll(circleid)
  },
  onShow: function (options) {

    // that.getCircleAll()
    // that.setData({
    //   userInfo: app.globalData.userInfo
    // })
  }
})
