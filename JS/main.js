
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

        trendyProductsContainer ? trendyProductsContainer.innerHTML += `<div id="${product.trendId}" class="col swiper-slide">
                  <div class="card h-100 ">
                    <img id="${product.trendId}" src="${product.trendImgUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
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


        });
        let allViews = document.querySelectorAll('.view')
        let allAdds = document.querySelectorAll('.add')

        for (let i = 0; i < allViews.length; i++) {
            allViews[i].addEventListener('click', () => {
                e.target.stopPropagation();
                window.location.href = "productDetails.html";
            })
        }

    });
}

showAllCategories.addEventListener("click", () => {
    displayAllCategories();
});

















