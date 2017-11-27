let api = require('../../../utils/api.js')
var app = getApp()
let ERR_OK = 0
var app = getApp()
Page({
  data: {
    industryinfoid: '',
    articleDetail: {
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
      visits: 0,
      showLocation: 0,
      uid: "2aa42743-6f2c-4fdd-b91e-a649ebe777bf",
    },
 
    isLoad: true,
    userInfo: {},
    isBuy: true,
    user: {},
    potentialCustomerList: [],
    articleId: '',
    itemList: ['全部', '点赞', '收藏'],
    tapIndex: 0,
    collectsAndlikes: '',
    idx: 0,
    showSearch: false,
    showKeyWord: true,
  },

  // 动态--详情
  getInfoPageDetail: function (industryInfoId) {
    let that = this
    api.getInfoPageDetail({
      industryInfoId: industryInfoId
    }, function (res) {
      console.log(res)
      if (res.code ===ERR_OK) {
        that.setData({
          articleDetail: res.data
        })
      }
    }, function (err) {
      console.log('详情err')
      console.log(err)
    })
  },
  // 收藏
  getAttentionAdd: function() {
    let that = this
  },
  // 收藏
  getAttentionAdd: function (e) {
    let that = this
    let industryinfoid = e.currentTarget.dataset.industryinfoid
    api.getAttentionAdd({
      token: app.globalData.token,
      industryInfoId: industryinfoid
    }, function (res) {
      console.log('收藏res')
      console.log(res)
    }, function (err) {
      console.log('收藏err')
      console.log(err)
    })
  },
  // 收藏取消
  getAttentionCancel: function (e) {
    let that = this
    let industryinfoid = e.currentTarget.dataset.industryinfoid
    api.getAttentionCancel({
      token: app.globalData.token,
      industryInfoId: industryinfoid
    }, function (res) {
      console.log('收藏取消res')
      console.log(res)
    }, function (err) {
      console.log('收藏取消err')
      console.log(err)
    })
  },
  // 点赞
  getPraiseAdd: function(e) {
    let that = this
    let industryinfoid = e.currentTarget.dataset.industryinfoid
    api.getPraiseAdd({
      token: app.globalData.token,
      industryInfoId: industryinfoid
    }, function(res){
      console.log('点赞res')
      console.log(res)
    },  function(err){
      console.log('点赞err')
      console.log(err)
    })
  },
  // 取消点赞
  getPraiseCancel: function (e) {
    let that = this
    let industryinfoid = e.currentTarget.dataset.industryinfoid
    api.getPraiseCancel({
      token: app.globalData.token,
      industryInfoId: industryinfoid
    }, function (res) {
      console.log('取消点赞res')
      console.log(res)
    }, function (err) {
      console.log('取消点赞err')
      console.log(err)
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
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
  //删除功能
  deleteItem: function () {
    var that = this;
    app.sendRequest({
      url: app.globalUrl.deleteArticleByArticleId,
      data: {
        sessionKey: app.globalData.sessionKey,
        articleId: that.data.articleId
      },
      success: function (res) {
        if (res.data) {
          if (res.data.resultCode === 0) {
            console.log("删除数据");
            // app.publishMode("删除成功");
            app.allShowMode("提示", "删除成功", "../../../pages/buypage/buypage")
          }
        }
      }
    });
  },
  //打电话功能
  phoneCall: function (e) {
    var testId = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: testId
    })
  },
  copyToClipboard: function (e) {
    console.log("复制复制");
    console.log(e.currentTarget.dataset.idx);
    var cliData = e.currentTarget.dataset.idx
    wx.setClipboardData({
      data: cliData,
      success: function (res) {
        //提示复制成功    
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
        })
      },
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
    console.log('industryinfoid')
    console.log(options)
    this.setData({
      industryinfoid: options.industryinfoid
    });
    var that = this;
    that.getInfoPageDetail(that.data.industryinfoid)
  }
})
