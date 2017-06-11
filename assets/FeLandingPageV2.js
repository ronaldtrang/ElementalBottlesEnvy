var DisplayCartCount = function() {
  $.getJSON('/cart.js', function(data) {
    if (data.item_count > 0) {
        $('.cart-count').html(data.item_count);
    }
  });
}

$(document).on('click', '.order-button', function(e) {
	var target = $(e.target);
  	var id = target.attr('data-id');
  	var quantity = 1;

  	CartJS.addItem(id, quantity, {}, {
    "success": function(data, textStatus, jqXHR) {
      	DisplayCartCount();
    },
    "error": function(data) {
      	$("#messageBody").html(data.responseJSON.description);
      	$("#messageModal").modal('show');
      	$('.modal-backdrop.in').css('z-index', '-1');
    }
  });
});

var RenderBottles = function(input) {
  var viewObject = {
    id: input.variants[0].id,
    title: input.title,
    image: input.images[0].src,
    price: '$' + input.variants[0].price,
    handle: input.handle
  }
  
  var template = '<div class="col-lg-4 col-md-4 col-sm-6 p-b-15"><img src="{{image}}" class="full-width" /><div class="p-t-15 bottle-title">{{title}}</div><div class="p-t-10 p-b-15">{{price}}</div><div><button id="btn-{{handle}}" class="btn btn-primary full-width order-button" data-id="{{id}}">Add to Cart</button></div></div>';
  var output = Mustache.render(template, viewObject);
  
  $('#bottle-container').append(output);
}

var PushBottles = function(input) {
  for (var i = 0; i < bottleIds.length; i++) {
  	for (var j = 0; j < input.length; j++) {
      if (bottleIds[i] === input[j].id) {
      	bottles.push(input[j]);
      }
    }
  }
}


var GetProducts = function() {
  jQuery.getJSON('/products.json', function(data) {
    PushBottles(data.products);
    
    for (var i = 0; i < bottles.length; i++) {
      RenderBottles(bottles[i]);
    }
  });
}

var DisplayHeroImage = function() {
	if (window.innerWidth < 768 ) {
       $("#mobileHero").show();
       $("#desktopHero").hide();                        
    } else {
       $("#mobileHero").hide();
       $("#desktopHero").show();   
    }
}

$(window).resize(function() {
	DisplayHeroImage(); 
});                               

DisplayHeroImage();  
GetProducts();
DisplayCartCount();

var bottleIds = [10926459214, 10926504014, 10926480398, 10926483406, 10926489166, 10926485774]
var bottles = []