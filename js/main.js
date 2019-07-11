/**
* Smooth Scrolling Navigation
*/
jQuery(document).ready(function($) {
  // Scroll to the desired section on click
  // Make sure to add the `data-scroll` attribute to your `<a>` tag.
  // Example: 
  // `<a data-scroll href="#my-section">My Section</a>` will scroll to an element with the id of 'my-section'.
  function scrollToSection(event) {
    event.preventDefault();
    var $section = $($(this).attr('href')); 
    $('html, body').animate({
      scrollTop: $section.offset().top
    }, 500);
  }
  $('[data-scroll]').on('click', scrollToSection);
}(jQuery));

/**
* Toggle Navigation
*/
jQuery(document).ready(function($) {
  // Scroll to the desired section on click
  // Make sure to add the `data-scroll` attribute to your `<a>` tag.
  // Example: 
  // `<a data-scroll href="#my-section">My Section</a>` will scroll to an element with the id of 'my-section'.
  function toggle(event) {
    event.preventDefault();
    var $section = $($(this).attr('data-target')); 
    $($section).toggleClass('show');
    $(this).toggleClass('on');
  }
  $('[data-toggle]').on('click', toggle);
}(jQuery));

/**
* Scroll to Top
*/
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('.back-to-top').addClass('back-to-top--is-visible')
    } else {
        $('.back-to-top').removeClass('back-to-top--is-visible');
    }
});
$('.back-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});

/**
* Parallax Scrolling
*/
jQuery(document).ready(function($) {
  if(jQuery().paroller) {
     $('[data-parallax]').paroller();
  }
});