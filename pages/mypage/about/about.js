//index.js 
//获取应用实例 
var app = getApp()
Page({
  data: {
    latitude: 0,//纬度 
    longitude: 0,//经度 
    speed: 0,//速度 
    accuracy: 16,//位置精准度 
    markers: [],
    covers: [],
  },
  onLoad: function () {
  },
  // getlocationcur: function () {
  //   var that = this;
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: function (res) {
  //       console.log("当前位置数据");
  //       console.log(res);

  //       var markers = [{
  //         latitude: res.latitude,
  //         longitude: res.longitude,
  //         name: '天河区',
  //         desc: '我的位置'
  //       }]
  //       var covers = [{
  //         latitude: res.latitude,
  //         longitude: res.longitude,
  //         //  iconPath: '../images/car.png', 
  //         rotate: 0
  //       }]
  //       that.setData({
  //         longitude: res.latitude,
  //         latitude: res.longitude,
  //         markers: markers,
  //         covers: covers,
  //       });

  //     }
  //   });
  // },
  // getlocation: function () {
  //   var markers = [{
  //     latitude: 23.129163,
  //     longitude: 113.264435,
  //     name: '天河区',
  //     desc: '我的位置'
  //   }]
  //   var covers = [{
  //     latitude: 23.129163,
  //     longitude: 113.264435,
  //     //  iconPath: '../images/car.png', 
  //     rotate: 0
  //   }]
  //   this.setData({
  //     longitude: 113.264435,
  //     latitude: 23.129163,
  //     markers: markers,
  //     covers: covers,
  //   })
  // },
  open: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log("open");
        console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  }
})