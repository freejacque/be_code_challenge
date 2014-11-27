var dropDownMenu = document.body.querySelectorAll(".dropdown-menu");

var cart = document.body.querySelector("ol#cart-sidebar") || document.body.querySelector("div.dropdown is-empty");
// finds the cart
var itemsInCart = cart.querySelectorAll("li");


// finds the number of items in the cart
var totalPrice = 0;
var itemImages = [];
var numberOfItems = 0
for (var i = 0, len = itemsInCart.length; i < len; i++) {
  var itemPrice = parseFloat(itemsInCart[i].querySelector(".product-details").querySelector(".price").innerHTML.slice(1));
  var itemTotalNumber = parseFloat(itemsInCart[i].querySelector("strong").innerHTML);
  var newPrice = itemPrice * itemTotalNumber;
  numberOfItems += itemTotalNumber;
  totalPrice += newPrice;
  cartTotal = "$" + totalPrice;
  itemImages.push(itemsInCart[i].querySelector("a").querySelector("img").src);
};

// created the body variable
var body = document.body;


function createOverlay(){
  // creating an overlay to be triggered with scroll event
  var overLay = document.createElement("div").addClassName("overlay");
  overLay.addClass("fancybox-skin");
  var innerOverlay = document.createElement("div").addClassName("inner-overlay");
  // takes the variables from the cart and formats the info.
  var contentItems = "There are " + numberOfItems        + " items in your cart.";
  var contentCost  = "The total cost of these items is " + cartTotal + ".";
  contentItems.appendTo(innerOverlay);
  contentCost.appendTo(innerOverlay);
  showItemPics();
  innerOverlay.appendTo(overlay);
  overlay.appendTo(body);
};

// appends item images to the div innerOverlay
function showItemPics(){
  for (var i = 0, len = itemImages.length; i < len; i++) {
    var newImg = new Image();
    newImg.src = itemImages[i];
    newImg.addClassName("div-img " + i);
    innerOverlay.appendChild(newImg);
  };
};

// creates a scroll event that will be triggered when at the bottom 10% of the page
window.onscroll = function (){
  console.log("scrolling!");
  var windowHeight = window.innerHeight;
  var pixelsFromTop = document.body.scrollTop;
  var bodyHeight = document.body.offsetHeight;
  var distance = (bodyHeight - windowHeight) * .90;
  console.log(pixelsFromTop);
  if (distance < pixelsFromTop) {
    newPageCover = document.createElement("div").addClassName("page-cover");
    document.body.appendChild(newPageCover);
    newPageCover.setAttribute("style", "position: fixed; padding: 0; margin: 0; z-index: 9999998;");
    newPageCover.style.cssText +=';'+"width: 100%; height: 100%; background: rgba(0,0,0, 1);";
    console.log("this works!");
    overLay = document.createElement("div").addClassName("overlay").addClassName("fancybox-skin");
    newPageCover.appendChild(overLay);
    innerOverlay = document.createElement("div");
    // takes the variables from the cart and formats the info.
    if (cart === 0 | cart === null){
      innerOverlay.innerHTML = "There are no items in your cart.";
    } else {
      var contentItems = "There are " + numberOfItems        + " items in your cart.";
      var contentCost  = "The total cost of these items is " + cartTotal + ".";
      innerOverlay.innerHTML = contentItems + contentCost;
      showItemPics();
    }
  }
}
