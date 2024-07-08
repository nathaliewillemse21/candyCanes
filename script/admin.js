// Admin
let products = JSON.parse(localStorage.getItem('product')) || [];

let tableContainer = document.querySelector('[admin-products]');
function displayProducts(data) {
  tableContainer.innerHTML = '';
  try {
    if (data) {
      data.forEach((item, index) => {
        tableContainer.innerHTML += `
          <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>R${item.price}</td>
            <td>
              <button type="button" class="btn btn-dark"
              onclick='new EditProduct(${JSON.stringify(
                item
              )}, ${JSON.stringify(index)})'>Edit</button>
              <button type="button" class="btn btn-secondary" onclick='deleteProduct(${JSON.stringify(
                item
              )})'>Delete</button>
            </td>
          </tr>
        `;
      });
    } else {
      tableContainer.innerHTML = 'loading';
    }
  } catch (e) {
    tableContainer.innerHTML = 'Please try again';
  }
}
displayProducts(products);

function showMessage(message, messageType) {
  const messageContainer = document.getElementById('message');
  messageContainer.innerHTML = `<div class="alert alert-${messageType}" role="alert">${message}</div>`;
}

function EditProduct(product, index) {
  try {
    if (product) {
      const updatedName = prompt(
        `Enter updated name for product ${product.name}:`,
        product.name
      );
      const updatedDescription = prompt(
        `Enter updated description for product ${product.description}:`,
        product.description
      );
      const updatedPrice = prompt(
        `Enter updated price for product ${product.price}:`,
        product.price
      );
      const updatedImage = prompt(
        `Enter the product image ${product.image}:`,
        product.image
      );
      this.id = product.id;
      this.name = updatedName;
      this.description = updatedDescription;
      this.price = updatedPrice;
      this.image = updatedImage;

      products[index] = Object.assign({}, this);
      localStorage.setItem('product', JSON.stringify(products));
      displayProducts(products);
    } else {
      console.log('Product was not found');
    }
  } catch (e) {
    console.log(e.message);
  }
}

function deleteProduct(product) {
  const index = products.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    console.log(index);
    products.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(products));
    displayProducts(products);
  }
}

function addProduct() {
  const newProduct = {
    id: products.length + 1,
    name: confirm,
    description: confirm,
    price: 0,
  };
  products.push(newProduct);
  localStorage.setItem('product', JSON.stringify(products));
  displayProducts();
}

document.querySelector('[add-product]').addEventListener('click', addProduct);