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
  $('.flexible-container').toggleClass('flexible-container--collapsed');
}
