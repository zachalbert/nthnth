import ScrollMagic from '../../../node_modules/scrollmagic/';

// init controller
var controller       = new ScrollMagic.Controller();
var trigger          = $('.fixed-scroll-offset');

if( trigger.length ) {
  var sidebarTrigger = trigger.offset().top - $('.nav--top').outerHeight();
}

if( sidebarTrigger ) {
  var fixSidebar = new ScrollMagic.Scene({
      offset: sidebarTrigger        // start this scene once sidebarTrigger has been reached
    })
    .setPin(".sidebar--fixed", {
      pushFollowers: false
    });     // pins the element for the the scene's duration

  // Add one or more scenes to the controller
  controller.addScene([
    fixSidebar
  ]);
}
