//= require_tree .

// http://davidlesches.com/blog/making-browsers-play-nice-with-thin-fonts
jQuery(function($) {
  return $(document).ready(function() {
    var is_chrome, is_explorer, is_firefox, is_mac, is_opera, is_safari, is_windows;
    is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    is_safari = navigator.userAgent.indexOf("Safari") > -1;
    is_opera = navigator.userAgent.indexOf("Presto") > -1;
    is_mac = navigator.userAgent.indexOf('Mac OS') !== -1;
    is_windows = !is_mac;
    if (is_chrome && is_safari) {
      is_safari = false;
    }
    if (is_safari || is_windows) {
      return $('body').css({
        '-webkit-text-stroke': '.75px'
      });
    }
  });
});
