const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '6fa2b4edbemsh65959f9dbf7e803p171b13jsn22aa0f4f26b5',
    'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com'
  }
};
const checkOutBtn = document.querySelector('#checkOutBtn');
const totalPrice = document.querySelector('#totalPrice');

const allCartItemsValue = document.querySelectorAll('.value');
console.log(allCartItemsValue);
allCartItemsValue.forEach(item => {
  totalPrice.value += item.value;
});

let cartProducts = [];
const cartContainer = document.querySelector('#cartContainer');
function showSpinner() {
  cartContainer.innerHTML = `
        <span id="spinner" class="loader d-block m-auto   "></span>
        `;

}



// Load existing cart products from localStorage
const storedProducts = localStorage.getItem("cartProducts");
if (storedProducts) {
  cartProducts = JSON.parse(storedProducts); // Parse the JSON string into an array
}

console.log(cartProducts);

function showCartItem(cartProducts) {
  if (cartProducts.length != 0) {

    for (let i = 0; i < cartProducts.length; i++) {
      getCartItemsDetails(cartProducts[i]).then(data => {
        console.log(data);
        let item = data.data[0];

        displayCartItem(item);
      })
    }


  }
  else {
    cartContainer.innerHTML = ' <p class="text-center fs-3 fw-bold my-3">No items in cart yet !!</p>'
  }

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
  finally {
    if (document.getElementById('spinner').classList.contains('d-none')) {
      document.getElementById('spinner').classList.remove('d-none');
    }
  }

}




function displayCartItem(cartProduct) {
  let item = cartProduct
  document.getElementById('spinner').classList.add('d-none');
  cartContainer.innerHTML += `
            <div class="row g-4 product">
                <div class="col-md-2">
                  <div class="img-container">
                    <img
                      src="${item.goods_img}"
                      class="img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="card">
                    <div
                      class="card-body row d-flex align-items-center"
                    >
                      <h6 class="my-auto col-3">
                        ${item.goods_name.split(' ').slice(0, 4).join('')}
                      </h6>
                      <div
                        class="col-4 d-flex justify-content-center"
                      >
                        <button id="minusIcon" class="btn border border-0 minusIcon">
                          <i
                            class="fa-solid fa-minus fs-lg"
                          ></i>
                        </button>
                        <input
                          id="quantity"
                          type="text"
                          class="form-control-sm text-center w-50 bg-white border border-0 quantity"
                          disabled
                          value="1"
                        />
                        <button id="plusIcon" class="btn border border-0 plusIcon ">
                          <i
                            class="fa-solid fa-plus fs-lg"
                          ></i>
                        </button>
                      </div>
                      <p class="col-2 my-auto item-price">${item?.sale_price?.amount}$</p>
                      <p id="total"  class="col-2 my-auto text-center total">
                      ${item?.sale_price?.amount}
                      </p>
                      <div class="col-1">
                        <button
                          id="delete"
                          class="btn btn-outline-danger delete"
                        >
                          <i class="fa-solid fa-close"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
    `

  getTotalCost();
  const itemPrice = document.querySelectorAll('.item-price');
  const plusIcon = document.querySelectorAll('.plusIcon');
  const minusIcon = document.querySelectorAll('.minusIcon');
  const quantity = document.querySelectorAll('.quantity');
  const total = document.querySelectorAll('.total');
  const deleteBtn = document.querySelectorAll('.delete');
  const rowItems = document.querySelectorAll('.product');

  for (let i = 0; i < quantity.length; i++) {

    plusIcon[i].addEventListener('click', () => {
      quantity[i].value++;
      total[i].innerText = (quantity[i].value * parseFloat(itemPrice[i].innerText.replace('$', ''))).toFixed(2);
      getTotalCost();
    })

    minusIcon[i].addEventListener('click', () => {
      if (quantity[i].value > 1) {
        quantity[i].value--;
        total[i].innerText = (quantity[i].value * parseFloat(itemPrice[i].innerText.replace('$', ''))).toFixed(2);;
        getTotalCost();
      }
      if (quantity[i].value == 1) {
        total[i].innerText = parseFloat(itemPrice[i].innerText.replace('$', '')).toFixed(2);
      }
    })


    deleteBtn[i].addEventListener('click', (e) => {
      e.preventDefault();
      removeCartItem(item.goods_id);
      console.log(rowItems[i]);
      rowItems[i].classList.add('remove-item');
      showNumberOfCartItems();
      showCartItem(cartProducts)
      if (cartProducts.length == 0) {
        cartContainer.innerHTML = ' <p class="text-center fs-3 fw-bold my-3">No items in cart yet !!</p>'
      }
      setTimeout(() => {
        rowItems[i].classList.add('d-none');
      }, 2000);
    });

  }
}

