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
// 8. 资讯点赞
const praiseAdd = baseUrl + '/api/user/industry/info/praise/log/add'
// 9. 资讯点赞取消
const praiseCancel = baseUrl + '/api/user/industry/info/praise/log/cancel'
// 10. 资讯评论列表
const commentPage = baseUrl + '/api/industry/info/comment/page'
// 11. 资讯评论
const commentAdd = baseUrl + '/api/user/industry/info/comment/add'
// 12. 添加资讯收藏
const attentionAdd = baseUrl + '/api/user/industry/info/attention/add'
// 13. 添加资讯收藏取消
const attentionCancel = baseUrl + '/api/user/industry/info/attention/cancel'
// 14. 资讯收藏列表
const attentionPage = baseUrl + '/api/user/industry/info/attention/page'
// 15. 资讯列表
const infoPage = baseUrl + '/api/industry/info/page'
// 16. 获取我发布过的资讯（用户本人发布记录）
const personPage = baseUrl + '/api/user/industry/info/personal/page'
// 17. 看过的记录
const ivisitPage = baseUrl + '/api/user/industry/info/visit/page'
// 获取发布者的相关信息
const bulishStr = baseUrl + '/api/user/info'
// 18.所有商圈
const circleAll = baseUrl + '/api/circle/all'
// 18.2 商圈详情/api/circle/info
const circleInfo = baseUrl + '/api/circle/info'
// 19. 商圈开通申请
const circleLogAdd = baseUrl + '/api/user/circle/log/add'
// 20. 获取图形验证码
const validateCode = baseUrl + '/api/user/validate/code'
// 21. 图形验证码，验证
const validateVerify = baseUrl + '/api/user/validate/verify'
// 22. 获取短信验证码
const smsVcode = baseUrl + '/api/user/sms/vcode'
// 23. 绑定手机号
const mobileBind = baseUrl + '/api/user/mobile/bind'
// 24. 省市区商圈联动
const districtAll = baseUrl + '/api/circle/district/all'
// 25. 开通商户申请
const logAdd = baseUrl + '/api/user/shop/authorize/log/add'

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

//  8. 资讯点赞
function getPraiseAdd(data, success, error) {
  request(praiseAdd, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

//  9. 资讯点赞取消
function getPraiseCancel(data, success, error) {
  request(praiseCancel, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

//  10. 资讯评论列表
function getCommentPage(data, success, error) {
  request(commentPage, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

//  11. 资讯评论
function getCommentAdd(data, success, error) {
  request(commentAdd, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

//  12. 添加资讯收藏
function getAttentionAdd(data, success, error) {
  request(attentionAdd, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 13. 添加资讯收藏取消
function getAttentionCancel(data, success, error) {
  request(attentionCancel, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 14. 资讯收藏列表
function getAttentionPage(data, success, error) {
  request(attentionPage, data,
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
// 16. 获取我发布过的资讯（用户本人发布记录）
function getPersonPage(data, success, error) {
  request(personPage, data,
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
// 18. 所有商圈
function getCircleAll(data, success, error) {
  request(circleAll, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 18.2商圈详情circleInfo
function getCircleInfo(data, success, error) {
  request(circleInfo, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 19. 商圈开通申请
function getCircleLogAdd(data, success, error) {
  request(circleLogAdd, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 20. 获取图形验证码
function getValidateCode(data, success, error) {
  request(validateCode, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 21. 图形验证码，验证
function getValidateVerify(data, success, error) {
  request(validateVerify, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 22. 获取短信验证码
function getSmsVcode(data, success, error) {
  request(smsVcode, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 23. 绑定手机号
function getMobileBind(data, success, error) {
  request(mobileBind, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 24. 省市区商圈联动
function getDistrictAll(data, success, error) {
  request(districtAll, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}
// 25. 开通商户申请
function getLogAdd(data, success, error) {
  request(logAdd, data,
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
  getPersonPage,
  getPraiseAdd,
  getPraiseCancel,
  getCommentPage,
  getCommentAdd,
  getAttentionAdd,
  getAttentionCancel,
  getAttentionPage,
  getIvisitPage,
  getBulishStr,
  getCircleAll,
  getCircleInfo,
  getCircleLogAdd,
  getValidateCode,
  getValidateVerify,
  getSmsVcode,
  getMobileBind,
  getDistrictAll,
  getLogAdd
}