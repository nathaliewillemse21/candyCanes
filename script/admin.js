// Load products from localStorage or initialize an empty array
let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to display products in the table
function displayProducts() {
    const tableContainer = document.querySelector('[admin-products]');
    tableContainer.innerHTML = '';

    if (products.length > 0) {
        products.forEach((product, index) => {
            tableContainer.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>R${product.price.toFixed(2)}</td>
                    <td>
                        <button type="button" class="btn btn-dark" onclick="editProduct(${index})">Edit</button>
                        <button type="button" class="btn btn-secondary" onclick="deleteProduct(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
    } else {
        tableContainer.innerHTML = '<tr><td colspan="4">No products found</td></tr>';
    }
}
displayProducts()
// Function to add a new product
function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productImage = document.getElementById('productImage').value;

    if (!productName || isNaN(productPrice) || !productImage) {
        showMessage('Please fill out all fields', 'danger');
        return;
    }

    const newProduct = {
        id: products.length + 1,
        name: productName,
        price: productPrice,
        image: productImage
    };

    products.push(newProduct);

    // Update localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Update UI and reset form fields
    displayProducts();
    resetForm();

    // Close modal
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();

    // Show success message
    showMessage('Product added successfully', 'success');
}

// Function to reset form fields
function resetForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
}

// Function to edit a product
function editProduct(index) {
    const product = products[index];
    if (!product) {
        showMessage('Product not found', 'danger');
        return;
    }

    const updatedName = prompt(`Enter updated name for product ${product.name}:`, product.name);
    const updatedPrice = parseFloat(prompt(`Enter updated price for product ${product.price}:`, product.price));
    const updatedImage = prompt(`Enter updated image URL for product ${product.image}:`, product.image);

    if (updatedName && !isNaN(updatedPrice) && updatedImage) {
        product.name = updatedName;
        product.price = updatedPrice;
        product.image = updatedImage;

        // Update localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Update UI
        displayProducts();

        // Show success message
        showMessage('Product updated successfully', 'success');
    } else {
        showMessage('Update cancelled or invalid input', 'danger');
    }
}

// Function to delete a product
function deleteProduct(index) {
    if (index >= 0 && index < products.length) {
        products.splice(index, 1);

        // Update localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Update UI
        displayProducts();

        // Show success message
        showMessage('Product deleted successfully', 'success');
    } else {
        showMessage('Product not found', 'danger');
    }
}

// Function to display messages
function showMessage(message, type) {
    const messageContainer = document.getElementById('message');
    messageContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}

// Initial display of products
displayProducts();

// Event listener for add product button
document.querySelector('[add-product]').addEventListener('click', addProduct);
displayProducts()