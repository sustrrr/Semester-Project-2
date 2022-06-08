export function getExistingProducts() {
  const products = localStorage.getItem("inCart");

  if (products === null) {
    return [];
  } else {
    return JSON.parse(products);
  }
}
