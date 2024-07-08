document.getElementById('footer').innerHTML = new Date().getFullYear();

let checkoutWrapper = document.querySelector('[checkout-data]');

function deleteProduct() {
    localStorage.removeItem('cart');
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
});
