// Function to filter items by category
function filterItems(category) {
    const items = document.querySelectorAll('[data-category]');
    
    items.forEach(item => {
        // Show item if it's in the selected category, or if "all" is selected
        if (category === 'all' || item.getAttribute('data-category').toLowerCase() === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add event listeners to category links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = this.getAttribute('href').replace('#', '').toLowerCase();
            filterItems(category);
        });
    });
});

// Function to add item to "Pay Now" section
document.querySelectorAll(".btn-success").forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".card");
        const itemName = card.querySelector(".card-title").textContent;
        const itemPrice = parseFloat(card.querySelector(".card-text").textContent);

        // Check if item already exists in cart
        const existingItem = document.querySelector(`#cartItems tr[data-item="${itemName}"]`);
        if (existingItem) {
            // If item exists, increase quantity and update subtotal
            const quantityElement = existingItem.querySelector(".quantity");
            const quantity = parseInt(quantityElement.textContent) + 1;
            quantityElement.textContent = quantity;

            const subtotalElement = existingItem.querySelector(".subtotal");
            subtotalElement.textContent = (quantity * itemPrice).toFixed(2);
        } else {
            // Add new row to cart
            const cartItems = document.getElementById("cartItems");
            const newRow = document.createElement("tr");
            newRow.setAttribute("data-item", itemName);
            newRow.innerHTML = `
                <td>${itemName}</td>
                <td>${itemPrice.toFixed(2)}</td>
                <td>
                    <div class="quantity-wrapper">
                        <button class="btn btn-outline-secondary btn-sm quantity-btn" onclick="changeQuantity(this, 'decrement')">-</button>
                        <span class="quantity">1</span>
                        <button class="btn btn-outline-secondary btn-sm quantity-btn" onclick="changeQuantity(this, 'increment')">+</button>
                    </div>
                </td>
                <td class="subtotal">${itemPrice.toFixed(2)}</td>
                <td><button class="btn btn-danger" onclick="removeItem(this)">Delete</button></td>
            `;
            cartItems.appendChild(newRow);
        }
    });
});

// Function to change quantity of items in "Pay Now" section
function changeQuantity(button, action) {
    const quantityElement = button.parentNode.querySelector(".quantity");
    const row = button.closest("tr");
    const itemPrice = parseFloat(row.querySelector("td:nth-child(2)").textContent);
    let quantity = parseInt(quantityElement.textContent);

    if (action === "increment") {
        quantity++;
    } else if (action === "decrement" && quantity > 1) {
        quantity--;
    }

    quantityElement.textContent = quantity;
    row.querySelector(".subtotal").textContent = (quantity * itemPrice).toFixed(2);
}

// Function to remove item from "Pay Now" section
function removeItem(button) {
    const row = button.closest("tr");
    row.remove();
}
