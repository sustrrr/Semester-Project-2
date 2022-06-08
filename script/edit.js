///////////details page, getting id
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { baseUrl } from "./settings/api.js";
import { getToken } from "./utils/logInStorage.js";
import deleteButton from "./components/deteleButton.js";

const token = getToken();
if (!token) {
  location.href = "./index.html"; //////THIS work
}

createMenu();

const productsUrl = baseUrl + "products/";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

const detailUrl = productsUrl + id;

console.log(detailUrl);

// console.log(details.id);

///// the form collect

const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const img = document.querySelector("#image");
const featured = document.querySelector("#featured");
const idInput = document.querySelector("#id");

const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

////calling

(async function () {
  try {
    const response = await fetch(detailUrl);
    const details = await response.json();

    title.value = details.title;
    description.value = details.description;
    price.value = details.price;
    img.value = details.image_url;
    featured.value = details.featured;
    idInput.value = details.id;

    deleteButton(details.id);
    console.log(details);
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = parseFloat(price.value);
  const imageValue = image.value.trim();
  const featuredValue = featured.value;
  if (typeof featuredValue == "boolean") {
    console.log(featuredValue);
  } else {
    console.log("error");
  }
  const idValue = idInput.value;

  if (
    titleValue.length === 0 ||
    descriptionValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    imageValue.length === 0 ||
    featuredValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".message-container"
    );
  }

  updateProduct(
    titleValue,
    descriptionValue,
    priceValue,
    imageValue,
    featuredValue,
    idValue
  );
}

async function updateProduct(
  title,
  description,
  price,
  image_url,
  featured,
  id
) {
  const url = baseUrl + "products/" + id;
  const data = JSON.stringify({
    title: title,
    description: description,
    price: price,
    image_url: image_url,
    featured: featured,
  });

  // const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.updated_at) {
      displayMessage("success", "Product updated", ".message-container");
    }

    if (json.error) {
      displayMessage(
        "warning",
        "Please supply proper values",
        ".message-container"
      );
    }
  } catch (error) {
    console.log(error);
  }
}
