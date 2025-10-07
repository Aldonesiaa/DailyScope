let products = [];
let orders = [];

function showPage(pageId) {
  document.querySelectorAll("#main-content > div").forEach((page) => {
    page.style.display = "none";
  });
  document.getElementById(pageId + "-page").style.display = "block";
  if (pageId === "reports") {
    updateReports();
  }
}

function showProductModal() {
  document.getElementById("product-modal").style.display = "block";
}

function closeProductModal() {
  document.getElementById("product-modal").style.display = "none";
}

function showOrderModal() {
  document.getElementById("order-modal").style.display = "block";
  updateProductDropdown();
}

function closeOrderModal() {
  document.getElementById("order-modal").style.display = "none";
}

function updateProductDropdown() {
  const select = document.getElementById("order-product");
  select.innerHTML = '<option value="">Select a product</option>';
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = `${product.name} - $${product.price}`;
    select.appendChild(option);
  });
}

function updateProductTable() {
  const tbody = document.querySelector("#product-table tbody");
  tbody.innerHTML = "";
  products.forEach((product, index) => {
    const row = tbody.insertRow();
    row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
  });
}

function updateOrderTable() {
  const tbody = document.querySelector("#order-table tbody");
  tbody.innerHTML = "";
  orders.forEach((order, index) => {
    const row = tbody.insertRow();
    row.innerHTML = `
            <td>${order.customerName}</td>
            <td>${order.productName}</td>
            <td>${order.quantity}</td>
            <td>$${order.totalPrice.toFixed(2)}</td>
            <td>
                <button onclick="editOrder(${index})">Edit</button>
                <button onclick="deleteOrder(${index})">Delete</button>
            </td>
        `;
  });
}

function editProduct(index) {
  const product = products[index];
  const newName = prompt("Enter new product name:", product.name);
  const newPrice = parseFloat(
    prompt("Enter new product price:", product.price)
  );
  if (newName && !isNaN(newPrice)) {
    products[index] = { name: newName, price: newPrice };
    updateProductTable();
  }
}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    updateProductTable();
  }
}

function editOrder(index) {
  const order = orders[index];
  const newCustomerName = prompt(
    "Enter new customer name:",
    order.customerName
  );
  const newProductName = prompt("Enter new product name:", order.productName);
  const newQuantity = parseInt(prompt("Enter new quantity:", order.quantity));
  const product = products.find((p) => p.name === newProductName);
  if (newCustomerName && product && !isNaN(newQuantity)) {
    const newTotalPrice = product.price * newQuantity;
    orders[index] = {
      customerName: newCustomerName,
      productName: newProductName,
      quantity: newQuantity,
      totalPrice: newTotalPrice,
    };
    updateOrderTable();
  } else {
    alert("Invalid input. Please try again.");
  }
}

function deleteOrder(index) {
  if (confirm("Are you sure you want to delete this order?")) {
    orders.splice(index, 1);
    updateOrderTable();
  }
}

function updateReports() {
  const tbody = document.querySelector("#report-table tbody");
  tbody.innerHTML = "";
  let totalRevenue = 0;
  orders.forEach((order) => {
    const row = tbody.insertRow();
    row.innerHTML = `
            <td>${order.customerName}</td>
            <td>${order.productName}</td>
            <td>${order.quantity}</td>
            <td>$${order.totalPrice.toFixed(2)}</td>
        `;
    totalRevenue += order.totalPrice;
  });
  document.getElementById("total-revenue").textContent =
    totalRevenue.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("product-form");
  const orderForm = document.getElementById("order-form");

  productForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    products.push({ name, price });
    updateProductTable();
    this.reset();
    closeProductModal();
  });

  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const customerName = document.getElementById("customer-name").value;
    const productName = document.getElementById("order-product").value;
    const quantity = parseInt(document.getElementById("order-quantity").value);
    const product = products.find((p) => p.name === productName);
    if (product) {
      const totalPrice = product.price * quantity;
      orders.push({ customerName, productName, quantity, totalPrice });
      updateOrderTable();
      this.reset();
      closeOrderModal();
    } else {
      alert("Please select a valid product");
    }
  });

  // Initialize tables
  updateProductTable();
  updateOrderTable();
});
