const productsContainer = document.getElementById("products-container");
const searchBar = document.getElementById("searchBar");
// loading
const loading = document.createElement("h2");
document.body.appendChild(loading);
loading.textContent = "Loading ...";
loading.style.textAlign = "center";

// create product function
function createProduct(title, image, price) {
  const product = document.createElement("div");
  product.classList.add("product-container");
  productsContainer.appendChild(product);

  product.innerHTML = `<h2 class="product-title">Title: ${title} </h2>`;
  product.innerHTML += `<img src="${image}" alt="${title} image" class="product-image" />`;
  product.innerHTML += `<h3 class="product-price" >Price: ${price}</h3>`;
}

let productsArr = [];

// products fetch
const API = "https://fakestoreapi.com/products";
(async function getProducts() {
  try {
    const response = await fetch(API);
    const products = await response.json();
    productsArr = products;
    if (products.length > 0) loading.remove();

    for (let i = 0; i < products.length; i++) {
      const { title, image, price } = products[i];
      createProduct(title, image, price);
    }
  } catch (err) {
    // error
    const error = document.createElement("h2");
    document.body.appendChild(error);
    error.textContent = "Error . . .";
    error.style.textAlign = "center";
    error.style.color = "red";
  } finally {
    loading.remove();
  }
})();

// search logic
let filteredProducts = [];
searchBar.addEventListener("input", (e) => {
  productsContainer.innerHTML = "";
  const searchValue = e.target.value.toLowerCase();
  filteredProducts = productsArr.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  for (let i = 0; i < filteredProducts.length; i++) {
    const { title, image, price } = filteredProducts[i];
    createProduct(title, image, price);
  }
  console.log(filteredProducts);
});
