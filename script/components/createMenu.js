import { getUsername } from "../utils/logInStorage.js";
import logoutButton from "./logOutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".jsmenu");

  const username = getUsername();

  let authLink = `
  <a href="login.html" class="${
    pathname === "/login.html" ? "active" : ""
  }"><ion-icon name="person-outline"></ion-icon></a>`;

  if (username) {
    ////a href = add.html should come to add.html, only appears when logged in
    authLink = `<a href="add.html" class="hide${
      pathname === "/add.html" ? "active" : ""
    }">Add Product</a>
    <a href="productsEdit.html" class="hide${
      pathname === "/productsEdit.html" ? "active" : ""
    }">Edit Product</a>
                <button id="logout"><ion-icon name="log-out-outline"></ion-icon><span class="text">${username}<span></button>`; ///style it using #logout in css width: auto;
  }

  console.log(username);

  container.innerHTML = `
  <div class="sidemenu">
  <div class="hide">
  <a href="products.html" class="${
    pathname === "/" || pathname === "/products.html" ? "active" : "" /////check this
  }">Men</a>
  <a href="products.html" class="${
    pathname === "/" || pathname === "/products.html" ? "active" : "" /////check this
  }">Women</a>
  </div>
  </div>

  <div class="sidemenu">
  <a href="./index.html" class="nav-brand${
    pathname === "/" || pathname === "/" ? "active" : "" /////check this
  }">Shoesprint</a>
  </div>

  <div class="sidemenu">
  ${authLink}  
<a href="./cart.html" class="${
    pathname === "/" || pathname === "/" ? "active" : "" /////check this
  }"><ion-icon name="cart-outline"></ion-icon></a>
  </div>`;

  logoutButton();

  createMenuMobile();
}

function createMenuMobile() {
  const { pathname } = document.location;

  const container = document.querySelector(".burgermenu ul");

  const username = getUsername();

  let authLink = `
  <a href="login.html" class="${
    pathname === "/login.html" ? "active" : ""
  }"><ion-icon name="person-outline"></ion-icon></a>`;

  if (username) {
    ////a href = add.html should come to add.html, only appears when logged in
    authLink = `
    <li>
    <a href="add.html" class="accent${
      pathname === "/add.html" ? "active" : ""
    }">Add Product</a>
    </li>
    <li>
    <a href="productsEdit.html" class="accent${
      pathname === "/productsEdit.html" ? "active" : ""
    }">Edit Product</a>
    </li>
    `; ///style it using #logout in css width: auto;
  }

  console.log(username);

  container.innerHTML += `
  <li>${authLink}</li> `;
}
