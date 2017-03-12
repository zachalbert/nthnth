/**
 * Main top navigation. Covers hamburger menu.
**/

$('.nav__menu-toggle').click(function() {
  toggleMenu();
});

$('.nav__overlay').click(function() {
  toggleMenu();
});

$(document).keyup(function(e) {
  if (e.keyCode === 27) toggleMenu();   // esc
});

function toggleMenu() {
  $('.nav--top').toggleClass('is-visible');
}
