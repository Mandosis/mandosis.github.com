var currentIndex = 1;
var lastIndex = 2;
var canScroll = true;

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
      currentIndex++;
    });

  });

  $("html, body").on('mousewheel', function(e) {
    console.log(currentIndex);

    var newIndex = null;
    var index = currentIndex;
    var up = (e.originalEvent.deltaY >= 0);

    if (canScroll) {
      if (up) {
        if (currentIndex < 2) {
          newIndex = currentIndex + 1;
          currentIndex++;
        }
      } else {
        if (currentIndex > 1) {
          newIndex = currentIndex - 1;
          currentIndex--;
        }
      }
    }

    if (newIndex) {
      var currentElement = $("section[data-index="+ index +"]");
      var nextElement = $("section[data-index=" + newIndex +"]");

      $("body").css({overflow: 'hidden'});

      nextElement.removeClass('hidden');
      if (!up) {
        $("html, body").animate({
          scrollTop: currentElement.offset().top,
        }, 0);
      }

      $("html, body").animate({
        scrollTop: nextElement.offset().top,
      }, {
        duration: 500,
        easing: 'swing',
        start: function() {
          canScroll = false;
        },
        complete: function() {
          canScroll = true;
          console.log('end function called')
          currentElement.addClass('hidden');

          var nextElementWithAnimation = $("section[data-index=" + newIndex +"] .animate")
          $("body").css({overflow: "visible"});


          nextElementWithAnimation.css({"margin-top": "3em", "opacity": ""}).animate({
            "margin-top": "2em",
            opacity: '1'
          }, 400);

          canScroll = true;

        }
      })
    }

  });


});
