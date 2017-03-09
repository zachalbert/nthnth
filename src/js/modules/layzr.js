import Layzr from 'layzr.js'

const instance = Layzr({
  threshold: 100         // Load images that are 100% of the screen height away from the bottom of the viewport
})

document.addEventListener('DOMContentLoaded', function(event) {
  instance
    .update()           // track initial elements
    .check()            // check initial elements
    .handlers(true)     // bind scroll and resize handlers
});
