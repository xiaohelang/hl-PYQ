//index.js
//获取应用实例
const api = require('../../../utils/api.js')
var app = getApp()

Page({
  data: {
    motto: '',
    nickName: "",
    realname: "",
    avatarUrl: "",
    mobilePhone: "",
    email: "",
    company: "",
    job: "",
    address: "",
    resume: "",
    email: "",
    text: ''
  },
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log('系统获取信息')
        console.log(res)
        that.data.userInfo = res.userInfo
        that.setData({
          nickName: res.userInfo.nickName,
        })
        that.getUserInfo()
      }
    })
    // that.setData({
    //   userInfo: app.globalData.userInfo
    // })
  },
  // 1.获取用户信息
  getUserInfo: function () {
    var that = this
    console.log('token-my')
    console.log(app.globalData.token)
    api.getUserInfo({

      token: app.globalData.token

    }, function (res) {
      console.log('获取个人信息')
      console.log(res)
      if (res.code == 0) {
        console.log('获取个人信息')
        console.log(res)
        that.setData({
          nickName: res.data.nickname,
          avatarUrl: res.data.headImgUrl
        })
        if (res.data.realname !== undefined) {
          that.setData({
            realname: res.data.realname,
          })
        }else{
          that.setData({
            realname: "",
          })
        }
        if (res.data.mobilePhone !== undefined) {
          that.setData({
            mobilePhone: res.data.mobilePhone,
          })
        } else {
          that.setData({
            mobilePhone: "",
          })
        }
        if (res.data.email !== undefined) {
          that.setData({
            email: res.data.email,
          })
        }else{
          that.setData({
            email: "",
          })
        }
        if (res.data.company !== undefined) {
          that.setData({
            company: res.data.company,
          })
        } else {
          that.setData({
            company: "",
          })
        }
        if (res.data.job !== undefined) {
          that.setData({
            job: res.data.job,
          })
        }else{
          that.setData({
            job: "",
          })
        }
        if (res.data.province !== undefined) {
          that.setData({
            province: res.data.province,
          })
        } else {
          that.setData({
            province: "",
          })
        }
        if (res.data.city !== undefined) {
          that.setData({
            city: res.data.city,
          })
        } else {
          that.setData({
            city: "",
          })
        }
        if (res.data.detailAddress !== undefined) {
          that.setData({
            detailAddress: res.data.detailAddress,
          })
        } else {
          that.setData({
            detailAddress: "",
          })
        }
        if (res.data.shortIntro !== undefined) {
          that.setData({
            resume: res.data.shortIntro,
          })
        } else {
          that.setData({
            resume: "",
          })
        }

      }

    }, function (err) {

    })
  },
  // 编辑信息 -姓名 -邮箱 -公司 -职位
  toEidtInfo: function (e) {
    let info = 'info'
    let Type = 'dataType'
    let that = this
    console.log(e)
    let editData = e.currentTarget.dataset.info
    let datatype = e.currentTarget.dataset.datatype
    wx.navigateTo({
      url: '../../../pages/mypage/baseinfo/mailbox/mailbox?' + info + '=' + editData + '&&' + Type + '=' + datatype,
    })
  },
  // 编辑公司简介
  toEidtInfoSummay: function (e) {
    let info = 'info'
    let Type = 'dataType'
    let that = this
    console.log(e)
    let editData = e.currentTarget.dataset.info
    let datatype = e.currentTarget.dataset.datatype
    wx.navigateTo({
      url: '../../../pages/mypage/baseinfo/summay/summay?' + info + '=' + editData + '&&' + Type + '=' + datatype,
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  choosePhoto: function () {
    let that = this;
    // app.chooseImage(function (imgUrl) {
    //   that.setData({
    //     // 'userInfo.cover_thumb': imgUrl
    //   })
    // });
    // wx.chooseImage({
    //   count: 1, // 最多可以选择的图片张数，默认9
    //   sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
    //   success: function (res) {
    //     // success
    //     console.log("11");
    //     console.log(res);
    //     that.setData({
    //       'userInfo.avatarUrl': res.tempFilePaths[0]
    //     });
    //   },
    //   fail: function (res) {
    //     // fail
    //   },
    //   complete: function (res) {
    //     // complete
    //   }
    // })
  },

  onShow: function () {
    // console.log("app.globalData.userInfo-baseinfo");
    // console.log(app.globalData.userInfo);
    // var that = this;
    // that.setData({
    //   userInfo: app.globalData.userInfo
    // })
    // console.log("that.data.userInfo");
    // console.log(that.data.userInfo);
    this.getUserInfo()
  }
})
