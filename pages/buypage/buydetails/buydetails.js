
let api = require('../../../utils/api.js')
var app = getApp()
let ERR_OK = 0
var app = getApp()
Page({
  data: {
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
      showLocation: 0,
      uid: "2aa42743-6f2c-4fdd-b91e-a649ebe777bf",
    },
    name: '夜幕小草',
    article:  {
    content: '这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品',
    articleId: "1213",
    imageList: [
      { imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511619312857&di=7c4e6b2428df6aa03ba5db8a4e7d0bd7&imgtype=0&src=http%3A%2F%2Fwww.zhlzw.com%2FUploadFiles%2FArticle_UploadFiles%2F201204%2F20120412123910738.jpg' },
      { imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511619312857&di=7c4e6b2428df6aa03ba5db8a4e7d0bd7&imgtype=0&src=http%3A%2F%2Fwww.zhlzw.com%2FUploadFiles%2FArticle_UploadFiles%2F201204%2F20120412123910738.jpg' },
      { imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511619312857&di=7c4e6b2428df6aa03ba5db8a4e7d0bd7&imgtype=0&src=http%3A%2F%2Fwww.zhlzw.com%2FUploadFiles%2FArticle_UploadFiles%2F201204%2F20120412123910738.jpg' },
      { imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511619312857&di=7c4e6b2428df6aa03ba5db8a4e7d0bd7&imgtype=0&src=http%3A%2F%2Fwww.zhlzw.com%2FUploadFiles%2FArticle_UploadFiles%2F201204%2F20120412123910738.jpg' },
      { imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511619312856&di=f9a1e6064e42b4e818f0a721797b3615&imgtype=0&src=http%3A%2F%2Fpic17.nipic.com%2F20111024%2F8020302_152657166118_2.jpg' },
      { imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511619312856&di=f9a1e6064e42b4e818f0a721797b3615&imgtype=0&src=http%3A%2F%2Fpic17.nipic.com%2F20111024%2F8020302_152657166118_2.jpg' },
      { imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511619312856&di=f9a1e6064e42b4e818f0a721797b3615&imgtype=0&src=http%3A%2F%2Fpic17.nipic.com%2F20111024%2F8020302_152657166118_2.jpg' },
    ],
    addTime: '2017-12-03',
    potentialCustomer: 68,
    collects: '123',
    likes: 909
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
    var artId = this.data.articleId;
    return {
      title: '这是你需要的 ',
      path: '/pages/buypage/tobuy/tobuy?articleId=' + artId,
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
  //刷选
  searchTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['全部', '点赞', '收藏'],
      success: function (e) {
        console.log('tapIndex')
        console.log(e.tapIndex)
        that.setData({
          tapIndex: e.tapIndex
        });
        var jsonData = {};
        if (that.data.tapIndex === 0) {
          jsonData = {
            sessionKey: app.globalData.sessionKey,
            // articleId: 3
            articleId: that.data.articleId
          }
        } else if (that.data.tapIndex === 1) {
          jsonData = {
            sessionKey: app.globalData.sessionKey,
            // articleId: 3,
            articleId: that.data.articleId,
            query: 1
          }
        } else if (that.data.tapIndex === 2) {
          jsonData = {
            sessionKey: app.globalData.sessionKey,
            articleId: that.data.articleId,
            // articleId: 3,
            query: 2
          }
        }
        wx.request({
          url: 'https://test.ueker.cn/qunshangquan/article/getArticleDetailByArticleId.action',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            data: JSON.stringify(jsonData)
          },
          success: function (ress) {
            if (ress.data.resultData) {
              that.setData({
                // article: ress.data.resultData.article,
                user: ress.data.resultData.user
              });

              console.log("获取求购详情");
              console.log(ress);
              var dataArticle = ress.data.resultData.article;
              // var arrayListData = [];
              // for (var i = 0; i < arraylist.length; i++) {
              var listItem = {};
              var item = dataArticle;
              for (var key in dataArticle) {
                // listItem.addTime = item.addTime;
                listItem.addTime = app.FormatDate(dataArticle.addTime);
                listItem.address = item.address;
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
                //这是一个列表潜在客户
                listItem.potentialCustomerList = item.potentialCustomerList;
                that.setData({
                  potentialCustomerList: item.potentialCustomerList
                })
                // that.data.potentialCustomerList = item.potentialCustomerList;
                /* 要遍历这个潜在客户
                var cusList = [];
                var customerList = item.potentialCustomerList;
                // for(var i = 0; i < customerList.length; i++) {
                //   var cusItem = {};
                //   var customerItem = customerList[i];
                //   for(var k in customerItem ){
                //     cusItem.
                //   }
                // }
                */
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
                  // }
                  listItem.imageList = images;
                  /*
                  var lists = item.potentialCustomerList;
                  for (var j = 0; j < lists.length; j++) {
                    var li = {};
                    for (var k in lists[j]) {
                   
                    }
                  }
                  */
                }

              }
              // that.data.article = listItem; 千万别这样写
              if (that.data.tapIndex === 0) {
                that.setData({
                  collectsAndlikes: ''
                });
              } else if (that.data.tapIndex === 1) {
                that.setData({
                  collectsAndlikes: item.likes
                });
              } else if (that.data.tapIndex === 2) {
                that.setData({
                  collectsAndlikes: item.collects
                });
              }

              console.log("potentialCustomerList");
              console.log(that.data.potentialCustomerList);
              console.log(that.data.potentialCustomerList.length);
              console.log("article");
              console.log(that.data.article);
              console.log("user");
              console.log(that.data.user);
              // that.setData({
              //   articleList: arrayListData
              // });
              // console.log("articleList");
              // console.log(that.data.articleList);
            }
          }
        })
      }
    })
  },

  searchTap2: function () {
    this.setData({
      showSearch: true
    })
  },
  //点击选择
  switchTab: function (e) {
    var that = this;
    itemList: ['全部', '点赞', '收藏'],
      console.log("点击选择");
    console.log(e.target.dataset.idx);
    this.setData({
      tapIndex: e.target.dataset.idx,
      showSearch: false
    });


    var jsonData = {};
    if (that.data.tapIndex === 0) {
      jsonData = {
        sessionKey: app.globalData.sessionKey,
        // articleId: 3
        articleId: that.data.articleId
      }
    } else if (that.data.tapIndex === 1) {
      jsonData = {
        sessionKey: app.globalData.sessionKey,
        // articleId: 3,
        articleId: that.data.articleId,
        query: 1
      }
    } else if (that.data.tapIndex === 2) {
      jsonData = {
        sessionKey: app.globalData.sessionKey,
        articleId: that.data.articleId,
        // articleId: 3,
        query: 2
      }
    }
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/article/getArticleDetailByArticleId.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (ress) {
        if (ress.data.resultData) {
          that.setData({
            // article: ress.data.resultData.article,
            user: ress.data.resultData.user
          });

          console.log("获取求购详情");
          console.log(ress);
          var dataArticle = ress.data.resultData.article;
          // var arrayListData = [];
          // for (var i = 0; i < arraylist.length; i++) {
          var listItem = {};
          var item = dataArticle;
          for (var key in dataArticle) {
            // listItem.addTime = item.addTime;
            listItem.addTime = app.FormatDate(dataArticle.addTime);
            listItem.address = item.address;
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
            //这是一个列表潜在客户
            listItem.potentialCustomerList = item.potentialCustomerList;
            // that.data.potentialCustomerList = item.potentialCustomerList;
            that.setData({
              potentialCustomerList: item.potentialCustomerList
            })
            /* 要遍历这个潜在客户
            var cusList = [];
            var customerList = item.potentialCustomerList;
            // for(var i = 0; i < customerList.length; i++) {
            //   var cusItem = {};
            //   var customerItem = customerList[i];
            //   for(var k in customerItem ){
            //     cusItem.
            //   }
            // }
            */
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
              // }
              listItem.imageList = images;
              /*
              var lists = item.potentialCustomerList;
              for (var j = 0; j < lists.length; j++) {
                var li = {};
                for (var k in lists[j]) {
               
                }
              }
              */
            }

          }
          // that.data.article = listItem; 千万别这样写
          if (that.data.tapIndex === 0) {
            that.setData({
              collectsAndlikes: ''
            });
          } else if (that.data.tapIndex === 1) {
            that.setData({
              collectsAndlikes: item.likes
            });
          } else if (that.data.tapIndex === 2) {
            that.setData({
              collectsAndlikes: item.collects
            });
          }

          console.log("potentialCustomerList");
          console.log(that.data.potentialCustomerList);
          console.log(that.data.potentialCustomerList.length);
          console.log("article");
          console.log(that.data.article);
          console.log("user");
          console.log(that.data.user);
          // that.setData({
          //   articleList: arrayListData
          // });
          // console.log("articleList");
          // console.log(that.data.articleList);
        }
      }
    })
    console.log("item.potentialCustomerList");
    console.log(that.data.potentialCustomerList);
  },
  onLoad: function (options) {
    this.setData({
      articleId: options.articleId
    });
    var that = this;
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/article/getArticleDetailByArticleId.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          // openId: app.globalData.openId,
          sessionKey: app.globalData.sessionKey,
          articleId: options.articleId

        })
      },
      success: function (ress) {
        if (ress.data.resultData) {
          that.setData({
            isLoad: true,
            user: ress.data.resultData.user
          });

          console.log("获取求购详情");
          console.log(ress);
          var dataArticle = ress.data.resultData.article;
          // var arrayListData = [];
          // for (var i = 0; i < arraylist.length; i++) {
          var listItem = {};
          var item = dataArticle;
          for (var key in dataArticle) {
            listItem.addTime = app.FormatDate(dataArticle.addTime);
            listItem.address = item.address;
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
            //这是一个列表潜在客户
            listItem.potentialCustomerList = item.potentialCustomerList;
            that.data.potentialCustomerList = item.potentialCustomerList;
            /* 要遍历这个潜在客户
            var cusList = [];
            var customerList = item.potentialCustomerList;
            // for(var i = 0; i < customerList.length; i++) {
            //   var cusItem = {};
            //   var customerItem = customerList[i];
            //   for(var k in customerItem ){
            //     cusItem.
            //   }
            // }
            */
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
              // }
              listItem.imageList = images;
              /*
              var lists = item.potentialCustomerList;
              for (var j = 0; j < lists.length; j++) {
                var li = {};
                for (var k in lists[j]) {
               
                }
              }
              */
            }

          }
          // that.data.article = listItem; 千万别这样写
          that.setData({
            article: listItem,
            potentialCustomerList: listItem.potentialCustomerList
          });
          console.log("potentialCustomerList");
          console.log(that.data.potentialCustomerList);
        }
      }
    })
  }
})
