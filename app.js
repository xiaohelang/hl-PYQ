//app.js
const api = require('./utils/api.js')

App({
  data: {
    
    code: '',
    signature: '',
    rowData: '',
    encryptedData: '',
    iv: '',
    wechatName: '',
    avatar: '',
    sex: '',
    userInfo: {},
  },
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    //获取登录接口
    var that = this;

    wx.login({
      success: function (obj) {
        that.data.code = obj.code;
        wx.getUserInfo({
          success: function (res) {
            console.log('suceess-getinfo')
            console.log(res)
            that.data.signature = res.signature
            that.data.rawData = res.rawData
            that.data.encryptedData = res.encryptedData
            that.data.iv = res.iv
            api.getLogin({
              code: that.data.code,
              signature: that.data.signature,
              rowData: that.data.rowData,
              encryptedData: that.data.encryptedData,
              iv: that.data.iv
            }, function(res){
              console.log('登录')
              console.log(res)
            }, function(err){
              console.log('登录失败')
              console.log(err)
            })
            
            // if (that.data.code !== null) {
            //   //登录接口请求数据
            //   that.sendRequest({
            //     url: that.globalUrl.loginWeiXin,
            //     data: {
            //       code: that.data.code,
            //       wechatName: that.data.wechatName,
            //       avatar: that.data.avatar,
            //       sex: that.data.sex
            //     },
            //     success: function (res) {
            //       console.log("登录接口请求数据");
            //       console.log(res);
            //       if (res.data.resultCode === 0) {
            //         that.globalData.openId = res.data.resultData.openId;
            //         that.globalData.sessionKey = res.data.resultData.sessionKey;
            //         that.getUserdata();
            //       }
            //     }
            //   })
            // } else {
            //   console.log('获取用户登录态失败！')
            // }
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })

      }
    })
  },
  //获取用户信息
  getUserdata: function () {
    var that = this;
    that.sendRequest({
      // url: 'https://test.ueker.cn/qunshangquan/user/getUserDetailByOpenId.action',
      url: that.globalUrl.getUserDetailByOpenId,
      data: {
        openId: that.globalData.openId,
        sessionKey: that.globalData.sessionKey
      },
      success: function (res) {
        console.log("封装方法请求回来的数据");
        console.log(res);
        if (res.data.resultCode === 0) {
          that.globalData.userInfo = res.data.resultData.user;
        }
      }
    })
  },

  //修改用户信息,暂时没实现
  saveUserInfo: function (item, inputValue) {
    console.log("item");
    console.log(item);
    var that = this;
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/user/updateUserByOpenId.action',
      method: "POST",
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          openId: that.globalData.openId,
          sessionKey: that.globalData.sessionKey,
          item: inputValue
        })
      },

      success: function (ress) {
        console.log("修改昵称返回的数据");

        console.log(ress);
        console.log("ress.data.resultCode");
        console.log(ress.data.resultCode);
        if (ress.data.resultCode === 0) {
          that.getUserdata();
          that.showMode();
          // app.showToastSuccess();
          // wx.navigateBack({

          // });
        }
      }
    })
  },
  //修改用户信息提示跳转
  showMode: function () {
    wx.navigateBack({

    })
  },
  //发布数据
  publishMode: function (titleStr, articleId) {
    wx.showModal({
      title: '提示',
      content: titleStr,
      showCancel: false,
      success: function (res) {
        console.log("success");
        console.log(res);
        if (res.confirm === true) {
          // wx.switchTab({
          //   // url: '../../pages/buypage/buypage'
          //   url: '../../../pages/buypage/buydetails/buydetails'
          // })
          wx.navigateTo({
            url: '../../pages/buypage/buydetails/buydetails?articleId=' + articleId,
          })
        }

      }
    })
  },
  //模态框提示
  allShowMode: function (titleStr, contentStr, urlStr) {
    wx.showModal({
      title: titleStr,
      content: contentStr,
      showCancel: false,
      success: function (res) {
        console.log("success");
        console.log(res);
        if (res.confirm === true) {
          wx.switchTab({
            url: urlStr
          })
        }

      }
    })
  },

  showToastSuccess: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 3000,
      success: function (res) {
        console.log("res");
        console.log(res);
        wx.navigateBack({

        });
      },
    })
  },
  //显示提示
  showDataToast: function (titleStr, iconStr, durationInt) {
    wx.showToast({
      title: titleStr,
      icon: iconStr,
      duration: durationInt,
      success: function (res) {
        console.log("res");
        console.log(res);
        wx.navigateBack({

        });
      },
    })
  },
  //显示不带返回的
  showNoToast: function (titleStr, iconStr, durationInt) {
    wx.showToast({
      title: titleStr,
      icon: iconStr,
      duration: durationInt,
      success: function (res) {
        console.log("res");
        console.log(res);
      },
    })
  },
  /*封装的数据请求*/
  sendRequest: function (options) {
    options = options || {};
    if (!options.url) return;
    options.data = options.data || {};
    options.type = options.type || "POST";
    options.header = options.header || { 'content-type': 'application/x-www-form-urlencoded' };

    wx.request({
      url: options.url,
      method: options.type ,
      header: options.header,
      data: {
        data: JSON.stringify(
          //   {
          //   code: that.data.code,
          //   wechatName: that.data.wechatName,
          //   avatar: that.data.avatar,
          //   sex: that.data.sex
          // }
          options.data
        )
      },
      success: function (res) {
        options.success(res);
      },
      fail: function (res) {
        options.fail(res);
      }
    })
  },
  globalUrl: {
    /*用户模块*/
    loginWeiXin: 'https://test.ueker.cn' + '/qunshangquan/user/loginWeiXin.action',  /*登录接口请求数据*/
    getUserDetailByOpenId: 'https://test.ueker.cn' + '/qunshangquan/user/getUserDetailByOpenId.action', /*获取用户详情*/
    updateUserByOpenId: 'https://test.ueker.cn' + '/qunshangquan/user/updateUserByOpenId.action',  /*编辑用户*/
    sendVerifyCode: 'https://test.ueker.cn' + '/qunshangquan/verifyCode/sendVerifyCode.action', /*发送短信验证码*/
    checkVerifyCode: 'https://test.ueker.cn' + '/qunshangquan/verifyCode/checkVerifyCode.action', /*核验短信验证码*/

    /*商品模块*/
    deleteArticleByArticleId: 'https://test.ueker.cn' + '/qunshangquan/article/deleteArticleByArticleId.action',/*删除商品*/
  },
  /*时间戳转换格式*/
  FormatDate: function (strTime) {
    var date = new Date(strTime);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
  },
  /*全局变量*/
  globalData: {
    userInfo: null,
    openId: null,
    sessionKey: null
  },

  chooseImage: function (callback, count) {
    var that = this;
    wx.chooseImage({
      count: count || 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths,
          imageUrls = [];

        // that.showToast({
        //   title: '提交中...',
        //   icon: 'loading',
        //   duration: 10000
        // });
        // for (var i = 0; i < tempFilePaths.length; i++) {
        //   wx.uploadFile({
        //     url : that.globalData.siteBaseUrl+ '/index.php?r=AppData/uploadImg',
        //     filePath: tempFilePaths[i],
        //     name: 'img_data',
        //     success: function(res){
        //       var data = JSON.parse(res.data);
        //       if(data.status == 0){
        //         imageUrls.push(data.data);
        //         if(imageUrls.length == tempFilePaths.length){
        //           that.hideToast();
        //           typeof callback == 'function' && callback(imageUrls);
        //         }
        //       } else {
        //         that.showModal({
        //           content: data.data
        //         })
        //       }
        //     },
        //     fail: function(res){
        //       console.log(res.errMsg);
        //     }
        //   })
        // }

      }
    })
  },
})