/*
 * @Author: https://github.com/lzy2014love
 * @Date: 2018-01-18 15:20:57
 * @Last Modified by: https://github.com/lzy2014love
 * @Last Modified time: 2018-02-01 10:12:04
 */
'use strict';
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory(require('jquery'));
  } else {
    // 浏览器全局变量(global 即 window)
    global.returnExports = factory(global.jQuery);
  }
}(typeof window !== 'undefined' ? window : this, function ($) {
  // 实现代码
  // juqery插件不用返回

  /**
  * 函数节流方法
  * @param {Function} fn 延时调用函数
  * @param {Number} delay 延迟多长时间
  * @param {Number} atleast 至少多长时间触发一次
  * @returns {Function} 延迟执行的新函数
  */
  var debounce = function (fn, delay, atleast) {
    var timer = null;
    var previous = null;
    return function () {
      var now = +new Date();
      if (!previous) {previous = now;}
      if (now - previous > atleast) {
        fn();
        // 重置上一次开始时间为本次结束时间
        previous = now;
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn();
        }, delay);
      }
    };
  };

  /**
   * @description 调用方式 $.scrollToTop(config);
   * @param {Object} options {
   * scrollTop: Number scrollTop到多大触发滚动,默认100
   * targetscrollTop: Number 滚动到哪里，默认顶部 0
   * bottom: String position定位中bottom的值,默认'160px'
   * right: String position定位中right的值,默认'2%'
   * }
   * @returns {undefined}
   */
  $.scrollToTop = function (options) {
    $.scrollToTop.defaultOptions = {
      scrollTop: 100,
      targetscrollTop: 0,
      bottom: '160px',
      right: '2%'
    };
    $.extend(options, $.scrollToTop.defaultOptions);
    var tpl = '<div id="jquery-pulgin-scrollToTop" style="position:fixed;bottom:' + options.bottom + ';right:' + options.right + ';z-index:999;display:none"><a href="javascript:void(0)" style="display:block;width:38px;height:38px;background-color:#ddd;border-radius:3px;border:0;cursor:pointer;position:relative"><div style="position:absolute;right:0;left:0;margin:auto;width:0;height:0;top:-1px;border:9px solid transparent;border-bottom-color:#aaa;;"></div><div style="position:absolute;right:0;left:0;margin:auto;border-bottom-color:#aaa;width:8px;height:14px;top:15px;border-radius:1px;background-color:#aaa;;"></div></a></div>';
    $('body').append(tpl);
    var $window = $(window);
    var $selector = $('#jquery-pulgin-scrollToTop');
    var scrollHandler = debounce(function () {
      var scrollTop = $window.scrollTop();
      if (scrollTop > options.scrollTop) {
        $selector.slideDown();
      } else {
        $selector.slideUp();
      }
    }, 100, 150);
    $window.on('scroll', scrollHandler);
    $selector.on('click', function (e) {
      $('html,body').animate({ scrollTop: options.targetscrollTop });
    });
    $selector.find('a').hover(function (e) {
      $(this).css({ backgroundColor: '#e2e2e2' });
    }, function (e) {
      $(this).css({ backgroundColor: '#ddd' });
    });
  };

  // 暴露公共方法
  // return scrollToTop;
}));
