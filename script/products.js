import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js"; ///needs to be in every js main file

const productsUrl = baseUrl + "products";
const container = document.querySelector(".cards");
const search = document.querySelector(".search");

const response = await fetch(productsUrl);
const json = await response.json();
let productsToRender = json;

createMenu(); ///needs to be in every js file

////// FILTER SEARCH ////
search.onkeyup = function (event) {
  const searchValue = event.target.value.trim().toLowerCase();

  const filteredProducts = json.filter(function (product) {
    if (product.title.toLowerCase().startsWith(searchValue)) {
      return true;
    }
  });

  console.log(filteredProducts);

  productsToRender = filteredProducts;

  getProducts();
};

//// GETTING ALL PRODUCTS ////

async function getProducts() {
  try {
    container.innerHTML = "";

    productsToRender.forEach(function (product) {
      /////change back to <img src="${product.image.url}"> after
      container.innerHTML += ` <div class="card">
                                    <a href="details.html?id=${product.id}"> 
                                    <img src="${product.image.url}">
                                    <div class ="cardbody">
                                      <h4>${product.title}</h4>
                                      <p>${product.price} $</p>
                                    </div
                                  </a>
                                  </div>`;
    });
  } catch (error) {
    console.log(error);
    // displayMessage("error", error, ".product-container");
  }
}

getProducts();
