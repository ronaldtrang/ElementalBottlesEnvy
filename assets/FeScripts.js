function ShowCart() {
	$('#cartSlideoutWrapper').trigger('cart:open');
};

var cart = [{quantity:1, id:35301070606}]

function AddToCart(input) {
  CartJS.addItem(input.id, input.quantity, {}, {
    "success": function(data, textStatus, jqXHR) {
      if (data.id == cart[cart.length - 1].id) {
      	$.getJSON('/cart.js', function(data) {
            $('.cart-item-count').text(data.item_count);
            $('.cart-item-price').html(formatMoney(data.total_price));      
            ShowCart();
            cart = [{quantity:1, id:35301070606}]
            $('.add-on-cap').attr('data-add', 'false');
    		$('.add-on-cap').html('Add On');
        });
      }
    },
    
    "error": function(jqXHR, textStatus, errorThrown) {
    	console.log('oops');
    }
  });
}  

$("#addToCart").click(function() {
  for (var i = 0; i < cart.length; i++) {
  	AddToCart(cart[i]);
  }
});

$(document).on('click', '.add-on-cap', function(e) {
 var target = $(e.target);

  if (target.attr('data-add') === 'false') {
    var cartItem = {
      id: target.attr('data-id'),
      quantity: 1
    }

    cart.push(cartItem)
    target.attr('data-add', 'true');
    target.html('Remove');
  } else {
    for (var i = 0; i < cart.length; i++) {
      if(cart[i].id == target.attr('data-id')) {
      	cart.splice(i, 1);
      }
    }
    
   	target.attr('data-add', 'false');
    target.html('Add On');
  }
});

var capHandles = ['bamboo-cap', 'stainless-steel-cap'];
var sportCapHandles = ['bamboo-cap', 'stainless-steel-cap'];

function RenderCapCheckbox(input, type) {
  var viewObject = {
    id: input.id,
    name: input.name,
    price: '$' + input.price,
    image: input.image
  }
  
  var template = '<div class="row"><hr class="top" /><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 add-on-cell"><img src="{{image}}" /></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 add-on-cell"><b>{{name}}</b><br /><span>{{price}}</span></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 add-on-cell"><button class="btn btn-default add-on-cap pull-right" data-id="{{id}}" data-add="false">Add On</button></div><hr class="bottom" /></div>'
  var output = Mustache.render(template, viewObject);
  
  if (type === 'regular') {
    $('#capsContainer').append(output);
  } else {
    $('#sportCapsContainer').append(output);
  }
};

function FormatToDollar(number) {
  return (number/100).toFixed(2);
}


function GetProduct(productHandle, type) {
  $.getJSON('/products/' + productHandle + '.js', function(data) {
    var cap = data.variants[0];
    
    if (cap.inventory_quantity > 0) {
      var capData = {
        id: cap.id,
        name: cap.name,
        price: FormatToDollar(cap.price),
        image: data.featured_image
      };
	  
      RenderCapCheckbox(capData, type);
    }
  });
}

function LoadCaps() {
  for (var i = 0; i < capHandles.length; i++) {
  	GetProduct(capHandles[i], 'regular');
  }
  
  for (var i = 0; i < sportCapHandles.length; i++) {
  	GetProduct(sportCapHandles[i], 'sport');
  }
}

LoadCaps();

