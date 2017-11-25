//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    testlist: [1, 2, 3, 4],
    articleList: [
      {
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
          ] ,
        addTime: '2017-12-03',
        potentialCustomer: 68,
        collects: '123',
        likes: 909
      },
      {
        content: '这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品这是一个很不错的产品',
        articleId: "345",
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
      }
    ],
    isBuy: true,
    isLoad: true,
    showKeyWord: true
  },

  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../addpage/addpage'
    })
  },

  onShow: function () {
    console.log('onLoad');

    var that = this
  },
  // onShow: function () {
  //   var that = this;
  //   that.setData({
  //     userInfo: app.globalData.userInfo
  //   })
  // }
})
