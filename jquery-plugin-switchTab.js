/*
 * @Author: https://github.com/lzy2014love 
 * @Date: 2018-01-23 10:06:47 
 * @Last Modified by: https://github.com/lzy2014love
 * @Last Modified time: 2018-02-01 10:12:15
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
  $.fn.switchTab = function (options) {
    // 默认参数设置
    var defaultOptions = $.fn.switchTab.defaultOptions = {
      beforeCss: 'switchTab-beforeCss', // 激活前样式名
      afterCss: 'switchTab-afterCss', // 激活后样式名
      model: 'click' // 切换方式("mouseover"或者"click")
    };
    $.extend(options, defaultOptions);
    // 获取tabs标签集合， this必须为tabs和对应内容的父节点
    var thisSelector = this.selector;
    // 事件代理，跟新DOM无需重新绑定事件
    $(document).on(options.model, thisSelector + ' ' + '[data-tabs]', function (event) {
      var target = event.target || event.srcElement;
      while (target !== document.body) {
        var $target = $(target);
        var tabsId = $target.attr('data-tabs');
        if (tabsId) {
          // 本身已激活不做处理
          if ($target.hasClass(options.afterCss)) {
            return;
          }
          // 样式控制
          $target.addClass(options.afterCss)
            .siblings('[data-tabs]')
            .removeClass(options.afterCss)
            .addClass(options.beforeCss);
          // 隐藏与显示控制
          $target.closest(thisSelector)
            .find('[data-tabContents=' + '\"' + tabsId + '\"]')
            .addClass(options.afterCss)
            .siblings('[data-tabContents]')
            .removeClass(options.afterCss);
          break;
        }
        // target变为其父节点
        target = target.parentNode;
      }
    });
    // 遵循链式原则
    return this;
  };

  // 暴露公共方法
  // return myFunc;
}));
