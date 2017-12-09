//app.js
const api = require('./utils/api.js')

App({
  data: {
    code: '',
    isloading: false,
    signature: '',
    rawData: '',
    encryptedData: '',
    iv: '',
    heliangTest: '',
    wechatName: '',
    avatar: '',
    sex: '',
    userInfo: {},
  },
  onLaunch: function (options) {
    this.globalData.isloading = false
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    //获取登录接口
    var that = this;
    wx.login({
      success: function (obj) {
        console.log('code')
        console.log(obj.code)
        that.data.code = obj.code;
        wx.getUserInfo({
          success: function (res) {
            console.log('suceess-getinfo')
            console.log(res)
            console.log('rowData')
            console.log(res.rawData)
            that.data.signature = res.signature
            that.data.rawData = res.rawData
            that.data.encryptedData = res.encryptedData
            that.data.iv = res.iv
            api.getLogin({
              code: that.data.code,
              signature: that.data.signature,
              rowData: that.data.rawData,
              encryptedData: that.data.encryptedData,
              iv: that.data.iv
            }, function (res) {
              console.log('登录')
              console.log(res)
              if (res.code === 0) {
                that.globalData.isloading = true
                that.globalData.token = res.data.token
                console.log(that.globalData.token)
              }
            }, function (err) {
              console.log('登录失败')
              console.log(err)
            })

            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })

      }
    })
  },

  //修改用户信息提示跳转
  showMode: function () {
    wx.navigateBack({

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
    })
  },
  globalUrl: {
  },
  /*时间戳转换格式*/
  FormatDate: function (strTime) {
    var date = new Date(strTime);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
  },
  /*全局变量*/
  globalData: {
    token: null,
    userInfo: null,
    openId: null,
    sessionKey: null
  },
})