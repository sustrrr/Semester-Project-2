///////////details page, getting id

import { getExistingProducts } from "./utils/productsStorage.js";

import { baseUrl } from "./settings/api.js";

import createMenu from "./components/createMenu.js"; ///needs to be in every js main file

const productsUrl = baseUrl + "products/";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

createMenu(); ///needs to be in every js file

const detailUrl = productsUrl + id;

console.log(detailUrl);

// let cartArray = [];

const response = await fetch(detailUrl);
const details = await response.json();
console.log(details);

const productDetails = document.querySelector(".container-flex");
const breadcrumb = document.querySelector(".breadcrumb ul");

// const cart = document.querySelector(".cart");
// const cartList = document.querySelector(".cart-list");
// const totalContainer = document.querySelector(".total");

/////endre img til <img src="${details.image.url}"> igjen

productDetails.innerHTML = `<div class="item">
                            <img src="${details.image.url}"> 
                            </div>
                            
                            <div class="item">
                            <h1>${details.title}</h1>
                            <div class="detailsprice"><span class="price">${details.price}$</span></div>
                            <p>${details.description}</p>
                            <button class="product-button" data-product = "${details.id}">Add to cart</button>
                            </div>`;

breadcrumb.innerHTML += `<li>${details.title}</li>`;

const favButtons = document.querySelectorAll("button");

// detailsImg.innerHTML = `<img src="uploads/photo_1491553895911_0055eca6402d_eaf84a6eb4.jpeg">`;

favButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick() {
  const id = details.id;
  const title = details.title;
  const price = details.price;

  const currentProducts = getExistingProducts();

  const productExist = currentProducts.find(function (product) {
    return product.id === id;
  });

  if (productExist === undefined) {
    const product = { id: id, title: title, price: price };
    const detail = details;
    currentProducts.push(details);
    saveProducts(currentProducts);
  } else {
    const newProduct = currentProducts.filter((product) => product.id !== id);
    saveProducts(newProduct);
  }
}

function saveProducts(favs) {
  localStorage.setItem("inCart", JSON.stringify(favs));
}

// //////CART ON DETAILS PAGE
// function showCart(cartItems) {
//   cart.style.display = "block"; /////not important, see what looks best, maybe flex
//   cartList.innerHTML = "";
//   let total = 0; /////total price
//   cartItems.forEach(function (cartElement) {
//     total += cartElement.price;
//     cartList.innerHTML += `<div class="cart-item">
//     <h4>${cartElement.title}</h4>
//     </div>`;
//   });
//   totalContainer.innerHTML = `Total: ${total}`;
// }
