let trendId;
const urlHeader = {
	"x-rapidapi-key":
		"2d148f2205msh88c163f3a739a2cp13022fjsnafb8f743d20a",
	"x-rapidapi-host": "shein-scraper-api.p.rapidapi.com",
};
localStorage.getItem("trendId")
	? (trendId = localStorage.getItem("trendId"))
	: (trendId = 0);
console.log(trendId);
const container = document.querySelector("#specificTrendContainer");

function showSpinner() {
	container.innerHTML = `
        <span class="loader m-auto"></span>
        `;

}


async function getSpecificTrend(trendId) {
	try {
		showSpinner();
		const response = await fetch(
			`https://shein-scraper-api.p.rapidapi.com/shein/trends/products?trend_id=${trendId}&page=1&size=22&sort=recommend&country=us&language=en&currency=usd`,
			{
				method: "GET",
				headers: urlHeader,
			}
		);
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

const jsonFileUrl = "../JS/trendProducts.json";

async function getTrendyProducts() {
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

getSpecificTrend(trendId).then((data) => {
	console.log(data);
	let specificTrend = data.data;
	console.log('hi')
	console.log(specificTrend);
	container.innerHTML = "";
	specificTrend.forEach((element) => {
		console.log(element);

		container.innerHTML += `
	<div class="col">
                  <div class="card">
                     <div class="h-500">
								<img src="${element.goods_img}"  class="img-fluid"  alt="...">
						</div>
                  <div class="card-body">
                  <h5 class="card-title">${element.goods_name.slice(0, 20)}</h5>
                  <p class="card-text"> 
						<span class='text-secondary-emphasis text-decoration-line-through'>
						${element.retailPrice.amount}$</span> 
						<span> ${element.salePrice.amount}$</span> 
						</p>
						<button class="btn btn-success showMore" data-id="${element.goods_id}">Show more</button>
         </div>
      </div>
   </div>
	`;

		const showMore = document.querySelectorAll(".showMore");
		showMore.forEach((element) => {
			element.addEventListener("click", (e) => {
				console.log(e.target);
				console.log(e.target.dataset.id);
				getTrendProductDetails(e.target.dataset.id, specificTrend);
			});
		});
	});
});

function getTrendProductDetails(productId, ArrayOfProducts) {
	let specificProduct = ArrayOfProducts.find(
		(product) => product.goods_id == productId
	);
	console.log(specificProduct);
	showTrendProductDetails(specificProduct);
	location.href = `#${specificProduct.goods_id}`;
}

const productDetailsContainer = document.querySelector(
	"#trendProductDetails"
);
function showTrendProductDetails(product) {
	let productDetails = product;

	productDetailsContainer.innerHTML = "";
	productDetailsContainer.innerHTML = `
	<div class="row g-3">
		<div class="col-md-6 ">
			<div class="card-body">
				<h5 class="card-title">${productDetails.goods_name}</h5>
				<p class="card-text"></p>
			</div>
			<div class='d-flex justify-content-between mt-3 pe-4'>
				<p class="card-text"> 
				<span class='text-secondary-emphasis text-decoration-line-through me-3'>
				${productDetails.retailPrice.amount} $</span> 
				<span> ${productDetails.salePrice.amount} $</span> </p>
				<p>${productDetails.comment_rank_average.slice(
		0,
		3
	)} <i class="fa-solid fa-star text-warning"></i> </p>
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

	imageDetails
		? imageDetails.forEach((element) => {
			imageDetailsContainer.innerHTML += `<img  src="${element}" class="img-fluid rounded-start pointer" alt="...">`;
		})
		: (imageDetails = []);
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
let cartProducts = [];
// Load existing cart products from localStorage
const storedProducts = localStorage.getItem("cartProducts");
if (storedProducts) {
	cartProducts = JSON.parse(storedProducts); // Parse the JSON string into an array
}

// Function to add a product to the cart
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
