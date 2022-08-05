; (function () {

    'use strict';

    var mobileMenuOutsideClick = function () {

        $(document).click(function (e) {
            var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {

                if ($('body').hasClass('offcanvas')) {

                    $('body').removeClass('offcanvas');
                    $('.js-fh5co-nav-toggle').removeClass('active');

                }
            }
        });

    };

    var offcanvasMenu = function () {

        $('#page').prepend('<div id="fh5co-offcanvas" />');
        $('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
        var clone1 = $('.menu-1 > ul').clone();
        $('#fh5co-offcanvas').append(clone1);
        var clone2 = $('.menu-2 > ul').clone();
        $('#fh5co-offcanvas').append(clone2);

        $('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
        $('#fh5co-offcanvas')
            .find('li')
            .removeClass('has-dropdown');

        // Hover dropdown menu on mobile
        $('.offcanvas-has-dropdown').mouseenter(function () {
            var $this = $(this);

            $this
                .addClass('active')
                .find('ul')
                .slideDown(500, 'easeOutExpo');
        }).mouseleave(function () {

            var $this = $(this);
            $this
                .removeClass('active')
                .find('ul')
                .slideUp(500, 'easeOutExpo');
        });


        $(window).resize(function () {

            if ($('body').hasClass('offcanvas')) {

                $('body').removeClass('offcanvas');
                $('.js-fh5co-nav-toggle').removeClass('active');

            }
        });
    };


    var burgerMenu = function () {

        $('body').on('click', '.js-fh5co-nav-toggle', function (event) {
            var $this = $(this);


            if ($('body').hasClass('overflow offcanvas')) {
                $('body').removeClass('overflow offcanvas');
            } else {
                $('body').addClass('overflow offcanvas');
            }
            $this.toggleClass('active');
            event.preventDefault();

        });
    };

   
    var dropdown = function () {

        $('.has-dropdown').mouseenter(function () {

            var $this = $(this);
            $this
                .find('.dropdown')
                .css('display', 'block')
                .addClass('animated-fast fadeInUpMenu');

        }).mouseleave(function () {
            var $this = $(this);

            $this
                .find('.dropdown')
                .css('display', 'none')
                .removeClass('animated-fast fadeInUpMenu');
        });

    };

    // Tabs function on hobbies page to filter the category
    var tabs = function () {

        // Auto adjust height
        // $('.fh5co-tab-content-wrap').css('height', 0);
        // var autoHeight = function () {

        //     setTimeout(function () {

        //         var tabContentWrap = $('.fh5co-tab-content-wrap'),
        //             tabHeight = $('.fh5co-tab-nav').outerHeight(),
        //             formActiveHeight = $('.tab-content.active').outerHeight(),
        //             totalHeight = parseInt(tabHeight + formActiveHeight + 90);

        //         tabContentWrap.css('height', totalHeight);

        //         $(window).resize(function () {
        //             var tabContentWrap = $('.fh5co-tab-content-wrap'),
        //                 tabHeight = $('.fh5co-tab-nav').outerHeight(),
        //                 formActiveHeight = $('.tab-content.active').outerHeight(),
        //                 totalHeight = parseInt(tabHeight + formActiveHeight + 90);

        //             tabContentWrap.css('height', totalHeight);
        //         });

        //     }, 100);

        // };

        autoHeight();


        // Click tab menu
        $('.fh5co-tab-nav a').on('click', function (event) {

            var $this = $(this),
                tab = $this.data('tab');

            $('.tab-content')
                .addClass('animated-fast fadeOutDown');

            $('.fh5co-tab-nav li').removeClass('active');

            $this
                .closest('li')
                .addClass('active')

            $this
                .closest('.fh5co-tabs')
                .find('.tab-content[data-tab-content="' + tab + '"]')
                .removeClass('animated-fast fadeOutDown')
                .addClass('animated-fast active fadeIn');


            autoHeight();
            event.preventDefault();

        });
    };


    function deferVideo() {

        //defer html5 video loading
      $("video source").each(function() {
        var sourceFile = $(this).attr("data-src");
        $(this).attr("src", sourceFile);
        var video = this.parentElement;
        video.load();
        // uncomment if video is not autoplay
        //video.play();
      });
    
    }
    window.onload = deferVideo;
    

    $(function () {
        mobileMenuOutsideClick();
        offcanvasMenu();
        burgerMenu();
        dropdown();
       // tabs();
        goToTop();
        deferVideo();
      
    });

}());