
//获取应用实例
var app = getApp()
Page({
  data: {
    isLoad: false,
    motto: 'Hello World',
    userInfo: {},
    testlist: [1, 2, 3, 4],
    isBuy: true,
    code: '',
    wechatName: '',
    avatar: '',
    sex: '',
    article: {},
    user: {},
    record: {},
    potentialCustomerList: [],
    articleId: '',
    artId: '',

    itemList: ['全部', '点赞', '收藏'],
    tapIndex: 0,

    likes: 0,
    collects: 0,

    showDianZan: false,
    showShouCang: false,
    showMine: false,
    showKeyWord:true,

    collectsAndlikes: ''

  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //打电话功能
  phoneCall: function (e) {
    var testId = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: testId
    })
  },
  //刷选
  searchTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['全部', '点赞', '收藏'],
      success: function (e) {
        console.log(e.tapIndex)
        that.setData({
          tapIndex: e.tapIndex
        });
        var jsonData = {};
        if (that.data.tapIndex === 0) {
          jsonData = {
            sessionKey: app.globalData.sessionKey,
            // articleId: 3
            articleId: that.globalData.artId
          }
        } else if (that.data.tapIndex === 1) {
          jsonData = {
            sessionKey: app.globalData.sessionKey,
            // articleId: 3,
            articleId: that.globalData.artId,
            query: 1
          }
        } else if (that.data.tapIndex === 2) {
          jsonData = {
            sessionKey: app.globalData.sessionKey,
            articleId: that.globalData.artId,
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
              that.setData({
                article: listItem,
                potentialCustomerList: listItem.potentialCustomerList
              });
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
  //我也要发
  saveUserInfo: function () {
    wx.switchTab({
      url: '../../../pages/addpage/addpage',
    })
  },
  //删除功能
  shanChuBtn: function () {
    var that = this;
    wx.request({
      //https://test.ueker.cn/qunshangquan/article/getArticleList.action 求购列表
      //https://test.ueker.cn/qunshangquan/article/getArticleListByRecord.action 我看过的，点赞，收藏 query: 1
      //https://test.ueker.cn/qunshangquan_linhoude/article/collectToArticle.action 收藏接口  articleId: 2
      //https://test.ueker.cn/qunshangquan_linhoude/article/thumbUpToArticle.action 点赞接口  articleId: 2
      //https://test.ueker.cn/qunshangquan_linhoude/article/getArticleDetailByArticleId.action   query: 1   获取 购物详情
      //https://test.ueker.cn/qunshangquan_linhoude/article/deleteArticleByArticleId.action   articleId: 1  根据采购ID删除采购
      //https://test.ueker.cn/qunshangquan/article/getArticleDetailByArticleId.action 
      url: 'https://test.ueker.cn/qunshangquan/article/deleteArticleByArticleId.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          // openId: app.globalData.openId,
          sessionKey: app.globalData.sessionKey,
          // articleId: 10
          articleId: that.globalData.artId
        })
      },
      success: function (ress) {
        if (ress.data) {
          if (ress.data.resultCode === 0) {
            console.log("删除数据");
            // app.publishMode("删除成功");
            app.allShowMode("提示", "删除成功", "../../../pages/buypage/buypage")
          }
        }
      }
    })
  },

  //点赞
  dianZan: function () {
    if (this.data.showDianZan === true) {
      app.showNoToast("已经点赞过了", "success", 2000);
      return;
    }
    var likes = this.data.likes + 1;
    this.setData({
      showDianZan: true,
      likes: likes,
    });
    var that = this;
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/article/collectToArticle.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          openId: app.globalData.openId,
          sessionKey: app.globalData.sessionKey,
          articleId: that.globalData.artId
        })
      },

      success: function (ress2) {
        console.log("点赞接口");
        console.log(ress2);
        if (ress2.data.resultCode === 0) {
          app.showNoToast("点赞成功", "success", 2000);
        }
      }
    })
  },
  //收藏
  shouCang: function () {
    if (this.data.showShouCang === true) {
      app.showNoToast("已经收藏过了", "success", 2000);
      return;
    }
    var collects = this.data.collects + 1;
    this.setData({
      showShouCang: true,
      collects: collects
    });
    var that = this;
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/article/thumbUpToArticle.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          openId: app.globalData.openId,
          sessionKey: app.globalData.sessionKey,
          articleId: that.globalData.artId
        })
      },
      success: function (ress2) {
        console.log("收藏接口");
        console.log(ress2);
        if (ress2.data.resultCode === 0) {
          app.showNoToast("收藏成功", "success", 2000);

        }
      }
    })
  },

  //获取用户信息
  getUserdata: function () {
    var that = this;
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/user/getUserDetailByOpenId.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          openId: that.globalData.openId,
          sessionKey: that.globalData.sessionKey
        })
      },

      success: function (ress2) {
        console.log("getUserdata-heliang");
        console.log(ress2);
        if (ress2.data.resultCode === 0) {
          that.setData({
            isLoad: true
          });
          that.globalData.userInfo = ress2.data.resultData.user;
          that.getThirdBuyData();
        }
      }
    })
  },
  //请求数据
  getThirdBuyData: function () {
    var that = this;
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/article/getThirdPartyArticleDetailByArticleId.action',
      method: "POST",
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          openId: that.globalData.openId,
          sessionKey: that.globalData.sessionKey,
          // articleId: 3
          articleId: that.globalData.artId
        })
      },

      success: function (ress) {
        // that.globalData.userInfo = ress.data.resultData.user;
        console.log("第三方-求购");
        console.log(ress);
        if (ress.data.resultData) {
          that.setData({
            // article: ress.data.resultData.article,
            user: ress.data.resultData.user,
            record: ress.data.resultData.record
          });

          if (ress.data.resultData.record) {
            that.setData({
              showMine: true
            })
            /*显示是否点过赞*/
            if (ress.data.resultData.record.isCollect == 1) {
              that.setData({
                showShouCang: true,
              })
            }
            if (ress.data.resultData.record.isLike == 1) {
              that.setData({
                showDianZan: true,
              })
            }
          } else {
            that.setData({
              showMine: false
            })
          }

          console.log("获取求购详情");
          console.log(ress);
          var dataArticle = ress.data.resultData.article;

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
            // that.data.potentialCustomerList = item.potentialCustomerList;
            that.setData({
              potentialCustomerList: item.potentialCustomerList,
              collects: item.collects,
              likes: item.likes
            });
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
              listItem.imageList = images;
            }

          }
          // that.data.article = listItem; 千万别这样写
          that.setData({
            article: listItem
          });
          console.log("potentialCustomerList");
          console.log(that.data.potentialCustomerList);
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
  },
  onLoad: function (options) {
    // this.setData({
    //   artId: options.articleId
    // });

    this.globalData.artId = options.articleId;
    console.log("this.globalData.artId");
    console.log(this.globalData.artId);
    var that = this;
    //登录
    wx.login({
      success: function (obj) {
        that.data.code = obj.code;
        console.log('code');
        console.log(obj.code);

        wx.getUserInfo({
          success: function (res) {
            that.data.wechatName = res.userInfo.nickName;
            that.data.avatar = res.userInfo.avatarUrl;
            that.data.sex = res.userInfo.gender;
            if (that.data.code !== null) {

              wx.request({
                url: 'https://test.ueker.cn/qunshangquan/user/loginWeiXin.action',
                method: "POST",
                header: {
                  // 'content-type': 'application/json'
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  data: JSON.stringify({
                    code: that.data.code,
                    wechatName: that.data.wechatName,
                    avatar: that.data.avatar,
                    sex: that.data.sex
                  })
                },

                success: function (ress) {
                  that.globalData.openId = ress.data.resultData.openId;
                  that.globalData.sessionKey = ress.data.resultData.sessionKey;
                  that.getUserdata();
                }
              })
            } else {
              console.log('获取用户登录态失败！')
            }
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })

      }
    })

    // console.log('options.articleId')
    // console.log(options.articleId)

  },
  globalData: {
    userInfo: null,
    openId: null,
    sessionKey: null,
    artId: null
  },
})
