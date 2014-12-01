
// finds the cart
var cart = document.body.querySelector("ol#cart-sidebar") || document.body.querySelector("div.dropdown is-empty");
var itemsInCart = cart.querySelectorAll("li");
var fired = 0;
var body = document.body;

// finds the number of items in the cart
var totalPrice = 0;
var itemImages = [];
var numberOfItems = 0
// calculates the price of all the items in the cart
for (var i = 0, len = itemsInCart.length; i < len; i++) {
  var itemPrice = parseFloat(itemsInCart[i].querySelector(".product-details").querySelector(".price").innerHTML.slice(1));
  var itemTotalNumber = parseFloat(itemsInCart[i].querySelector("strong").innerHTML);
  var newPrice = itemPrice * itemTotalNumber;
  numberOfItems += itemTotalNumber;
  totalPrice += newPrice;
  cartTotal = "$" + totalPrice;
  itemImages.push(itemsInCart[i].querySelector("a").querySelector("img").src);
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
  newPageCover.parentNode.removeChild(newPageCover);
  fired = 0;
};

// creates a close button and a view cart button with css
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

// creates a page cover and a div to hold the information
function createOverlay(){
  newPageCover = document.createElement("div").addClassName("page-cover");
  newPageCover.setAttribute("style", "display:block; position:fixed; padding:0;");
  newPageCover.style.cssText +=';'+"margin:0; bottom:0; right:0; z-index:999998;";
  newPageCover.style.cssText +=';'+"width:100%; height:100%; background:rgba(0,0,0,0.8);";
  newPageCover.setAttribute("id", "addedOverlay");
  document.body.appendChild(newPageCover);
  console.log("this works!");
  overLay = document.createElement("div").addClassName("overlay").addClassName("fancybox-skin");
  overLay.setAttribute("style", "margin-left:auto; margin-right:auto; width:33em;");
  overLay.style.cssText +=';'+"height:12em; padding:15px; top:6em;"
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
};

// grabs the logged in span and creates the overlay if the user is logged in
var isLoggedIn = document.getElementsByClassName("myaccount-logged-in");
if (isLoggedIn[0].innerHTML == "(Logged In)"){
// creates a scroll event that will be triggered when at the bottom 10% of the page
  window.onscroll = function (){
    console.log("scrolling!");
    var windowHeight = window.innerHeight;
    var pixelsFromTop = document.body.scrollTop;
    var bodyHeight = document.body.offsetHeight;
    var distance = (bodyHeight - windowHeight) * .90;
    console.log(pixelsFromTop);
    if (distance < pixelsFromTop && fired == 0) {
      createOverlay();
    }
  };
};
