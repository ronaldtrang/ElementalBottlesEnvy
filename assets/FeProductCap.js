
var data = {
  id: 35301070606,
  quantity: 2
}

jQuery.getJSON('/cart.js', function(product) {
  console.log(product);
});

jQuery.getJSON('/products/copy-of-elemental-stainless-steel-water-bottle-25oz-matte-black.js', function(product) {
  console.log(product);
});

jQuery.post('/cart/add.js', data);

jQuery.getJSON('/cart.js', function(cart) {
  $('.cart-item-count').html(cart.item_count);
});


