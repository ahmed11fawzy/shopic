const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '2d148f2205msh88c163f3a739a2cp13022fjsnafb8f743d20a',
        'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com'
    }
};
let cartProducts = [];

// Load existing cart products from localStorage
const storedProducts = localStorage.getItem("cartProducts");
if (storedProducts) {
    cartProducts = JSON.parse(storedProducts); // Parse the JSON string into an array
}

console.log(cartProducts);
function showCartItem(cartProducts) {

    getCartItemsDetails(cartProducts[cartProducts.length - 1]).then(data => {
        console.log(data);
        let item = data.data[0];
        displayCartItem(item);
    })

}

// showCartItem(cartProducts);

const url = 'https://shein-scraper-api.p.rapidapi.com/shein/product/details?goods_id=26546662&currency=usd&country=us&language=en';

async function getCartItemsDetails(id) {

    try {
        const response = await fetch(`https://shein-scraper-api.p.rapidapi.com/shein/product/details?goods_id=${id}&currency=usd&country=us&language=en`, options);
        if (!response.ok) {
            throw Error(
                `${response.status} ${response.statusText}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }

}



const cartContainer = document.querySelector('#cartContainer');
function displayCartItem(cartProduct) {
    let item = cartProduct
    cartContainer.innerHTML += `
    <div product class="col">
            <div class="card h-100">
                  
                  <div class="card-body me-auto col-">
                  <h5 class="card-title">${item.goods_name}</h5>
                  <div class="card-text">
                    <div class="d-flex justify-content-between w-50">
                        <p class='text-decoration-line-through text-secondary-emphasis'>
                         price: $${item.retail_price.amount}</p>
                        <p class='text-danger'> discount: ${item.unit_discount}%</p>
                        <p> sale: $${item?.sale_price?.amount}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p> ${item ? item?.comment_rank_average : 3}  <i class="fa-solid fa-star text-warning"></i> </p>
                    </div>
                  </div>

                  
                  </div>
                  <div class="card-footer bg-white border border-0 top-100  ">
                      <button id="buyNow" class="btn btn-outline-success me-lg-4" data-bs-toggle="modal" data-bs-target="#exampleModal" >Buy Now</button>
                      <button  id="delete" class="btn btn-outline-danger">Delete</button>
                  </div>
            </div>
          </div>
          <div class="col-md-4">
              <div class="img-container  ">
                  <img
              src="${item.goods_img}"
              class="img-fluid "
              alt="..."
              />
              </div>
          </div>`;
    const deleteBtn = document.querySelector('#delete');
    const buyNowBtn = document.querySelector('#buyNow');

    deleteBtn.addEventListener('click', () => {
        removeCartItem(item.goods_id);
        buyNowBtn.addEventListener('click', () => {
            cartProducts = cartProducts.filter((item) => item !== pId);
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            cartContainer.innerHTML = '';
        })
    });

}

function removeCartItem(pId) {
    cartProducts = cartProducts.filter((item) => item !== pId);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    cartContainer.innerHTML = '';

}


