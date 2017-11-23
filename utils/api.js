const baseUrl = 'http://wxapp.wxsapp.com'
// 1.登录
const loginUrl = baseUrl + '/api/wechat/user/login'
// 1.获取店铺信息
const shopInfoUrl = baseUrl + '/vshop/info.do'
// 2.获取产品
const productUrl = baseUrl + '/vshop/product/page.do'

// 1.登录
function getLogin(data, success, error) {
  request(loginUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 1.获取店铺信息
function getShopInfo(data, success, error) {
  request(shopInfoUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}


// 封装请求
function request(strUrl, data, success, error) {
  wx.request({
    url: strUrl,
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      success && success(res)
    },
    error: function (err) {
      error && error(err)
    }
  })
}

module.exports = {
  getLogin,
  getShopInfo
}