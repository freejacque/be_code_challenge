var dropDownMenu = document.body.querySelectorAll(".dropdown-menu");

var cart = document.body.querySelector("ol#cart-sidebar");
// finds the cart
var itemsInCart = cart.querySelectorAll("li");

// finds the number of items in the cart
var totalPrice = 0;
var itemImages = [];
for (var i = 0, len = itemsInCart.length; i < len; i++) {
  numberOfItems = i + 1;
  var newPrice = parseFloat(itemsInCart[i].querySelector(".product-details").querySelector(".price").innerHTML.slice(1));
  totalPrice += newPrice;
  cartTotal = "$" + totalPrice;
  itemImages.push(itemsInCart[i].querySelector("a").querySelector("img").src);
};

// everything above this line works and is finished
window.onscroll = scroll

window.onscroll = function() {
  var d = document.documentElement;
  var offset = d.scrollTop + window.innerHeight;
  var height = d.offsetHeight;

  if (offset === height) {
    console.log('At the bottom');
  }
};

// tells the distance from the top of the window
var position = window.scrollY
var windowHeight = window.innerHeight



window.onscroll = function (){
  console.log("scrolling!");
  var windowHeight = window.innerHeight;
  var pixelsFromTop = document.body.scrollTop;
  var bodyHeight = document.body.offsetHeight;
  var distance = bodyHeight - windowHeight;
  console.log(pixelsFromTop);
  if (distance < pixelsFromTop) {
    console.log("this works!");
  }
}

