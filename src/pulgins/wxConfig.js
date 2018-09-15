/**
 * Created by Administrator on 2017/6/2 0002.
 */
import config from '../assert/js/config'
import {post} from '../assert/js/ajax'
import {isIos} from '../utils/tools'
const {DOMAIN, ACCOUNT} = config
const WxVue = {}
const wx = window.wx
// 微信初始化 类
class WxConFig {
  constructor ({share}) {
    this.jsApiList = [
       'openAddress',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
    this.share = share
    this.api = `${DOMAIN}/wx/oauth/getjsapisignature.json`
    this.shareUrl = null
    // 初始化对象
    this.init()
    this.checkVersion()
  }
  // 初始化 方法
  init () {
    let pageUrl = isIos() ? window._location_href : window.location.href
    // 获取js-sdk 签名权限
    console.log(pageUrl)
    pageUrl = pageUrl.split("#")[0]
    post({
      url: `${this.api}`,
      data: {
	      url: pageUrl,
	      accout: ACCOUNT
      }
    }).then((data) => {
        // data.data 签名信息（页面所需全部签名字段）
	    this.shareUrl = data.url
        delete data.url
        this.wxSetUp({
          data
        })
    }).catch((err) => {
    })
  }
  // 微信配置
  wxSetUp ({ data }) {
    data.jsApiList = this.jsApiList
    data.debug = false
    // 微信 js-sdk 启动配置
    wx.config(data)
    // 微信 js-sdk api 准备
    wx.ready(() => {
      // 初始化分享
      if (this.share) {
        // 显示所有现实的按钮
	     //  wx.showAllNonBaseMenuItem()
	      this.shareMethod(this.share)
      }
    })
    wx.error((err) => {
    })
  }
  // 查看微信版本
  checkVersion () {
    let appVersion = window.navigator.appVersion
    let version = /MicroMessenger\/i[\d|.]*/.exec(appVersion)
    version = version ? version[0].replace('MicroMessenger/', '') : 0
    return parseInt(version)
  }
  // 分享 方法
  shareMethod ({title, link, imgUrl, dataUrl = '', desc, type = 'link', success}) {
    const url = this.shareUrl
      // 显示全部按钮
    wx.onMenuShareTimeline({
      title: title,
      link: link || url,
      imgUrl: imgUrl,
      success () {
        success()
      }
    })
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link || url,
      imgUrl: imgUrl,
      type: type,
      dataUrl: dataUrl,
      success () {
        success()
      }
    })
    // 分享到QQ
    wx.onMenuShareQQ({
      title: title,
      desc: desc,
      link: link || url,
      imgUrl: imgUrl,
      success () {
        success()
      }
    })
    // 分享到QQ
    wx.onMenuShareWeibo({
      title: title,
      desc: desc,
      link: link || url,
      imgUrl: imgUrl,
      success () {
        success()
      }
    })
    // 分享到QQ空间
    wx.onMenuShareQZone({
      title: title,
      desc: desc,
      link: link || url,
      imgUrl: imgUrl,
      success () {
        success()
      }
    })
  }
}
WxVue.install = function (Vue) {
  Vue.prototype.$wxConfig = function (obj) {
    return new WxConFig(obj)
  }
}
// export {WxConFig, shop}
export default WxVue
