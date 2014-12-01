var dropDownMenu = document.body.querySelectorAll(".dropdown-menu");

var cart = document.body.querySelector("ol#cart-sidebar") || document.body.querySelector("div.dropdown is-empty");
// finds the cart
var itemsInCart = cart.querySelectorAll("li");
var fired = 0;
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
  picsDiv = document.createElement("div");
  innerOverlay.appendChild(picsDiv);
  for (var i = 0, len = itemImages.length; i < len; i++) {
    var newImg = new Image();
    newImg.src = itemImages[i];
    newImg.addClassName("mainImg quicklook-prodImg " + i);
    newImg.style = "border: 1px solid lightgray;";
    picsDiv.appendChild(newImg);
  };
};

// removes the overlay from the DOM
function removeOverlay(){
  this.parentNode.removeChild(this);
  fired = 0;
};

// creates a close button and a view cart button
function createButtons(){
  var buttonsDiv = document.createElement("div");
  innerOverlay.appendChild(buttonsDiv);
  closeButton = document.createElement("div");
  closeButton.addClass = "close_overlay";
  closeButton.style.cssText = "display:inline; position:absolute;";
  closeButton.style.cssText +=';'+"width:121px; height:29px; background:#c6631D;";
  closeButton.style.cssText +=';'+"text-transform:uppercase; padding:4px 0 3px;";
  closeButton.style.cssText +=';'+"margin-right: 3px; cursor:pointer; color:white;";
  closeButton.style.cssText +=';'+"text-align:center; font-size:0.85em;";
  closeButton.style.cssText +=';'+"text-transform:uppercase; left:91px; top:150px;";
  closeButton.innerHTML = "Close";
  buttonsDiv.appendChild(closeButton);
  closeButton.onclick = function(){
    removeOverlay();
  };
  goToCart = document.createElement("div");
  goToCart.addClass = "new-view-cart";
  goToCart.style.cssText = "display:inline; position:absolute;";
  goToCart.style.cssText +=';'+"width:121px; height:29px; background:#c6631D;";
  goToCart.style.cssText +=';'+"text-transform:uppercase; padding:4px 0 3px;";
  goToCart.style.cssText +=';'+"margin-right: 3px; cursor:pointer; color:white;";
  goToCart.style.cssText +=';'+"text-align:center; font-size:0.85em;";
  goToCart.style.cssText +=';'+"text-transform:uppercase; right:91px; top:150px;";
  goToCart.innerHTML = "View Cart";
  buttonsDiv.appendChild(goToCart);
  goToCart.onclick = function(){
    location.href = "https://www.prana.com/checkout/onepage/";
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
  if (distance < pixelsFromTop && fired == 0) {
    newPageCover = document.createElement("div").addClassName("page-cover");
    newPageCover.setAttribute("style", "display:block; position:fixed; padding:0;");
    newPageCover.style.cssText +=';'+"margin:0; bottom:0; right:0; z-index:999998;";
    newPageCover.style.cssText +=';'+"width:100%; height:100%; background:rgba(0,0,0,0.8);";
    newPageCover.setAttribute("id", "addedOverlay");
    document.body.appendChild(newPageCover);
    newPageCover.addEventListener("click", removeOverlay);
    console.log("this works!");
    overLay = document.createElement("div").addClassName("overlay").addClassName("fancybox-skin");
    overLay.setAttribute("style", "margin-left:auto; margin-right:auto; width:33em;");
    overLay.style.cssText +=';'+"height:12em; padding:15px;"
    overLay.style.cssText +=';'+"box-shadow: 0 10px 25px rgba(0,0,0,0.5);"
    newPageCover.appendChild(overLay);
    innerOverlay = document.createElement("div");
    innerOverlay.setAttribute("style", "overflow:auto; overflowY:scroll; width:30em;");
    innerOverlay.style.cssText +=';'+"height:auto; font-size:1.1em; margin-left:auto; margin-right:auto;"
    innerOverlay.style.cssText +=';'+"text-align:center; line-height:2em;"
    overLay.appendChild(innerOverlay);
    fired = 1;
    // takes the variables from the cart and formats the info.
    if (cart === 0 | cart === null){
      innerOverlay.innerHTML = "There are no items in your cart.";
    } else {
      var contentItems = "There are " + numberOfItems        + " items in your cart. ";
      var contentCost  = "The total cost of these items is " + cartTotal + ".";
      innerOverlay.innerHTML = contentItems + contentCost;
      showItemPics();
    }
    createButtons();
  }
};

