
// Handle Search Icon



/* const searchIcon = document.querySelector("#searchIcon");
const searchField = document.querySelector("#searchField"); */


/* export function handleSearchIconClick(searchIcon,searchField) {
    searchIcon.addEventListener("click", () => {
        searchField.focus();
        searchField.classList.toggle("focus");
        searchIcon.classList.toggle("fa-magnifying-glass");
    })
    searchIcon.addEventListener("blur", () => {
        searchField.classList.remove("focus");
        searchIcon.classList.toggle("fa-magnifying-glass");
    })
    searchField.addEventListener("blur", () => {
        searchField.classList.remove("focus");
        searchIcon.classList.toggle("fa-magnifying-glass");
        
    })
} */

/* handleSearchIconClick(searchIcon,searchField); */




// Handle Slider

window.onload = function () {
    const slides = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to start
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop back to end
        showSlide(currentIndex);
    }

    nextButton?.addEventListener('click', nextSlide);
    prevButton?.addEventListener('click', prevSlide);

    setInterval(nextSlide, 3000); // Change slide every 3 seconds
};

// Handle Trendy Products

// IMP Fetching Trendy Products

import { trendy } from "./trendyData.js";

const trendyData = trendy;

const urlHeader = {
    /* 'x-rapidapi-key': '32f42afe51msha8504fa4fcb37a5p132197jsnea3e7d67f415',
    'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com' */
    'x-rapidapi-key': '2d148f2205msh88c163f3a739a2cp13022fjsnafb8f743d20a',
    'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com'
}

const trendyProductsUrl = "https://shein-scraper-api.p.rapidapi.com/shein/trends/list?country=us&language=en&currency=usd";


/* async function getTrendyProducts(){
    
    try{
        const response = await fetch(trendyProductsUrl, {
            method: 'GET',
            headers: urlHeader
        })
        if(!response.ok){
            throw Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
    }
    
    
} */

export let trendId;

/*  getTrendyProducts().then( trendyProducts=>{
    console.log(trendyProducts);
    showTrendyProducts(trendyProducts.data);
    
    const swiperWrapper = document.querySelector(".swiper-wrapper ");

    swiperWrapper.addEventListener("click", (e) => {
            e.stopPropagation();
            trendId = e.target.id; 
            console.log(e.target);   
            

        window.location.href = "trends.html";

    });
}) */

const trendyProductsContainer = document.querySelector("#trendGroup");

function showTrendyProducts(products) {
    products?.forEach(product => {

        trendyProductsContainer ? trendyProductsContainer.innerHTML += `<div id="${product.trendId}" class="col swiper-slide bg-white">
                  <div class="card h-100  bg-white ">
                    <img id="${product.trendId}" src="${product.trendImgUrl}" class="card-img-top" alt="...">
                    <div class="card-body btn-grad">
                      <h5 class="card-title">${product.trendName}</h5>
                      
                    </div>
                  </div>
                </div>`: '';
    })

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: 'coverflow',
        // Options include 'slide', 'fade', 'cube', 'coverflow', 'flip'
        // If we need pagination    
        //'coverflow': 'flip',
        slidesPerView: 4,
        // If we need pagination


        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },


    });
}


showTrendyProducts(trendyData.data);


const swiperWrapper = document.querySelector(".swiper-wrapper ");

swiperWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    trendId = e.target.id;
    localStorage.setItem("trendId", trendId);
    console.log(e.target);
    window.location.href = "trends.html";
});


/*Handle show all categories */

export let productId;
let cartProducts;
let wishListProducts = [];
function showNumberOfCartItems() {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    document.querySelector("#numberOfCartItems").innerText = cartProducts.length;
}
showNumberOfCartItems();

