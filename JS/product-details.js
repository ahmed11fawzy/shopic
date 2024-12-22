
let productId = 0;
let cartProducts;
const productContainer = document.querySelector("#productDetailsContainer");
function showSpinner() {
    productContainer.innerHTML = `
        <span class="loader m-auto"></span>
        `;

}

localStorage.getItem("productId") ? productId = localStorage.getItem("productId") : productId = 0;
console.log(productId);
function showNumberOfCartItems() {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    document.querySelector("#numberOfCartItems").innerText = cartProducts.length;
}
showNumberOfCartItems();


/* Handle get product details */

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '2d148f2205msh88c163f3a739a2cp13022fjsnafb8f743d20a',
        'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com'
    }
};

async function getSpecificProduct(productId) {
    try {
        showSpinner();
        const response = await fetch(`https://shein-scraper-api.p.rapidapi.com/shein/product/details?goods_id=${productId}&currency=usd&country=us&language=en`, options);
        if (!response.ok) {
            throw Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}


function showProducts() {
    getSpecificProduct(productId).then(data => {
        console.log(data);
        let product = data.data;

        displayProduct(product[0]);
    })
}

function displayProduct(product) {

    let productDetails = product;
    console.log(productDetails);
    productContainer.innerHTML = "";
    productContainer.innerHTML = `
        <div class="row g-3">
            <div class="col-md-6 ">
                <div class="card-body">
                    <h5 class="card-title">${productDetails.goods_name}</h5>
                    <p class="card-text"></p>
                </div>
                <div class='d-flex justify-content-between mt-3 pe-4'>
                    <p class="card-text"> 
                    <span class='text-secondary-emphasis text-decoration-line-through me-3'>
                    ${productDetails.retail_price?.amount} $</span> 
                    <span> ${productDetails.sale_price?.amount} $</span> </p>
                    <p>${productDetails?.comment_rank_average?.slice(0, 3)} 
                    <i class="fa-solid fa-star text-warning"></i> </p>
                    <p>${productDetails.cate_name}</p>
                </div>
                
                <button id="addToCart" class="btn  btn-outline-success mt-5"> Add to Cart</button>
            </div>
            <div class="col-md-4">
                <img src="${productDetails.goods_img}" id="${productDetails.goods_id
        }" class="img-fluid rounded-start" alt="...">
            </div>
            <div id="imageDetails" class="col-md-1">
                
            </div>
        </div>
        `;
    const addToCartBtn = document.querySelector("#addToCart");
    addToCartBtn.addEventListener("click", () => {
        addToCart(productDetails.goods_id);
    });
    let imageDetails = product.detail_image;
    let imageDetailsContainer =
        document.querySelector("#imageDetails");

    imageDetails ? imageDetails.forEach((element) => {
        imageDetailsContainer.innerHTML += `<img  src="${element}" class="img-fluid rounded-start pointer" alt="...">`;
    }) : (imageDetails = []);
    let images = document.querySelectorAll(
        "#imageDetails img"
    );
    for (let i = 0; i < 6; i++) {
        images[i]?.addEventListener("click", (e) => {
            console.log(e.target);
            document.querySelector(
                "#trendProductDetails img"
            ).src = e.target.src;
        });
    }
}
function addToCart(productId) {
    // Check if the product is already in the cart
    if (!cartProducts.includes(productId)) {
        cartProducts.push(productId); // Add the product ID to the cart
    }

    // Save updated cart products back to localStorage
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

    // Redirect to the cart page
    location.href = "cart.html";
}


showProducts()