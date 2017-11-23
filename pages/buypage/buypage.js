//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    testlist: [1, 2, 3, 4],
    articleList: [],
    isBuy: false,
    isLoad: false,
    showKeyWord: 　true
  },

  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../addpage/addpage'
    })
  },

  onShow: function () {
    console.log('onLoad');

    var that = this
    wx.request({
      //https://test.ueker.cn/qunshangquan/article/getArticleList.action 求购列表
      //https://test.ueker.cn/qunshangquan/article/getArticleListByRecord.action 我看过的，点赞，收藏 query: 1
      //https://test.ueker.cn/qunshangquan_linhoude/article/collectToArticle.action 收藏接口  articleId: 2
      //https://test.ueker.cn/qunshangquan_linhoude/article/thumbUpToArticle.action 点赞接口  articleId: 2
      //https://test.ueker.cn/qunshangquan_linhoude/article/getArticleDetailByArticleId.action   query: 1   获取 购物详情
      //https://test.ueker.cn/qunshangquan_linhoude/article/deleteArticleByArticleId.action   articleId: 1  根据采购ID删除采购
      //https://test.ueker.cn/qunshangquan/article/getArticleDetailByArticleId.action 
      url: 'https://test.ueker.cn/qunshangquan/article/getArticleList.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          openId: app.globalData.openId,
          sessionKey: app.globalData.sessionKey,
        })
      },

      success: function (ress) {
        if (ress.data.resultData) {
          that.setData({
            isLoad: true
          });
          // that.setData({
          //   articleList: ress.data.resultData.articleList
          // });
          var arraylist = ress.data.resultData.articleList;
          var arrayListData = [];
          for (var i = 0; i < arraylist.length; i++) {
            var listItem = {};
            var item = arraylist[i];
            for (var key in item) {
              listItem.address = item.address;
              //  var aa = app.FormatDate(str);
              listItem.addTime = app.FormatDate(item.addTime);
              listItem.articleId = item.articleId;
              listItem.collects = item.collects;
              listItem.content = item.content;
              listItem.lastTime = item.lastTime;
              listItem.likes = item.likes;
              listItem.potentialCustomer = item.potentialCustomer;
              listItem.state = item.state;
              // listItem.tag = item.tag;
              // var tagString = item.tag;
              listItem.tag = item.tag.split(",");
              if (item.tag == '') {
                that.setData({
                  showKeyWord: false
                });
              }
              listItem.userId = item.userId;
              listItem.views = item.views;
              //图片列表
              // listItem.imageList = item.imageList
              var imageLists = item.imageList;
              //接收图片数组
              var images = [];
              for (var j = 0; j < imageLists.length; j++) {
                var imgitem = {};
                for (var k in imageLists[j]) {
                  imgitem.articleId = imageLists[j].articleId;
                  imgitem.imageId = imageLists[j].imageId;
                  imgitem.sortOrder = imageLists[j].sortOrder;
                  imgitem.imageUrl = 'https://test.ueker.cn/qunshangquan/' + imageLists[j].imageUrl + '.jpg';
                }
                images.push(imgitem);
              }
              listItem.imageList = images;
              //这是一个列表
              listItem.potentialCustomerList = item.potentialCustomerList;
              /*
              var lists = item.potentialCustomerList;
              for (var j = 0; j < lists.length; j++) {
                var li = {};
                for (var k in lists[j]) {
               
                }
              }
              */
            }
            arrayListData.push(listItem);
          }
          arrayListData = arrayListData.reverse();
          that.setData({
            articleList: arrayListData
          });
          console.log("articleList");
          console.log(that.data.articleList);
        } else if (ress.data.resultCode == -5) {
          app.showErrorToast('网络请求错误');
        }
        if (that.data.articleList.length > 0) {
          that.setData({
            isBuy: true
          });
        } else {
          that.setData({
            isBuy: false
          });
        }

      }
    })
    //调用应用实例的方法获取全局数据
    /*
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    */
  },
  // onShow: function () {
  //   var that = this;
  //   that.setData({
  //     userInfo: app.globalData.userInfo
  //   })
  // }
})
