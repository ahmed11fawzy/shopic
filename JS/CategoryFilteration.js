/* Handle spinner */
const allCategoriesContainer = document.querySelector("#allProductsContainer");
function showSpinner() {
    allCategoriesContainer.innerHTML = `
        <span class="loader m-auto"></span>
        `;

}


/* Handle All Categories */


const menBtn = document.getElementById("menBtn");
const womenBtn = document.getElementById("womenBtn");
const phoneBtn = document.getElementById("phoneBtn");

/* Handle men Categories */
export let productId;
let cartProducts;
function gettingAndSettingAllCartProduct(productId) {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cartProducts.push(productId);
    document.querySelector("#numberOfCartItems").innerText = cartProducts.length;
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    return cartProducts;
}

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '2d148f2205msh88c163f3a739a2cp13022fjsnafb8f743d20a',
        'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com'
    }
};
async function fetchingData(CategoriesId) {
    const categoriesUrl = `https://shein-scraper-api.p.rapidapi.com/shein/category/products?cat_id=${CategoriesId}&page=1&size=22&sort=recommend&min_price=4&max_price=100&country=us&currency=usd&language=en`;

    try {
        showSpinner();
        const response = await fetch(categoriesUrl, options);
        if (!response.ok) {
            throw Error(`${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }

}
function displayData(data) {
    let allProducts = data.data;
    allProducts.forEach(product => {
        allCategoriesContainer.innerHTML +=
            `<div class="col">
        <div class="card h-100">
          <img
            src="${product.goods_img}"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title d-flex ">
                <p>${product.goods_name.slice(0, 20)}</p>
                <p class="ms-auto">${product.salePrice.amount}$</p>
            </h5>
            <div class="d-flex justify-content-between">
              <p class="view"> <i class="fa-solid fa-eye fa-xl fa-beat-fade"></i> </p>
              <p class="add"> <i class="fa-solid fa-plus fa-xl "></i> </p>
            </div>
          </div>
        </div>
      </div>

        `;
    })
    let allViews = document.querySelectorAll('.view')
    let allAdds = document.querySelectorAll('.add')

    for (let i = 0; i < allViews.length; i++) {
        allViews[i].addEventListener('click', (e) => {
            console.log(allProducts[i]);
            productId = allProducts[i].goods_id;
            localStorage.setItem("productId", productId);

            window.location.href = "productDetails.html";
        })
        allAdds[i].addEventListener('click', () => {
            console.log(allProducts[i]);
            productId = allProducts[i].goods_id;
            gettingAndSettingAllCartProduct(productId);
            location.href = '#numberOfCartItems'
        })
    }
}
function showProducts(catId) {
    fetchingData(catId).then(data => {
        console.log(data);
        allCategoriesContainer.innerHTML = "";
        displayData(data);

    })

}
menBtn.addEventListener("click", () => {
    showProducts(2093);
})
womenBtn.addEventListener('click', () => {
    showProducts(1727);
})
phoneBtn.addEventListener('click', () => {
    showProducts(2274);
})