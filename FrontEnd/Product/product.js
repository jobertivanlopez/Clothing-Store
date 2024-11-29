document.addEventListener('DOMContentLoaded', function() {
            // Fetch all products and populate the table
            fetch('http://localhost:4000/api/clothings/')  // Ensure this matches your backend route
                .then(response => response.json())
                .then(data => {
                    if (data.products && data.products.length > 0) {
                        const tableBody = document.getElementById('productTableBody');
                        data.products.forEach(product => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <th scope="row">${product.ProductName}</th>
                                <td>${product.UnitInvestment}</td>
                                <td>${product.UnitPrice}</td>
                                <td>${product.QuantityinHand}</td>
                                <td>${product.QuantityinSold}</td>
                                <td>${product.TotalInvestment}</td>
                                <td>${product.TotalSale}</td>
                                <td>${product.ProfitStatus}</td>
                                <td>
                                    <button type="button" class="btn btn-primary btn-edit" data-product-id="${product._id}" data-toggle="modal" data-target="#exampleModal">
                                        <i class="bi bi-pencil-square"></i>
                                    </button>
                                </td>
                            `;
                            tableBody.appendChild(row);
                        });
                    } else {
                        console.log("No products found.");
                    }
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });

            // Handle edit button click to populate modal with product data
            document.getElementById('productTableBody').addEventListener('click', function(event) {
                if (event.target && event.target.classList.contains('btn-edit')) {
                    const productId = event.target.getAttribute('data-product-id');
                    const modal = document.getElementById('exampleModal');

                    // Ensure modal is available before continuing
                    if (!modal) {
                        console.error('Modal not found');
                        return;
                    }

                    // Fetch product details based on product ID
                    fetch(`http://localhost:4000/api/clothings/${productId}`)
                        .then(response => response.json())
                        .then(data => {
                            const product = data.product;

                            // Ensure modal elements are available before populating
                            const productNameInput = document.getElementById('productName');
                            const unitInvestmentInput = document.getElementById('unitInvestment');
                            const unitPriceInput = document.getElementById('unitPrice');
                            const quantityInHandInput = document.getElementById('quantityInHand');
                            const quantitySoldInput = document.getElementById('quantitySold');
                            const totalInvestmentInput = document.getElementById('totalInvestment');
                            const totalsaleInput = document.getElementById('totalsale');
                            const profitstatusInput = document.getElementById('profitstatus');

                            // Check if all inputs are found
                            if (productNameInput && unitInvestmentInput && unitPriceInput && quantityInHandInput && quantitySoldInput && totalInvestmentInput && totalsaleInput && profitstatusInput) {
                                // Populate the modal form with the product data
                                productNameInput.value = product.ProductName;
                                unitInvestmentInput.value = product.UnitInvestment;
                                unitPriceInput.value = product.UnitPrice;
                                quantityInHandInput.value = product.QuantityinHand;
                                quantitySoldInput.value = product.QuantityinSold;
                                totalInvestmentInput.value = product.TotalInvestment;
                                totalsaleInput.value = product.TotalSale;
                                profitstatusInput.value = product.ProfitStatus;
                            } else {
                                console.error('Modal form elements are missing.');
                            }

                            // Set the form to update the existing product
                            const updateButton = modal.querySelector('.btn-primary');
                            if (updateButton) {
                                updateButton.onclick = function() {
                                    // Prepare updated product data
                                    const updatedProduct = {
                                        ProductName: productNameInput.value,
                                        UnitInvestment: unitInvestmentInput.value,
                                        UnitPrice: unitPriceInput.value,
                                        QuantityinHand: quantityInHandInput.value,
                                        QuantityinSold: quantitySoldInput.value,
                                        TotalInvestment: totalInvestmentInput.value,
                                        TotalSale: totalsaleInput.value,
                                        ProfitStatus: profitstatusInput.value
                                    };

                                    // Send a PATCH request to update the product
                                    fetch(`http://localhost:4000/api/clothings/id/${productId}`, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(updatedProduct)  // Ensure all necessary fields are included
                                    })

                                    .then(response => response.json())
                                    .then(updatedData => {
                                        // Update the table row with the updated product data
                                        const row = document.querySelector(`[data-product-id="${productId}"]`).closest('tr');
                                        row.innerHTML = `
                                            <th scope="row">${updatedData.ProductName}</th>
                                            <td>${updatedData.UnitInvestment}</td>
                                            <td>${updatedData.UnitPrice}</td>
                                            <td>${updatedData.QuantityinHand}</td>
                                            <td>${updatedData.QuantityinSold}</td>
                                            <td>${updatedData.TotalInvestment}</td>
                                            <td>${updatedData.TotalSale}</td>
                                            <td>${updatedData.ProfitStatus}</td>
                                            <td>
                                                <button type="button" class="btn btn-primary btn-edit" data-product-id="${updatedData._id}" data-toggle="modal" data-target="#exampleModal">
                                                    <i class="bi bi-pencil-square"></i>
                                                </button>
                                            </td>
                                        `;
                                        $('#exampleModal').modal('hide'); // Hide the modal
                                    })
                                    .catch(error => {
                                        console.error('Error updating product:', error);
                                    });
                                };
                            } else {
                                console.error('Update button not found');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching product details:', error);
                        });
                }
            });

            // Handle add product button click
            document.getElementById('saveProductBtn').addEventListener('click', function() {
                const productNameInput = document.getElementById('productName');
                const unitInvestmentInput = document.getElementById('unitInvestment');
                const unitPriceInput = document.getElementById('unitPrice');
                const quantityInHandInput = document.getElementById('quantityInHand');
                const quantitySoldInput = document.getElementById('quantitySold');
                const totalInvestmentInput = document.getElementById('totalInvestment');
                const totalsaleInput = document.getElementById('totalsale');
                const profitstatusInput = document.getElementById('profitstatus');
                
                const newProduct = {
                    ProductName: productNameInput.value,
                    UnitInvestment: unitInvestmentInput.value,
                    UnitPrice: unitPriceInput.value,
                    QuantityinHand: quantityInHandInput.value,
                    QuantityinSold: quantitySoldInput.value,
                    TotalInvestment: totalInvestmentInput.value,
                    TotalSale: totalsaleInput.value,
                    ProfitStatus: profitstatusInput.value
                };

                // Send POST request to create new product
                fetch('http://localhost:4000/api/clothings/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProduct)
                })
                .then(response => response.json())
                .then(data => {
                    // Add the new product to the table
                    const tableBody = document.getElementById('productTableBody');
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <th scope="row">${data.ProductName}</th>
                        <td>${data.UnitInvestment}</td>
                        <td>${data.UnitPrice}</td>
                        <td>${data.QuantityinHand}</td>
                        <td>${data.QuantityinSold}</td>
                        <td>${data.TotalInvestment}</td>
                        <td>${data.TotalSale}</td>
                        <td>${data.ProfitStatus}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-edit" data-product-id="${data._id}" data-toggle="modal" data-target="#exampleModal">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                    $('#exampleModal').modal('hide'); // Hide the modal after saving
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                });
            });
        });