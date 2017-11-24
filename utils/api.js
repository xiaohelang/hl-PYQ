const baseUrl = 'https://wx-api.hcl668.com'
// 1.登录
const loginUrl = baseUrl + '/api/wechat/user/login'
// 1.获取用户信息
const userInfoUrl = baseUrl + '/api/wechat/user/personal'
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

// 2.获取用户信息
function getUserInfo(data, success, error) {
  request(userInfoUrl, data,
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
  getUserInfo
}