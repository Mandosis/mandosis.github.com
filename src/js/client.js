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

var introHeight = $('.intro').innerHeight();

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
   * Swipe event for intro
   */
  var stage = $(".intro")[0];
  var mc = new Hammer.Manager(stage);
  var Swipe = new Hammer.Swipe();

  mc.add(Swipe);

  mc.on('swipeup', function() {
    currentIndex = 1;
    if (!portfolioVisible) {
      scrollToSection(2, function() {
        currentIndex++;
        portfolioVisible = true;
      });

      mc.remove(Swipe);
    }
  })

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
    var animateQueue = $(".animate-queue");

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
        nextElementWithAnimation.removeClass("fade-in-and-up");
        animateQueue.removeClass("fade-in-and-up");
      },
      complete: function() {
        // Unlock scrolling
        canScroll = true;
        callback();

        // Allow scrollbar
        $("body").css({overflow: "visible"});

        // Start animations
        nextElementWithAnimation.addClass("fade-in-and-up");
        console.log('animateQueueElements', animateQueue);

        var queueLength = animateQueue.length;
        var queueIndex = 0;

        var queue = window.setInterval(function() {

          if (queueIndex >= queueLength) {
            clearInterval(queue);
          }
          var elements = $('.animate-queue');
          elements.eq(queueIndex).addClass("fade-in-and-up");
          queueIndex++;
        }, 100);

        // animateQueue.queue(function(next) {
        //   console.log('queue hit')
        //   window.setTimeout(function() {
        //     animateQueue.eq(queueIndex).addClass('fade-in-and-up');
        //     queueIndex++;
        //     console.log('queue timeout hit')
        //     // $(this).addClass("fade-in-and-up");
        //
        //     window.setTimeout(function() {
        //       next();
        //     }, 500);
        //   }, 500);
        // })


        // for (var i = 0; i < animateQueue.length; i++) {
        //   console.log('asdfasdf')
        //   setTimeout(function() {
        //     animateQueue.eq(i).addClass('fade-in-and-up');
        //     console.log('running' + i);
        //   }, 500);
        // }
      }
    })

  }

  // $(window).on('orientationchange', function() {
  //   resizeIntro();
  // });

  function resizeIntro() {
    var userAgent = navigator.userAgent.toLowerCase();
    if ((/chrome\/[.0-9]* mobile/g).test(userAgent)) {
      $(".intro").innerHeight(introHeight);
      console.log('resizeIntro() called.')
    }

  }

  resizeIntro();

});
