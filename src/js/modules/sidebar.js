/**
 * If the initial state is on a larger screen, remove the collapsed class from div.flexible-container
**/
if( document.documentElement.clientWidth >= 992 ) {
  toggleSidebar();
}

$('.sidebar__closer__trigger').click( function() {
  toggleSidebar();
});

function toggleSidebar() {
  $('.sidebar__closer__trigger > .icon').toggleClass('icon--flipped');
  $('.flexible-container').toggleClass('flexible-container--collapsed flexible-container--expanded');
}

(function($) {
  var resizeTimer; // Set resizeTimer to empty so it resets on page load

  function resizeFunction() {
    if( (document.documentElement.clientWidth <= 768) && $(".flexible-container").hasClass("flexible-container--expanded") ) {
      toggleSidebar();
    }
  };

  // On resize, run the function and reset the timeout
  // 250 is the delay in milliseconds. Change as you see fit.
  $(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeFunction, 250);
  });

})(jQuery);
