
//获取应用实例
var util = require('../../util/util.js')
let api = require('../../utils/api.js')
var formatLocation = util.formatLocation
var app = getApp()
let ERR_OK = 0
Page({
  data: {
    industryInfoId: '',
    industryArray: [
      // { industryId: '1', industryName: '服装' },
      // { industryId: '2', industryName: '餐饮' },
      // { industryId: '3', industryName: '汽修' }
      ],
    index: 0,
    isloading: true,
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
  bindPickerChange: function (e) {
    console.log('picker')
    console.log(e)
    console.log(typeof e.detail.value)
    let indexValue = parseInt(e.detail.value)
    this.setData({
      index: indexValue
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

  // 发布动态消息
  saveUserInfo: function () {
    if (this.data.inputValue === '') {
      app.showNoToast('请填写您的需求', 'loading', 2000);
      wx.showToast({
        title: '请填写您的需求',
        image: '../../icons/ware.png',
        duration: 2000,
      })
      return;
    }
    var that = this
    let indexValue = parseInt(that.data.index)
    // 获取相应的id
    let industryId = that.data.industryArray[indexValue].industryId
    api.getInfoAdd({
      token: app.globalData.token,
      showLocation: 0,
      content: that.data.inputValue,
      img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511595512641&di=167b61d8957f3624fa66076ebbd2dee4&imgtype=0&src=http%3A%2F%2Fimg6.lady8844.com%2Fforum%2Fmonth_1406%2F1406031425452891ffb384e131.jpg',
      industryId: industryId
    }, function (res) {
      if (res.code === ERR_OK) {
        console.log('发布成功')
        console.log(res)
        that.setData({
          industryInfoId: res.data.industryInfoId,
          inputValue: '',
          index: 0
        })
        that.successBack('发布成功')
      } else {
        that.erroeBack(res.message)
      }
    }, function (err) {
      console.log('发布失败')
      console.log(err)
     })
  },
  successBack: function (message) {
    let that = this
    wx.showToast({
      title: message,
      icon: 'success',
      duration: 2000,
      success: function () {
        setTimeout(function () {
          // app.showMode();
          that.toDetail(that.data.industryInfoId)
        }, 2000)
      }
    })
  },
  erroeBack: function (message) {
    let that = this
    wx.showToast({
      title: message,
      icon: 'success',
      duration: 2000,
    })
  },
  // 跳转到详情页
  toDetail: function (industryinfoid) {
    wx.navigateTo({
      url: '../../pages/buypage/buydetails/buydetails?industryinfoid=' + industryinfoid,
    })
  },
  // 获取行业分类id和名字
  getIndustryStr: function () {
    let that = this
    api.getIndustryStr({

    }, function (res) {
      console.log('获取行业id')
      if (res.code === ERR_OK) {
        that.setData({
          industryArray: res.data.recordList
        })
      }
      console.log(res)
    }, function (err) {
      console.log('行业id错误')
      console.log(err)
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
    console.log('onLoad-add')
    var that = this
    // that.data.isloading = app.globalData.isloading
    that.getIndustryStr()
    //调用应用实例的方法获取全局数据
  },
  onShow: function () {
    this.setData({
      hasLocation: false,
      inputValue: '',
      imagelists: "",
      imageList: [],
      blurValue: '',
      showTag: true,
      imgUrl: '',
      tempFilePaths: []
    });
  }
})

