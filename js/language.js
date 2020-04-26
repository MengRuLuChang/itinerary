/*
 * @Author: ding yipeng 
 * @Date: 2020-04-26 10:34:13 
 * @Last Modified by: ding yipeng
 * @Last Modified time: 2020-04-26 13:17:52
 */
/**
 * cookie操作
 */
var getCookie = function (name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var s = [cookie, expires, path, domain, secure].join('');
    var secure = options.secure ? '; secure' : '';
    var c = [name, '=', encodeURIComponent(value)].join('');
    var cookie = [c, expires, path, domain, secure].join('')
    document.cookie = cookie;
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

/**
 * 获取浏览器语言类型
 * @return {string} 浏览器国家语言
 */
var getNavLanguage = function () {
  if (navigator.appName == "Netscape") {
    var navLanguage = navigator.language;
    return navLanguage.substr(0, 2);
  }
  return false;
}

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "cn";

/*
设置一下网站支持的语言种类
*/
var webLanguage = ['cn', 'en'];

/**
 * 执行页面i18n方法
 * @return
 */
var execI18n = function () {
  /*
  首先获取用户浏览器设备之前选择过的语言类型
   */

  if (getCookie("userLanguage")) {
    i18nLanguage = getCookie("userLanguage");
  } else {
    // 获取浏览器语言
    var navLanguage = getNavLanguage();

    if (navLanguage) {
      // 判断是否在网站支持语言数组里
      var charSize = $.inArray(navLanguage, webLanguage);
      debugger

      if (charSize > -1) {
        i18nLanguage = navLanguage;
        // 存到缓存中
        getCookie("userLanguage", navLanguage);
      };
    } else {
      console.log("not navigator");
      return false;
    }
  }
  /*
  这里需要进行i18n的翻译
   */
  $("[i18n]").i18n({
    defaultLang: i18nLanguage,
    filePath: "./i18n/",
    filePrefix: "i18n_",
    fileSuffix: "",
    forever: true,
    callback: function (res) {}
  });
}

/*页面执行加载执行*/
$(function () {

  /*执行I18n翻译*/
  execI18n();

  /* 选择语言 */
  $('.lang_zh_btn').click(function (param) {
    let language = 'cn'
    getCookie("userLanguage", language, {
      expires: 30,
      path: '/'
    });
    location.reload();
  })
  $('.lang_en_btn').click(function (param) {
    let language = 'en'
    getCookie("userLanguage", language, {
      expires: 30,
      path: '/'
    });
    location.reload();
  })
});