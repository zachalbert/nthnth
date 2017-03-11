/**
 * Prevent default for any link without a proper href
**/
$('a[href="#"]').click( function(e) {
  e.preventDefault();
})
