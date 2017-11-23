//index.js
//获取应用实例
var util = require('../../../util/util.js')
var formatLocation = util.formatLocation
var app = getApp()
Page({
  data: {
    hasLocation: false,
    imagelists: "",
    inputValue: '',
    userInfo: {},
    imgUrl: '',
    imageList: [],
    sourceTypeIndex: 2,
    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],


    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
        })
      }
    })
  },
  //选择图片
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 9,
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        });
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://test.ueker.cn/qunshangquan/image/uploadImageList.action',
          filePath: tempFilePaths[0],
          name: "iamge",
          method: "POST",
          data: {
            data: JSON.stringify({
              sessionKey: app.globalData.sessionKey,
              openId: app.globalData.openId,
              imageType: 1
            })
          },
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            console.log("加班");
            if (res.data) {
              var data = JSON.parse(res.data);
              var imglist = JSON.stringify(data.resultData.imageList)
              that.data.imagelists = imglist;
              console.log(that.data.imagelists);
            }
          }
        })
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
    console.log("inputValue");
    console.log(this.data.inputValue);
  },
  //添加商品
  saveUserInfo: function () {
    var that = this
    wx.request({
      url: 'https://test.ueker.cn/qunshangquan/article/addArticle.action',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: JSON.stringify({
          openId: app.globalData.openId,
          sessionKey: app.globalData.sessionKey,
          address: that.data.locationAddress,
          content: that.data.inputValue,
          imageList: that.data.imagelists,
          tagList: ["鞋子", "型号1002"],
          address: that.data.locationAddress
        })
      },
      success: function (ress) {
        // that.globalData.userInfo = ress.data.resultData.user;
        console.log("添加商品");
        console.log(ress);
        if (ress.data.resultCode === 0) {
          app.publishMode();
        }
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  // choosePhoto: function () {
  //   let that = this;
  //   // app.chooseImage(function (imgUrl) {
  //   //   that.setData({
  //   //     // 'userInfo.cover_thumb': imgUrl
  //   //   })
  //   // });

  //   wx.chooseImage({
  //     count: 9, // 最多可以选择的图片张数，默认9
  //     sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
  //     success: function (res) {
  //       // success
  //       console.log("11");
  //       console.log(res);
  //       that.setData({
  //         imgUrl: res.tempFilePaths[0]
  //       });
  //       var tempFilePaths = res.tempFilePaths;
  //       console.log("app.globalData.sessionKey-上图");
  //       console.log(app.globalData.sessionKey);
  //       console.log("app.globalData.openId-上图");
  //       console.log(app.globalData.openId);
  //       wx.uploadFile({
  //         url: 'https://test.ueker.cn/qunshangquan_linhoude/image/uploadImageList.action',
  //         filePath: tempFilePaths[0],
  //         // name: 'file',
  //         // formData: {
  //         //   'user': 'test'
  //         // },
  //         name: "iamge",
  //         method: "POST",
  //         data: {
  //           data: JSON.stringify({
  //             sessionKey: app.globalData.sessionKey,
  //             openId: app.globalData.openId
  //             // imageType: 1
  //           })
  //         },
  //         header: {
  //           'content-type': 'multipart/form-data'
  //         },
  //         // header: {
  //         //   // 'content-type': 'application/json'
  //         //   'content-type': 'application/x-www-form-urlencoded'
  //         // },
  //         success: function (res) {
  //           var data = res.data;
  //           console.log("上传图片");
  //           console.log(res);
  //           //do something
  //         }
  //       })


  //     },
  //     fail: function (res) {
  //       // fail
  //     },
  //     complete: function (res) {
  //       // complete
  //     }
  //   })
  // },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
  },
  onShow: function () {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    })
  }
})
