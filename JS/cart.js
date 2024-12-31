const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '2d148f2205msh88c163f3a739a2cp13022fjsnafb8f743d20a',
        'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com'
    }
};
let cartProducts = [];
const cartContainer = document.querySelector('#cartContainer');
function showSpinner() {
    cartContainer.innerHTML = `
        <span class="loader m-auto"></span>
        `;

}
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
        showSpinner()
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




function displayCartItem(cartProduct) {
    let item = cartProduct
    cartContainer.innerHTML = '';
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
                     <div class="card-footer bg-white border border-0 top-100 d-flex flex-column  justify-content-between ">
                        <div class=" counter-control d-flex w-75 justify-content-between  border border-success rounded rounded-2 ">
                            <div class="d-flex">
                                <button id="minusIcon" class='btn ' ><i class='fa-solid fa-minus fs-lg '></i></button>
                                <input id ="quantity" type="text" class="form-control  text-center border border-0 " disabled value="1">
                                <button id="plusIcon" class='btn ' ><i class='fa-solid fa-plus  fs-lg '></i></button> 
                            </div>
                            
                        </div>
                        <div class="d-flex justify-content-between w-75 mt-3">
                            <button id="delete" class="btn btn-danger w-25">Delete</button>
                            <button id="buyNow" class="btn btn-success w-25 ">Buy Now</button>
                        </div>
                    </div>
                  
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

    const plusIcon = document.querySelector('#plusIcon');
    const minusIcon = document.querySelector('#minusIcon');
    const quantity = document.querySelector('#quantity');
    const total = document.querySelector('#total');
    plusIcon.addEventListener('click', () => {
        quantity.value++;
        total.value = quantity.value * item.sale_price.amount;
    })

    minusIcon.addEventListener('click', () => {
        if (document.querySelector('#quantity').value > 1) {
            document.querySelector('#quantity').value--;
            total.value = quantity.value * item.sale_price.amount;
        }
    })




    const deleteBtn = document.querySelector('#delete');
    const buyNowBtn = document.querySelector('#buyNow');

    deleteBtn.addEventListener('click', () => {
        removeCartItem(item.goods_id);

    });
    buyNowBtn.addEventListener('click', () => {
        removeCartItem(item.goods_id);
        cartContainer.innerHTML = '';
    })

}

function removeCartItem(pId) {
    cartProducts = cartProducts.filter((item) => item !== pId);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    cartContainer.innerHTML = '';

}



function showNumberOfCartItems() {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    document.querySelector("#numberOfCartItems").innerText = cartProducts.length;
}
showNumberOfCartItems();