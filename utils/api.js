const baseUrl = 'https://wx-api.hcl668.com'
// 1.登录
const loginUrl = baseUrl + '/api/user/login'
// 2.获取用户信息
const userInfoUrl = baseUrl + '/api/user/personal'
// 3. 获取行业分类
const industryStr = baseUrl + '/api/industry/all'
// 4. 修改个人信息
const preInfostr = baseUrl + '/api/user/update'
// 5. 获取用户信息
const infoStr = baseUrl + '/api/user/info'
// 6. 资讯发布
const infoAdd = baseUrl + '/api/user/industry/info/add'
// 7. 资讯详情
const infoPageDetail = baseUrl + '/api/industry/info/info'
// 15. 资讯列表
const infoPage = baseUrl + '/api/industry/info/page'
// 17. 看过的记录
const ivisitPage = baseUrl + '/api/user/industry/info/visit/page'
// 获取发布者的相关信息
const bulishStr = baseUrl + '/api/user/info'
  
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

// 3. 获取行业分类
function getIndustryStr(data, success, error) {
  request(industryStr, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 4. 修改个人信息
function getPreInfoStr(data, success, error) {
  request(preInfostr, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 5. 获取用户信息
function getInfo(data, success, error) {
  request(infoStr, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 6. 资讯发布
function getInfoAdd(data, success, error) {
  request(infoAdd, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 7. 资讯详情
function getInfoPageDetail(data, success, error) {
  request(infoPageDetail, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 15. 资讯列表
function getInfoPage(data, success, error) {
  request(infoPage, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 17. 看过的记录
function getIvisitPage(data, success, error) {
  request(ivisitPage, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 获取发布者的相关信息bulishStr
function getBulishStr(data, success, error) {
  request(bulishStr, data,
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
      success && success(res.data)
    },
    error: function (err) {
      error && error(err)
    }
  })
}

module.exports = {
  getLogin,
  getUserInfo,
  getIndustryStr,
  getPreInfoStr,
  getInfo,
  getInfoAdd,
  getInfoPageDetail,
  getInfoPage,
  getIvisitPage,
  getBulishStr
}