$('.sidebar__close-trigger').click( function() {
  $(this).find('.icon').toggleClass('icon--chevron-left icon--chevron-right');
  $('.flexible-container').toggleClass('flexible-container--collapsed');
});
