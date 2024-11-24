document.addEventListener("DOMContentLoaded", function () {
    const categoryLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const allItems = document.querySelectorAll('.col-md-3');
    const addToCartButtons = document.querySelectorAll('.btn-success');
    const cartItemsContainer = document.getElementById('cartItems');
    const grandTotalElement = document.getElementById('grandTotal');
    const receivedAmountInput = document.getElementById('receivedAmount');
    const payingAmountInput = document.getElementById('payingAmount');
    const changeAmountInput = document.getElementById('changeAmount');
    const searchInput = document.getElementById('searchInput');
    
    let cart = [];

    // Function to calculate change
    function calculateChange() {
        const receivedAmount = parseFloat(receivedAmountInput.value) || 0;
        const payingAmount = parseFloat(payingAmountInput.value) || 0;
        const change = receivedAmount - payingAmount;
        changeAmountInput.value = change >= 0 ? change.toFixed(2) : 0; // Show 0 if negative
    }

    // Add event listeners to update the change field when either received or paying amount is changed
    receivedAmountInput.addEventListener('input', calculateChange);
    payingAmountInput.addEventListener('input', calculateChange);

    // Function to filter products based on category selection
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const category = e.target.textContent;
            if (category === "All") {
                allItems.forEach(item => item.style.display = 'block');
            } else {
                allItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });

    // Search function for filtering products by name
    searchInput.addEventListener('input', function() {
        const searchQuery = searchInput.value.toLowerCase();
        allItems.forEach(item => {
            const productName = item.querySelector('.card-title').textContent.toLowerCase();
            if (productName.includes(searchQuery)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Function to handle Add to Cart button click
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = button.closest('.col-md-3');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.card-text').textContent.replace('₱', '').trim());
            
            // Check if product is already in cart
            const existingProductIndex = cart.findIndex(item => item.name === productName);
            if (existingProductIndex !== -1) {
                // If product already in cart, increase quantity
                cart[existingProductIndex].quantity++;
                cart[existingProductIndex].subtotal = cart[existingProductIndex].quantity * cart[existingProductIndex].price;
            } else {
                // Add new product to cart
                cart.push({ name: productName, price: productPrice, quantity: 1, subtotal: productPrice });
            }

            // Update Cart UI
            updateCartUI();
        });
    });

    // Function to update cart UI
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';  // Clear existing cart items

        let grandTotal = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₱${item.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-info increase-quantity" data-name="${item.name}">+</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-sm btn-danger decrease-quantity" data-name="${item.name}">-</button>
                </td>
                <td>₱${item.subtotal.toFixed(2)}</td>
                <td><button class="btn btn-sm btn-danger delete-item" data-name="${item.name}">Delete</button></td>
            `;
            cartItemsContainer.appendChild(row);
            
            // Update grand total
            grandTotal += item.subtotal;
        });

        // Update Grand Total on the page
        grandTotalElement.textContent = grandTotal.toFixed(2);
    }

    // Event listener for quantity change (Increase or Decrease)
    cartItemsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('increase-quantity') || e.target.classList.contains('decrease-quantity')) {
            const productName = e.target.getAttribute('data-name');
            const product = cart.find(item => item.name === productName);
            
            if (e.target.classList.contains('increase-quantity')) {
                product.quantity++;
            } else if (e.target.classList.contains('decrease-quantity') && product.quantity > 1) {
                product.quantity--;
            }

            product.subtotal = product.quantity * product.price;

            // Update the cart UI
            updateCartUI();
        }
    });

    // Event listener for item deletion from cart
    cartItemsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-item')) {
            const productName = e.target.getAttribute('data-name');
            cart = cart.filter(item => item.name !== productName);

            // Update the cart UI
            updateCartUI();
        }
    });
});
