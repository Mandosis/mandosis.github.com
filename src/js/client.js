var currentIndex = 1;
var lastIndex = 2;
var canScroll = true;
var portfolioVisible = false;
var navigationList = [
  'landing',
  'portfolio',
  'about',
  'contact'
];

$(function() {

  /**
   * Navigate to portfolio from landing page
   */
  $(".btn-down").click(function() {
    currentIndex = 1;
    $(".portfolio").removeClass('hidden');
    $("body").css({overflow: 'hidden'});

    scrollToSection(2, function() {
      currentIndex++;
      portfolioVisible = true;
    });
  });

  /**
   * Navigation via scrolling
   */
  $(".intro").on('mousewheel', function(event) {

    var newIndex = null;

    if (canScroll && !portfolioVisible) {

      if (scrollDirection() === 'down') {
        if (currentIndex < lastIndex) {
          console.log('down')
          scrollToSection(currentIndex + 1, function() {
            currentIndex++;
          })
        }
      }
    }

    function scrollDirection() {
      if (event.originalEvent.wheelDelta >= 0) {
        return 'up';
      } else {
        return 'down';
      }
    }


  });




  /**
   * Navigates to section on the page
   */
  function scrollToSection(index, callback) {
    var currentElement = $("section[data-index="+ currentIndex +"]");
    var nextElement = $("section[data-index=" + index +"]");
    var nextElementWithAnimation = $("section[data-index=" + index +"] .animate");

    var htmlOrBody = (navigator.userAgent.toLowerCase().indexOf('webkit') > 0 ? 'body' : 'html');


    // Hide scrollbar
    $("body").css({overflow: 'hidden'});

    nextElement.removeClass('hidden');

    // Set scroll position to top of current section
    $(htmlOrBody).animate({
      scrollTop: currentElement.offset().top,
    }, 0);

    // Animate scrolling to desired section
    $(htmlOrBody).animate({
      scrollTop: nextElement.offset().top,
    }, {
      duration: 500,
      easing: 'swing',
      start: function() {

        // Lock scrolling
        canScroll = false;

        // Set CSS for animation
        nextElementWithAnimation.css({"margin-top": "+=0.7rem", "opacity": "0"})
      },
      complete: function() {
        // Unlock scrolling
        canScroll = true;
        callback();


        // Hide previous section
        // currentElement.addClass('hidden');

        // Allow scrollbar
        $("body").css({overflow: "visible"});

        // Start animations
        nextElementWithAnimation.animate({
          "margin-top": "-=0.7rem",
          opacity: 1
        }, 400);
      }
    })

  }

  $(window).resize("resizeBackground");


  function resizeIntro() {
    var intro = $(".intro");
    var newHeight = $(window).height() + 60;

    intro.css({height: newHeight});
  }


});
