// Filter and Search Functionality //
document.getElementById('filter').addEventListener('click', function() {
    var month = document.getElementById('monthFilter').value;
    alert("Filter by " + month);
    // Add your filter logic here
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    var searchQuery = this.value.toLowerCase();
    var rows = document.querySelectorAll('#inventoryTableBody tr');

    rows.forEach(function(row) {
        var productName = row.querySelector('td').textContent.toLowerCase();
        if (productName.includes(searchQuery)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Logout button and modal functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    $('#logoutModal').modal('show');
});

document.getElementById('confirmLogout').addEventListener('click', function() {
    // Add your logout logic here
    alert('You have logged out.');
    $('#logoutModal').modal('hide');
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:4000/api/sales')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = data.map(sale => `
                <tr>
                    <td>${sale.productCode}</td>
                    <td>${sale.productName}</td>
                    <td>${sale.stock}</td>
                    <td>${sale.qtySold}</td>
                    <td>${sale.qtyLeft}</td>
                    <td>${sale.investment}</td>
                    <td>${sale.sale}</td>
                    <td>${sale.totalSale}</td>
                </tr>
            `).join('');
        });
});

