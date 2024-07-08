
document.addEventListener('DOMContentLoaded', function () {
    displayProducts();
    document.getElementById('searchproduct').addEventListener('keyup', handleSearch);
    document.getElementById('sortBtn').addEventListener('click', handleSort);
    document.addEventListener('click', function (event) {
        if (event.target && event.target.getAttribute('data-add-to-cart') !== null) {
            const productId = parseInt(event.target.getAttribute('data-add-to-cart'), 10);
            const product = Products.find((product) => product.id === productId);
            if (product) {
                addToCart(product);
            }
        }
    });
});
// Product display
let Products = JSON.parse(localStorage.getItem('product')) || [
    {
        image: 'https://i.ibb.co/7K32PZW/download.jpg',
        id: 1,
        name: 'Oreo Candy Cane',
        price: 60,
    },
    {
        image: 'https://i.ibb.co/8jg3nvN/images.jpg',
        id: 2,
        name: 'Weird Flavour',
        price: 60,
    },
    {
        image: 'https://i.ibb.co/VtMMzBD/images-4.jpg',
        id: 3,
        name: 'Cinnamon Flavour',
        price: 65,
    },
    {
        image: 'https://i.ibb.co/4Jvcsg0/images-1.jpg',
        id: 4,
        name: 'Swedish Fish Flavour',
        price: 70,
    },
];

localStorage.setItem('product', JSON.stringify(Products));

function displayProducts() {

    console.log("Displaying products")
    let productWrapper = document.querySelector('[data-products]');
    productWrapper.innerHTML = '';

    Products.forEach((product) => {
        productWrapper.innerHTML += `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.id}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <button class="btn btn-dark" data-add-to-cart="${product.id}">Add to Cart</button>
                </div>
            </div>`;
    });
}

// Search function
function handleSearch() {
    let searchProduct = document.getElementById('searchproduct').value.toLowerCase();
    let searchItems = Products.filter((prod) => prod.name.toLowerCase().includes(searchProduct));

    let productWrapper = document.querySelector('[data-products]');
    productWrapper.innerHTML = '';

    if (searchItems.length > 0) {
        searchItems.forEach((item) => {
            productWrapper.innerHTML += `
                <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="${item.id}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.price}</p>
                        <button class="btn btn-dark" data-add-to-cart="${item.id}">Add to Cart</button>
                    </div>
                </div>`;
        });
    } else {
        displayProducts();
    }
}

// Sort function
let highest = false;

function handleSort() {
    highest = !highest;
    Products.sort((a, b) => highest ? a.price - b.price : b.price - a.price);
    displayProducts();
}

// Add to cart function
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert(`${product.name} added to cart!`);
}