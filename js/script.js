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

document.getElementById("product-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = parseFloat(document.getElementById("product-price").value);
  products.push({ name, price });
  updateProductTable();
  this.reset();
  closeProductModal();
});

document.getElementById("order-form").addEventListener("submit", function (e) {
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
  showSnackbar("Product table updated");
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
  showSnackbar("Product table updated");
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
    showSnackbar("Product updated successfully");
  }

}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    updateProductTable();
    showSnackbar("Product deleted successfully");
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
    showSnackbar("Order updated successfully");
  } else {
    showSnackbar("Invalid input. Please try again.");
  }
}

function deleteOrder(index) {
  if (confirm("Are you sure you want to delete this order?")) {
    orders.splice(index, 1);
    updateOrderTable();
    showSnackbar("Order deleted successfully");
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

// Initialize tables
updateProductTable();
updateOrderTable();

function showSnackbar(message) {
  var snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.className = "snackbar show";
  setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

(function() {
  "use strict";

  var carousel = document.getElementsByClassName('carousel')[0],
      slider = carousel.getElementsByClassName('carousel__slider')[0],
      items = carousel.getElementsByClassName('carousel__slider__item'),
      prevBtn = carousel.getElementsByClassName('carousel__prev')[0],
      nextBtn = carousel.getElementsByClassName('carousel__next')[0];
  
  var width, height, totalWidth, margin = 20,
      currIndex = 0,
      interval, intervalTime = 4000;
  
  function init() {
      resize();
      move(Math.floor(items.length / 2));
      bindEvents();
    
      timer();
  }
  
  function resize() {
      width = Math.max(window.innerWidth * 0.25, 275);
      height = window.innerHeight * 0.5;
      totalWidth = width * items.length;
    
      slider.style.width = totalWidth + "px";
    
      for(var i = 0; i < items.length; i++) {
          var item = items[i];
          item.style.width = (width - (margin * 2)) + "px";
          item.style.height = height + "px";
      }
  }
  
  function move(index) {
      if(index < 1) index = items.length;
      if(index > items.length) index = 1;
      currIndex = index;
    
      for(var i = 0; i < items.length; i++) {
          var item = items[i],
              box = item.getElementsByClassName('item__3d-frame')[0];
          if(i === (index - 1)) {
              item.classList.add('carousel__slider__item--active');
              box.style.transform = "perspective(1200px)"; 
          } else {
              item.classList.remove('carousel__slider__item--active');
              box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
          }
      }
    
      slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
  }
  
  function timer() {
      clearInterval(interval);    
      interval = setInterval(function() {
        move(++currIndex);
      }, intervalTime);    
  }
  
  function prev() {
    move(--currIndex);
    timer();
  }
  
  function next() {
    move(++currIndex);    
    timer();
  }
  
  function bindEvents() {
      window.onresize = resize;
      prevBtn.addEventListener('click', function() { prev(); });
      nextBtn.addEventListener('click', function() { next(); });    
  }

  init();
})();
