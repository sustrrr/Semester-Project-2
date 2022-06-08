import { getExistingProducts } from "./utils/productsStorage.js";
import createMenu from "./components/createMenu.js"; ///needs to be in every js main file

createMenu(); ///needs to be in every js file

const products = getExistingProducts();

const container = document.querySelector(".cards");
const totalContainer = document.querySelector(".total");
const empty = document.querySelector(".empty-cart");

let total = 0;

////change back to <img src="${product.image.url}">

products.forEach((product) => {
  empty.innerHTML = "";
  total += product.price;
  container.innerHTML += `<div class="cardx">
                          <a href="details.html?id=${product.id}">
                          <div class="container-flex">
                            <div class="item padding">
                            <img src="${product.image.url}">
                            </div>
                            <div class="item">
                            <h2>${product.title}</h2>
                            <p>Size: 36</p>
                            <p class="remove">Remove product</p>
                            </div>
                            <div class="item center">
                            <div class="increase">
                            <ion-icon name="add-circle-outline"></ion-icon>
                              <div class="box">1</div>
                              <ion-icon name="remove-circle-outline"></ion-icon>
                            </div>
                            <span class="price">${product.price}$</h3>
                            
                          </div>
                            </div>
                          </a>
                          </div>`;
});

totalContainer.innerHTML = `Total: ${total}`;
