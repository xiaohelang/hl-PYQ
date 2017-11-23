
//index.js
//获取应用实例
var util = require('../../util/util.js')
var formatLocation = util.formatLocation
var app = getApp()
Page({
  data: {
    hasLocation: false,
    imagelists: "",
    inputValue: '', /*需求输入*/
    userInfo: {},
    imgUrl: '',
    imageList: [], /*上传图片*/
    sourceTypeIndex: 2,
    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],
    tempFilePaths: [],/*图片的上传*/

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    showDianZan: false,
    showShouCang: false,

    showTag: true,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  shouCang: function () {
    this.setData({
      showShouCang: true
    });
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
    if (that.data.tempFilePaths.length > 8) {
      return;
    }
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 9,
      success: function (res) {
        console.log(res)
        that.data.tempFilePaths = that.data.tempFilePaths.concat(res.tempFilePaths)
        that.setData({
          // imageList: res.tempFilePaths
          imageList: that.data.tempFilePaths
        });
        // var tempFilePaths = res.tempFilePaths;
        // that.data.tempFilePaths = that.data.tempFilePaths.concat(res.tempFilePaths)
        console.log("上传图片");
        console.log(that.data.tempFilePaths);
        var tempFilePaths = that.data.tempFilePaths;
        var imglists = [];
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://test.ueker.cn/qunshangquan/image/uploadImageList.action',
            filePath: tempFilePaths[i],
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
              console.log(res);
              if (res.data) {
                var data = JSON.parse(res.data);
                imglists = imglists.concat(data.resultData.imageList);
                // var imglist = JSON.stringify(data.resultData.imageList);
                // that.data.imagelists = imglist;
                // console.log(that.data.imagelists);
                console.log("imglists");
                console.log(imglists);
                var imglist = JSON.stringify(imglists);
                that.setData({
                  imagelists: JSON.stringify(imglists)
                });
                // that.data.imagelists = imglist;
              }
            }
          })
        }
        // var imglistForRequ = [];
        // for(var i = 0; i < imglists.length-1; i++) {
        //   imglistForRequ = imglists[i].concat(imglists[i+1]);
        // }
        // console.log("imglists");
        // console.log(imglists);

      }
    })
  },
  //输入需求
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });

    console.log("inputValue");
    console.log(this.data.inputValue);
  },
  //输入标签
  bindKeyInputTag: function (e) {
    this.setData({
      inputValueTag: e.detail.value,
      blurValue: e.detail.value
    });
    //  this.data.blurValue = e.detail.value;
  },
  //失去焦点
  bindBlurInput: function (e) {
    console.log("失去焦点事件");
    console.log(e);
    var that = this;

    this.setData({
      blurValue: ''
    });

    if (this.data.inputValueTag) {
      this.data.inputValueTagList.push(this.data.inputValueTag);
    }
    this.setData({
      tagList: that.data.inputValueTagList
    });
    console.log(this.data.tagList);
  },
  //添加商品
  saveUserInfo: function () {
    if (this.data.inputValue === '') {
      app.showNoToast('请填写您的需求', 'loading', 2000);
      return;
    }
    if (this.data.tagList.length === 0) {
      this.setData({
        showTag: false
      });
    }
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
          tagList: that.data.tagList,
          address: that.data.locationAddress
        })
      },
      success: function (ress) {
        // that.globalData.userInfo = ress.data.resultData.user;
        console.log("添加商品");
        console.log(ress);
        if (ress.data) {
          if (ress.data.resultCode === 0) {
            var articleId = ress.data.resultData.article.articleId;
            console.log('articleId');
            console.log(articleId);
            app.publishMode('发布成功', articleId);
          } else {
            app.showDataToast('发送失败', 'loading', 3000);
          }
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
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
  },
  onShow: function () {
    this.setData({
      hasLocation: false,
      tagList: [],
      inputValue: '',
      imagelists: "",
      imageList: [],
      inputValueTag: '',
      inputValueTagList: [],
      blurValue: '',
      showTag: true,
      imgUrl: '',
      tempFilePaths: []
    });
  }
})

