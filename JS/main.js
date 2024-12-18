
// Handle Search Icon

const searchIcon = document.querySelector("#searchIcon");
const searchField = document.querySelector("#searchField");


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

// Handle Slider

window.onload = function() {
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

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    setInterval(nextSlide, 3000); // Change slide every 3 seconds
};

// Handle Trendy Products

// IMP Fetching Trendy Products

const urlHeader={
    'x-rapidapi-key': '32f42afe51msha8504fa4fcb37a5p132197jsnea3e7d67f415',
    'x-rapidapi-host': 'shein-scraper-api.p.rapidapi.com'
}

const trendyProductsUrl = "https://shein-scraper-api.p.rapidapi.com/shein/trends/list?country=us&language=en&currency=usd";


async function getTrendyProducts(){
    
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
    
    
}

getTrendyProducts().then( trendyProducts=>{
    console.log(trendyProducts);
    showTrendyProducts(trendyProducts.data);
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
      
        // If we need pagination    
        
        slidesPerView: 4,
        // If we need pagination
        
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        
      });
});

const trendyProductsContainer = document.querySelector("#trendGroup");

function showTrendyProducts(products) { 
    products?.forEach(product => {
        trendyProductsContainer.innerHTML += `<div class="col swiper-slide">
                  <div class="card h-100 ">
                    <img src="${product.trendImgUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${product.trendName}</h5>
                      
                    </div>
                  </div>
                </div>`
    })
 }
 