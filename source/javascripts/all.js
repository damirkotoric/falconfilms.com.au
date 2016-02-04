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

$(document).ready(function() {
  // Listeners
  $("[data-trigger-modal]").on("click", modalTrigger)
  $(".modal__close").on("click", closeModal)
  $("#ss-form").on("submit", submitForm)
  $(".confirmation__confirmation-lolz").on("click", confirmationClose)
});

function modalTrigger(event) {
  event.preventDefault()
  $trigger = $(event.currentTarget)
  $packageSelectBox = $("#package")
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
  $("#email").focus()
}

function closeModal(event) {
  event.preventDefault()
  $("html").removeClass("-modal-visible")
  $('html, body').scrollTop($("#pricing").offset().top);
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
      $form.find("button[type='submit']").attr("disabled", false).text("Sending Enquiry")
      window.scrollTo(0, 0)
    }
  })
}

function confirmationClose(event) {
  $("html").removeClass("-contact-form-submitted")
}
