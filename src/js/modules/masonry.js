import Masonry from '../../../node_modules/masonry-layout/masonry.js'

var grid = document.querySelector('.image-grid');
var masonry = new Masonry( grid, {
  // options...
  itemSelector: '.image-grid__image',
  columnWidth: '200',
  percentPosition: true
});

console.log('asdf');
