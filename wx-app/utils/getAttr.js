/*获取当前页url*/
function getCurrentPageUrl () {
  let pages = getCurrentPages()    //获取加载的页面
  let currentPage = pages[pages.length - 1]    //获取当前页面的对象
  //当前页面url
  return currentPage.route
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs () {
  let pages = getCurrentPages()    //获取加载的页面
  let currentPage = pages[pages.length - 1]    //获取当前页面的对象
  let url = currentPage.route    //当前页面url
  let options = currentPage.options    //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  let urlWithArgs = url + '?'
  for (let key in options) {
    let value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

module.exports = {
  getCurrentPageUrl: getCurrentPageUrl,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs
}