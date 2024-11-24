document.addEventListener("DOMContentLoaded", () => {
    const filterBtn = document.getElementById("filterBtn");

    const productTable = document.getElementById("productTable").getElementsByTagName("tbody")[0];
    const expensesTable = document.getElementById("expensesTable").getElementsByTagName("tbody")[0];
    const totalInvestmentCell = document.getElementById("totalInvestment");
    const totalSalesCell = document.getElementById("totalSales");
    const totalProfitCell = document.getElementById("totalProfit");

    const addExpenseModal = document.getElementById("addExpenseModal");
    const addExpenseForm = document.getElementById("addExpenseForm");
    const saveExpenseBtn = document.getElementById("saveExpenseBtn");

    // Calculate total investment, sales, and profit
    const calculateTotals = () => {
        let totalInvestment = 0;
        let totalSales = 0;
        let totalProfit = 0;

        // Calculate totals from Product Table
        Array.from(productTable.rows).forEach(row => {
            const investment = parseFloat(row.cells[2].textContent);
            const sales = parseFloat(row.cells[3].textContent);
            const profit = parseFloat(row.cells[4].textContent);

            totalInvestment += investment;
            totalSales += sales;
            totalProfit += profit;
        });

        // Update summary table
        totalInvestmentCell.textContent = totalInvestment.toFixed(2);
        totalSalesCell.textContent = totalSales.toFixed(2);
        totalProfitCell.textContent = totalProfit.toFixed(2);
    };

    // Filter function
    const applyFilters = () => {
        const monthFilter = document.getElementById("filterMonth").value;
        const yearFilter = document.getElementById("filterYear").value.trim();

        Array.from(productTable.rows).forEach(row => {
            const isMonthMatch = monthFilter === "All" || row.dataset.month === monthFilter;
            const isYearMatch = !yearFilter || row.dataset.year === yearFilter;

            row.style.display = isMonthMatch && isYearMatch ? "" : "none";
        });

        Array.from(expensesTable.rows).forEach(row => {
            const isMonthMatch = monthFilter === "All" || row.dataset.month === monthFilter;
            const isYearMatch = !yearFilter || row.dataset.year === yearFilter;

            row.style.display = isMonthMatch && isYearMatch ? "" : "none";
        });

        calculateTotals();
    };

    // Add event listener for the filter button
    filterBtn.addEventListener("click", applyFilters);

    // Selectors
const addExpenseBtn = document.getElementById("addExpenseBtn"); // Button to show modal
const expenseModal = document.getElementById("expenseModal"); // Modal for adding/editing expenses
const expenseForm = document.getElementById("expenseForm"); // Expense form in the modal
const expensesTable = document.getElementById("expensesTable"); // Table displaying expenses
const saveExpenseBtn = document.getElementById("saveExpenseBtn"); // Save button in modal
let editingExpenseId = null; // Track currently editing expense

// Open modal for adding a new expense
addExpenseBtn.addEventListener("click", () => {
  editingExpenseId = null; // Clear any existing editing context
  expenseForm.reset(); // Reset the form
  expenseModal.style.display = "block"; // Show modal
});

// Save or Edit Expense
saveExpenseBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = new FormData(expenseForm);
  const expense = {
    name: formData.get("expenseName"),
    amount: parseFloat(formData.get("expenseAmount")),
    date: formData.get("expenseDate"),
  };

  if (editingExpenseId !== null) {
    // Edit existing expense
    const row = document.querySelector(`[data-id="${editingExpenseId}"]`);
    row.querySelector(".expense-name").textContent = expense.name;
    row.querySelector(".expense-amount").textContent = `₱${expense.amount.toFixed(2)}`;
    row.querySelector(".expense-date").textContent = expense.date;
  } else {
    // Add new expense
    const id = Date.now(); // Unique ID
    expensesTable.innerHTML += `
      <tr data-id="${id}">
        <td class="expense-name">${expense.name}</td>
        <td class="expense-amount">₱${expense.amount.toFixed(2)}</td>
        <td class="expense-date">${expense.date}</td>
        <td>
          <button class="edit-expense btn btn-warning" data-id="${id}">Edit</button>
          <button class="delete-expense btn btn-danger" data-id="${id}">Delete</button>
        </td>
      </tr>`;
  }

  expenseModal.style.display = "none"; // Hide modal
});

// Edit existing expense
expensesTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-expense")) {
    const id = event.target.getAttribute("data-id");
    editingExpenseId = id;

    const row = document.querySelector(`[data-id="${id}"]`);
    const name = row.querySelector(".expense-name").textContent;
    const amount = row.querySelector(".expense-amount").textContent.replace("₱", "");
    const date = row.querySelector(".expense-date").textContent;

    expenseForm.elements["expenseName"].value = name;
    expenseForm.elements["expenseAmount"].value = parseFloat(amount);
    expenseForm.elements["expenseDate"].value = date;

    expenseModal.style.display = "block"; // Show modal with data pre-filled
  }
});

// Delete expense
expensesTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-expense")) {
    const id = event.target.getAttribute("data-id");
    document.querySelector(`[data-id="${id}"]`).remove(); // Remove the row
  }
});
