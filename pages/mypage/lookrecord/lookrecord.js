//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    showItemAll: false,
    userInfo: {},
    testlist: [1, 2, 3, 4],
    itemList: [{ "look": "我看过的", "lookicon": "../../../icons/查看记录.png" }, { "look": "我的点赞", "lookicon": "../../../icons/求购-点赞.png" }, { "look": "我的收藏", "lookicon": "../../../icons/求购-收藏.png" }],
    tapIndex: 0,
    articleList: []
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindTapOut: function () {
    this.setData({
      showItemAll: true
    });
  },
  switchTab: function (e) {
    console.log("e");
    console.log(e.target.dataset.idx);
    var that = this;
    this.setData({
      showItemAll: false,
      tapIndex: e.target.dataset.idx
    });
    var jsonData = {};
    if (that.data.tapIndex === 0) {
      jsonData = {
        openId: app.globalData.openId,
        sessionKey: app.globalData.sessionKey,
      }
    } else if (that.data.tapIndex === 1) {
      jsonData = {
        openId: app.globalData.openId,
        sessionKey: app.globalData.sessionKey,
        query: 1
      }
    } else if (that.data.tapIndex === 2) {
      jsonData = {
        openId: app.globalData.openId,
        sessionKey: app.globalData.sessionKey,
        query: 2
      }
    }
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/article/getArticleListByRecord.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (ress) {
        console.log("查看记录");
        console.log(ress);
        if (ress.data.resultData) {
          var arraylist = ress.data.resultData.articleList;
          var arrayListData = [];
          for (var i = 0; i < arraylist.length; i++) {
            var listItem = {};
            var item = arraylist[i];
            for (var key in item) {
              listItem.address = item.address;
              listItem.addTime = item.addTime;
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
          console.log("arrayListData");
          console.log(arrayListData);
          arrayListData = arrayListData.reverse();
          that.setData({
            articleList: arrayListData
          });
          console.log("articleList");
          console.log(that.data.articleList);
        }
      }
    })
  },

  actionSheetTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['我看过的', '我的点赞', '我的收藏'],
      success: function (e) {
        console.log(e.tapIndex)
        that.setData({
          tapIndex: e.tapIndex
        });
        var jsonData = {};
        if (that.data.tapIndex === 0) {
          jsonData = {
            openId: app.globalData.openId,
            sessionKey: app.globalData.sessionKey,
          }
        } else if (that.data.tapIndex === 1) {
          jsonData = {
            openId: app.globalData.openId,
            sessionKey: app.globalData.sessionKey,
            query: 1
          }
        } else if (that.data.tapIndex === 2) {
          jsonData = {
            openId: app.globalData.openId,
            sessionKey: app.globalData.sessionKey,
            query: 2
          }
        }
        wx.request({
          url: 'https://test.ueker.cn/qunshangquan/article/getArticleListByRecord.action',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            data: JSON.stringify(jsonData)
          },
          success: function (ress) {
            console.log("查看记录");
            console.log(ress);
            if (ress.data.resultData) {
              var arraylist = ress.data.resultData.articleList;
              var arrayListData = [];
              for (var i = 0; i < arraylist.length; i++) {
                var listItem = {};
                var item = arraylist[i];
                for (var key in item) {
                  listItem.address = item.address;
                  listItem.addTime = item.addTime;
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
              console.log("arrayListData");
              console.log(arrayListData);
              arrayListData = arrayListData.reverse();
              that.setData({
                articleList: arrayListData
              });
              console.log("articleList");
              console.log(that.data.articleList);
            }
          }
        })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/article/getArticleListByRecord.action',
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
        console.log("查看记录");
        console.log(ress);
        var arraylist = ress.data.resultData.articleList;
        var arrayListData = [];
        for (var i = 0; i < arraylist.length; i++) {
          var listItem = {};
          var item = arraylist[i];
          for (var key in item) {
            listItem.address = item.address;
            listItem.addTime = item.addTime;
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
        console.log("arrayListData");
        console.log(arrayListData);
        arrayListData = arrayListData.reverse();
        that.setData({
          articleList: arrayListData
        });
        console.log("articleList");
        console.log(that.data.articleList);
      }
    })
  }
})
