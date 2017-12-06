// pages/buyrecord/buyrecord.js
const api = require('../../utils/api.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '中山市', '沙溪镇', '正佳广场'],
    array: ['服饰', '美食', '娱乐'],
    index: 0
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  itPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //选择营业执照图片
  chooseBusinessImage: function () {
    console.log("选择图片")
    var that = this
    // if (that.data.tempFilePaths.length > 8) {
    //   return;
    // }
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
  //选择店面图片
  chooseShopImage: function () {
    console.log("选择图片")
    var that = this
    // if (that.data.tempFilePaths.length > 8) {
    //   return;
    // }
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
  //选择LOGO图片
  chooseLogoImage: function () {
    console.log("选择图片")
    var that = this
    // if (that.data.tempFilePaths.length > 8) {
    //   return;
    // }
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
  // 24.获取商圈联动
  getDistrictAll: function () {
    api.getDistrictAll({}, function (res) {
      console.log('商圈联动-res')
      console.log(res)
    }, function (err) {
      console.log('商圈联动-err')
      console.log(err)
    })
  },
  // 25. 开通商户申请
  getLogAdd: function () {
    api.getLogAdd({
      token: app.globalData.token,
      circleId: "7925696f-3eaf-49b8-b83f-5f3986738a94",
      shopName: '大树旗舰店',
      detailAddress: 'c119--09号',
      shopCert: 'http://img5.imgtn.bdimg.com/it/u=807605679,2027849210&fm=27&gp=0.jpg',
      shopImg: 'http://img5.imgtn.bdimg.com/it/u=807605679,2027849210&fm=27&gp=0.jpg，http://img5.imgtn.bdimg.com/it/u=807605679,2027849210&fm=27&gp=0.jpg',
      shopLogo: 'http://img5.imgtn.bdimg.com/it/u=807605679,2027849210&fm=27&gp=0.jpg',
      shortIntro: '大树旗舰店店铺简介大树旗舰店店铺简介大树旗舰店店铺简介大树旗舰店店铺简介大树旗舰店店铺简介大树旗舰店店铺简介'
    }, function (res) {
      console.log('开通商户申请-res')
      console.log(res)
    }, function (err) {
      console.log('开通商户申请-err')
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.getDistrictAll()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})