function gettingAndSettingAllCartProduct(productId) {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cartProducts.push(productId);
    document.querySelector("#numberOfCartItems").innerText = cartProducts.length;
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    return cartProducts;
}
const jsonFileUrl = "../JS/trendProducts.json";
async function gettingAllCategories() {
    try {
        const response = await fetch(jsonFileUrl);
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



const showAllCategories = document.querySelector("#allBtn");
const allCategoriesContainer = document.querySelector("#allProductsContainer");
function displayAllCategories() {
    gettingAllCategories().then((data) => {
        console.log(data);
        let allProducts = data.data;
        allCategoriesContainer.innerHTML = `<span class="loader m-auto"></span> `;
        setTimeout(() => {
            allCategoriesContainer.innerHTML = ''
            allProducts.forEach(product => {
                allCategoriesContainer.innerHTML +=
                    `<div class="col">
            <div class="card h-100">
              <div class=' overflow-hidden'>
                    <img
                src="${product.goods_img}"
                class="card-img-top"
                alt="..."
              />
              </div>
              <div class="card-body">
                <h5 class="card-title d-flex ">
                    <p>${product.goods_name.slice(0, 20)}</p>
                    <p class="ms-auto">${product.salePrice.amount}$</p>
                </h5>
                <div class="d-flex justify-content-between">
                  <p class="view"> <i class="fa-solid fa-eye fa-xl fa-beat-fade"></i> </p>
                  <div id="liveToastBtn" class="HeartAnimation"></div>
                  <p class="add"> <i class="fa-solid fa-plus fa-xl"></i> </p>
                </div>
              </div>
            </div>
          </div>

             `;
                let allViews = document.querySelectorAll('.view')
                let allAdds = document.querySelectorAll('.add')
                let heartAnimations = document.querySelectorAll(".HeartAnimation");

                for (let i = 0; i < allViews.length; i++) {
                    allViews[i].addEventListener('click', (e) => {
                        console.log(allProducts[i]);

                        productId = allProducts[i].goods_id;
                        localStorage.setItem("productId", productId);
                        window.location.href = "productDetails.html";
                    })
                    allAdds[i].addEventListener('click', () => {
                        console.log(allProducts[i]);
                        console.log(allProducts[i].goods_id);
                        productId = allProducts[i].goods_id;
                        gettingAndSettingAllCartProduct(productId);
                        displayToast("Cart", "Product added to cart");
                    })
                    heartAnimations[i].addEventListener("click", (e) => {
                        productId = allProducts[i].goods_id;
                        if (e.target.classList.contains("animate")) {
                            displayToast("WishList", "Product removed from wishlist");
                            wishListProducts = wishListProducts.filter(product => product !== productId);
                            localStorage.setItem("wishListProducts", JSON.stringify(wishListProducts));

                        }
                        else {
                            displayToast("WishList", "Product added to wishlist");
                            wishListProducts.push(productId);
                            localStorage.setItem("wishListProducts", JSON.stringify(wishListProducts));




                        }


                        console.log(wishListProducts);

                    })

                }


                // Loop through each element and add a click event listener
                heartAnimations.forEach(function (element) {
                    element.addEventListener("click", function () {
                        this.classList.toggle("animate");



                    });
                });

            })
        }, 2000)




    });
}
displayAllCategories();
showAllCategories.addEventListener("click", () => {
    displayAllCategories();
});


/* Handle show  categories Buttons  */

let allCategoriesBtn = document.querySelectorAll('.btn');
console.log(allCategoriesBtn);
let activeBtn = document.querySelector('#allBtn'); // This should be initialized as the active button

for (let i = 0; i < allCategoriesBtn.length; i++) {
    allCategoriesBtn[i].addEventListener('click', (e) => {
        // Remove 'btn-success' class from the currently active button
        if (activeBtn) {
            activeBtn.classList.remove("btn-success");
            activeBtn.classList.remove("text-white");
            activeBtn.classList.add("btn-outline-success");
        }

        // Set the clicked button as the new active button
        activeBtn = e.target;

        // Add 'btn-success' class to the newly clicked button
        if (!activeBtn.classList.contains("btn-success")) {
            activeBtn.classList.add("btn-success");
            activeBtn.classList.add("text-white");
        }
    });
}




/* IMP grade toast */

function displayToast(tostHeader, toastMessage) {
    const toastContainer = document.createElement('div');
    toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";

    // Create the toast element
    const toast = document.createElement('div');
    toast.id = "liveToast";
    toast.className = "toast btn-grad border-0 text-white";
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    // Create the toast header
    const toastHeader = document.createElement('div');
    toastHeader.className = "toast-header text-success";



    const strong = document.createElement('strong');
    strong.className = "me-auto  text-success ";
    strong.textContent = tostHeader;

    const small = document.createElement('small');
    small.textContent = "now";

    const closeButton = document.createElement('button');
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "toast");
    closeButton.setAttribute("aria-label", "Close");

    // Append elements to the header

    toastHeader.appendChild(strong);
    toastHeader.appendChild(small);
    toastHeader.appendChild(closeButton);

    // Create the toast body
    const toastBody = document.createElement('div');
    toastBody.className = "toast-body";
    toastBody.textContent = toastMessage;

    // Append header and body to the toast
    toast.appendChild(toastHeader);
    toast.appendChild(toastBody);

    // Append the toast to the container
    toastContainer.appendChild(toast);

    // Append the container to the main products container
    document.querySelector('body').appendChild(toastContainer);

    // Optionally show the toast (if using Bootstrap's JavaScript)
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}





/*  */


