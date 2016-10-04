$(function() {
  console.log('jQuery Loaded');
  $(".btn-down").click(function() {
    $(".portfolio").removeClass('hidden');
    $("body").css({overflow: 'hidden'});
    $("html, body").animate({
      scrollTop: $(".portfolio").offset().top,
    }, 500, "swing", function() {
      $(".intro").addClass('hidden');

      $(".portfolio-title").css({"margin-top": "3em", "opacity": ""}).animate({
        "margin-top": "2em",
        opacity: '1'
      }, 400, function() {
        $("body").css({overflow: "visible"});
      });

    });

  })
})
