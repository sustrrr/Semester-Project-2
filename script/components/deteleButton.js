import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/logInStorage.js";

export default function deleteButton(id) {
  const container = document.querySelector(".delete-container");

  container.innerHTML = `<button id="delete" class="my-custom-button">Delete product</button>`;

  const button = document.querySelector("#delete");

  button.onclick = async function () {
    console.log(id);

    const doDelete = confirm("Are you sure you want to delete product?");

    if (doDelete) {
      const url = baseUrl + "products/" + id;
      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "./index.html"; ////redirect to index.index

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
}
