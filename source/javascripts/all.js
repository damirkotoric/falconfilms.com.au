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

var $heroShowreel
var videoId
var videoPlayer
$(document).ready(function() {
  // Listeners
  $("[data-trigger-modal]").on("click", modalTrigger)
  $(".modal__close").on("click", closeModal)
  $("#ss-form").on("submit", submitForm)
  $(".confirmation__confirmation-lolz").on("click", confirmationClose)
  $(".navigation > ul > li > a, .navigation__logo").on("click", scrollToElement)
  $(".navigation__trigger").on("click", triggerNavigation)
  $(".hero").on("click", ".hero__showreel-link.-enabled", playShowreel)
  $(".hero__showreel-clicker").on("dblclick", function () { screenfull.exit() })
  $(window).on("scroll", pageScrolling)

  // Do stuff on init
  FastClick.attach(document.body);

  if (screenfull.enabled) {
    document.addEventListener(screenfull.raw.fullscreenchange, fullscreenChanged);
    // create youtube player
    window.onYouTubePlayerAPIReady = function () {
      $(".hero__showreel-link").addClass("-enabled")
      videoPlayer = new YT.Player('hero__showreel', {
        height: '390',
        width: '640',
        videoId: $("#hero__showreel").attr("data-youtube-id"),
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        },
        playerVars: {
           wmode: "opaque",
           autoplay: 0,
           controls: 0,
           showInfo: 0,
           rel: 0
         }
      })
    }
    function onPlayerReady(event) {
    }
    // when video ends
    function onPlayerStateChange(event) {
      if(event.data === 0) {
        screenfull.exit()
      }
    }
  } else {
    $(".hero__showreel-link").addClass("-enabled")
  }
});

function modalTrigger(event) {
  event.preventDefault()
  $trigger = $(event.currentTarget)
  $packageSelectBox = $("#package")
  $(".modal").attr("data-return-to", $(window).scrollTop())
  $("html").toggleClass("-modal-visible")
  window.scrollTo(0, 0)
  switch ($trigger.attr("id")) {
    case "enquire-free":
      $packageSelectBox.prop("selectedIndex", 0)
      break
    case "enquire-professional":
      $packageSelectBox.prop("selectedIndex", 1)
      break
    case "enquire-bespoke":
      $packageSelectBox.prop("selectedIndex", 2)
      break
  }
}

function closeModal(event) {
  event.preventDefault()
  $("html").removeClass("-modal-visible")
  var returnTo = $(".modal").attr("data-return-to")
  console.log(returnTo)
  $('html, body').scrollTop(returnTo)
}

function submitForm(event) {
  event.preventDefault()
  $form = $(event.currentTarget)
  $form.find("button[type='submit']").attr("disabled", true).text("Sending...")
  $.ajax({
    type: 'POST',
    url: $(this).attr('action'),
    data: $(this).serialize(),
    dataType: 'json',
    error: function(json) {
      // Because of 'Access-Control-Allow-Origin' stupidity I have to bind
      // to the 'error' listener and hope that the request went through okay anyway.
      $("html").removeClass("-modal-visible").addClass("-contact-form-submitted")
      $("html").removeClass("-nav-expanded -nav-fixed")
      $form.find("button[type='submit']").attr("disabled", false).text("Sending Enquiry")
      window.scrollTo(0, 0)
      $(".page").off("touchmove")
    }
  })
}

function confirmationClose(event) {
  $("html").removeClass("-contact-form-submitted")
}

function scrollToElement(event) {
  event.preventDefault()
  var attr = $(event.currentTarget).attr("data-trigger-modal")
  if (typeof attr !== typeof undefined && attr !== false) {
    // Modal nav
  } else {
    // Standard nav
    scrollToId = $(event.currentTarget).attr("href")
    $("html,body").animate({scrollTop: $(scrollToId).offset().top}, 300)
    $("html").removeClass("-nav-expanded")
    $(".page").off("touchmove")
  }
}

function triggerNavigation(event) {
  event.preventDefault()
  $html = $("html")
  $html.toggleClass("-nav-expanded")
  if ($html.hasClass("-nav-expanded")) {
    $(".page").on("touchmove", function(event) {
      event.preventDefault()
    })
  } else {
    $(".page").off("touchmove")
  }
}

function pageScrolling(event) {
  $hero = $("#hero")
  $html = $("html")
  if($(window).scrollTop() > $hero.height() - 30 && !$html.hasClass("-nav-expanded")) {
    $html.addClass("-nav-fixed")
  } else {
    $html.removeClass("-nav-fixed")
  }
}

function playShowreel(event) {
  console.log(screenfull.enabled)
  if (screenfull.enabled) {
    event.preventDefault()
    screenfull.request()
    videoPlayer.playVideo()
    $("html").addClass("-showreel-fullscreen")
  }
}

function fullscreenChanged(event) {
  if (!screenfull.isFullscreen) {
    videoPlayer.stopVideo()
    $("html").removeClass("-showreel-fullscreen")
  }
}
