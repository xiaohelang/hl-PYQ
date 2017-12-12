//获取应用实例
let api = require('../../utils/api.js')
let util = require('../../util/util.js')

var app = getApp()
let ERR_OK = 0
let PAGESIZE  = 8
Page({
  data: {
    userInfo: {},
    industryArray: [],
    industryId: 0,
    listType: '',
    noText:'',
    attentionList: [],
    articleList: [
      // {
      //   attentioned: 2,
      //   attentions: 0,
      //   commments: 0,
      //   content: '这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品',
      //   createDate: '2017-12-09',
      //   nickname: '大树',
      //   praised: 1,
      //   status: 1,
      //   headImgUrl: '',
      //   images: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511595512641&di=167b61d8957f3624fa66076ebbd2dee4&imgtype=0&src=http%3A%2F%2Fimg6.lady8844.com%2Fforum%2Fmonth_1406%2F1406031425452891ffb384e131.jpg'],
      //   industryId: 'koklk',
      //   industryInfoId: 'lplplp',
      //   praises: 0,
      //   showLocation: 0,
      //   visits: 0,
      //   uid: "2aa42743-6f2c-4fdd-b91e-a649ebe777bf",
      // }
    ],
    isBuy: true,
    isLoad: true,
    showKeyWord: true,
    pageIndex: 1,
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
  getPersonPage: function (pageIndex) {
    let that = this
    api.getPersonPage({
      token: app.globalData.token,
      pageIndex: pageIndex,
      pageSize: PAGESIZE
    }, function(res){
      that.setData({
        isBuy: true
      })
      console.log("发布列表-res")
      console.log(res)
      if (res.code === ERR_OK) {
        if (res.data.content.length === 0 && pageIndex === 1) {
          // that.setData({
          //   isBuy: false
          // })
          that.setData({
            noText: "你还没发布过消息"
          })
        } else{
          that.setData({
            articleList: [...that.data.articleList, ...res.data.content]
          })
        }
      }
    },  function(err){
      console.log("发布列表-err")
      console.log(err)
    })
  },
  // 获取收藏列表
  getAttentionPage: function (pageIndex){
    let that = this
    api.getAttentionPage({
      token: app.globalData.token,
      pageIndex: pageIndex, 
      pageSize: PAGESIZE
    },  function(res){
      console.log('收藏列表')
      console.log(res)
      that.setData({
        isBuy: true
      })
      if (res.code === ERR_OK) {
        if (res.data.content.length === 0 && pageIndex === 1) {
          that.setData({
            isBuy: false
          })
          that.setData({
            noText: "你还没收藏过消息"
          })
        } else {
          let content = res.data.content
          for(let i = 0; i< content.length; i++) {
            let item = content[i]
            that.data.attentionList.push(item.industryInfo)
          }
          console.log('收藏列表')
          console.log(that.data.attentionList)
          that.setData({
            articleList: that.data.attentionList
          })
        }
      }
    }, function(err){
      console.log('收藏列表')
      console.log(err)
    })
  },
  // 获取我看过列表
  getIvisitPage: function (pageIndex){
    let that = this
    api.getIvisitPage({
      token: app.globalData.token,
      pageIndex: pageIndex,
      pageSize: PAGESIZE
    }, function(res){
      console.log("我看过列表--res")
      console.log(res)
      if (res.code === ERR_OK) {
        that.setData({
          isBuy: true
        })
        if (res.data.content.length === 0 && pageIndex===1 ) {
          that.setData({
            noText: "你还没浏览过消息"
          })
          that.setData({
            isBuy: false
          })
        } else {
          that.setData({
            articleList: res.data.content
          })
        }
      }
    }, function(err){
      console.log("我看过列表--err")
      console.log(err)
    })
  },

  // switch刷选
  switchTag: function (listType) {
    let that = this
    that.setData({
      articleList: []
    })
    switch (listType) {
      case "publicType":
        that.getPersonPage(1)
        wx.setNavigationBarTitle({
          title: '我发布的',
        })
        break
      case "attentionType":
        that.getAttentionPage(1)
        wx.setNavigationBarTitle({
          title: '我收藏的',
        })
        break
      case "viewType":
        that.getIvisitPage(1)
        wx.setNavigationBarTitle({
          title: '我看过的',
        })
        break
    }
  },
  // 上拉加载
  onReachBottom: function () {
    let that = this
    // that.getInfoPage()
    that.data.pageIndex += 1
    console.log('上拉加载')
    that.getPersonPage(that.data.pageIndex)

    console.log(that.data.pageIndex)

  },

  onLoad: function (options) {
    let that = this
    that.switchTag(options.listType)
  },
  // onShow: function () {
  //   var that = this;
  //   that.setData({
  //     userInfo: app.globalData.userInfo
  //   })
  // }
})
