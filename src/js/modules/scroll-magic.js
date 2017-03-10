import ScrollMagic from '../../../node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js';

// init controller
var controller = new ScrollMagic.Controller();
var sidebarTrigger = $('.content-start').offset().top - $('.nav--top').outerHeight();

if( sidebarTrigger ) {
  var fixSidebar = new ScrollMagic.Scene({
      offset: sidebarTrigger        // start this scene once sidebarTrigger has been reached
    })
    .setPin(".sidebar--fixed");     // pins the element for the the scene's duration

  // Add one or more scenes to the controller
  controller.addScene([
    fixSidebar
  ]);
}