/* function displayCartItem(cartProduct) {
  const { goods_img, goods_name, sale_price } = cartProduct;

  // Clear the cart container
  cartContainer.innerHTML = '';

  // Create the main row element
  const row = document.createElement('div');
  row.className = 'row g-4';

  // Create the image column
  const imgCol = document.createElement('div');
  imgCol.className = 'col-md-2';

  const imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';

  const img = document.createElement('img');
  img.src = goods_img;
  img.className = 'img-fluid';
  img.alt = goods_name;

  imgContainer.appendChild(img);
  imgCol.appendChild(imgContainer);

  // Create the card column
  const cardCol = document.createElement('div');
  cardCol.className = 'col-md-10';

  const card = document.createElement('div');
  card.className = 'card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body row d-flex align-items-center';

  // Create the product name element
  const productName = document.createElement('h6');
  productName.className = 'my-auto col-3';
  productName.textContent = goods_name.split(' ').slice(0, 4).join(' ');

  // Create the quantity controls
  const quantityCol = document.createElement('div');
  quantityCol.className = 'col-4 d-flex justify-content-center';

  const minusButton = document.createElement('button');
  minusButton.id = 'minusIcon';
  minusButton.className = 'btn border border-0';

  const minusIcon = document.createElement('i');
  minusIcon.className = 'fa-solid fa-minus fs-lg';
  minusButton.appendChild(minusIcon);

  const quantityInput = document.createElement('input');
  quantityInput.id = 'quantity';
  quantityInput.type = 'text';
  quantityInput.className = 'form-control-sm text-center w-50 bg-white border border-0';
  quantityInput.disabled = true;
  quantityInput.value = '1';

  const plusButton = document.createElement('button');
  plusButton.id = 'plusIcon';
  plusButton.className = 'btn border border-0';

  const plusIcon = document.createElement('i');
  plusIcon.className = 'fa-solid fa-plus fs-lg';
  plusButton.appendChild(plusIcon);

  quantityCol.appendChild(minusButton);
  quantityCol.appendChild(quantityInput);
  quantityCol.appendChild(plusButton);

  // Create the price element
  const price = document.createElement('p');
  price.className = 'col-2 my-auto';
  price.textContent = `${sale_price?.amount}$`;

  // Create the total element
  const total = document.createElement('p');
  total.id = 'total';
  total.className = 'col-2 my-auto text-center total';
  total.textContent = sale_price?.amount;

  // Create the delete button
  const deleteCol = document.createElement('div');
  deleteCol.className = 'col-1';

  const deleteButton = document.createElement('button');
  deleteButton.id = 'delete';
  deleteButton.className = 'btn btn-outline-danger delete';

  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa-solid fa-close';
  deleteButton.appendChild(deleteIcon);

  deleteCol.appendChild(deleteButton);

  // Append all elements to the card body
  cardBody.appendChild(productName);
  cardBody.appendChild(quantityCol);
  cardBody.appendChild(price);
  cardBody.appendChild(total);
  cardBody.appendChild(deleteCol);

  // Append the card body to the card
  card.appendChild(cardBody);

  // Append the card to the card column
  cardCol.appendChild(card);

  // Append the columns to the row
  row.appendChild(imgCol);
  row.appendChild(cardCol);

  // Append the row to the cart container
  cartContainer.appendChild(row);

  // Add event listeners for quantity buttons
  const updateTotal = () => {
    const quantity = parseInt(quantityInput.value, 10);
    total.textContent = (quantity * sale_price.amount).toFixed(2);
    getTotalCost();
  };

  plusButton.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value, 10) + 1;
    updateTotal();
  });

  minusButton.addEventListener('click', () => {
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value, 10) - 1;
      updateTotal();
    }
  });

  // Add event listener for delete button
  deleteButton.addEventListener('click', () => {
    removeCartItem(cartProduct.goods_id);
    row.classList.add('remove-item');
    showNumberOfCartItems();
    if (cartProducts.length == 0) {
      cartContainer.innerHTML = ' <p class="text-center fs-3 fw-bold my-3">No items in cart yet !!</p>'
    }
    setTimeout(() => {
      row.classList.add('d-none');
    }, 1000);
  });
} */
function removeCartItem(pId) {
  cartProducts = cartProducts.filter((item) => item !== pId);
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  cartContainer.innerHTML = '';

}



function showNumberOfCartItems() {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  document.querySelector("#numberOfCartItems").innerText = cartProducts.length;
  const numberOfItems = document.querySelectorAll('.numberOfCartItems')
  for (let i = 0; i < numberOfItems.length; i++) {
    numberOfItems[i].innerText = cartProducts.length;
  }
}
showNumberOfCartItems();




function getTotalCost() {
  const total = document.querySelectorAll('.total');
  const totalCost = document.querySelector('#totalCost');
  let totalValue = 0;


  total.forEach(item => {

    const value = parseFloat(item.innerText.replace('$', ''));

    totalValue += value;
  });


  totalCost.innerText = `$${totalValue.toFixed(2)}`;
}

getTotalCost();