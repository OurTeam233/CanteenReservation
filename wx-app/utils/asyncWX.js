/**
 * promise 形式  getSetting
 * 获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
/**
 * promise 形式  chooseAddress
 * 获取用户收货地址
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * promise 形式  openSetting
 * 调起客户端小程序设置界面
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 *  promise 形式  showModal
 *  显示模态对话框
 * @param {object} param0 参数
 */
export const showModal = ({ content }) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 *  promise 形式  showToast
 *  显示消息提示框
 * @param {object} param0 参数
 */
export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * promise 形式  login
 * 调用接口获取登录凭证
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * promise 形式的 小程序的微信支付
 * @param {object} pay 支付所必要的参数
 */
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })

  })
}

