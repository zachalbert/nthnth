import Masonry from '../../../node_modules/masonry-layout/masonry.js'

var grid = document.querySelector('.image-grid');
var masonry = new Masonry( grid, {
  // options...
  itemSelector: '.image-grid__image',
  columnWidth: '.image-grid__image-sizer',
  percentPosition: true
});
