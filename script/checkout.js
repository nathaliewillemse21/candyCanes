document.getElementById('footer').innerHTML = new Date().getFullYear();

let checkoutData = JSON.parse(localStorage.getItem('cart')) || [];
let checkoutWrapper = document.querySelector('[checkout-data]');

function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);

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
    displayCheckoutData();
}

function displayCheckoutData() {
    checkoutWrapper.innerHTML = '';
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;

    cartItems.forEach(item => {
        let amount = item.price * item.quantity;
        totalAmount += amount;
        checkoutWrapper.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>R${item.price}</td>
                <td>R${amount}</td>
            </tr>`;
    });

    document.getElementById('total-amount').innerText = `R${totalAmount}`;
}

document.addEventListener('DOMContentLoaded', function () {
    displayCheckoutData();
    document.addEventListener('click', function (event) {
        if (event.target && event.target.getAttribute('data-add-to-cart') !== null) {
            const productId = parseInt(event.target.getAttribute('data-add-to-cart'), 10);
            const product = Products.find(product => product.id === productId);

            if (product) {
                addToCart(product);
                displayCheckoutData();
            }
        }
    });
});
