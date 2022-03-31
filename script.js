document.getElementById("addForm").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  let amount = document.getElementById("examount").value;
  let desc = document.getElementById("exdesc").value;
  let category = document.getElementById("excategory").value;

  let allExpenses = JSON.parse(localStorage.getItem("all_expenses")) || [];
  let id = new Date().getTime();
  allExpenses.push({ id, amount, desc, category });
  localStorage.setItem("all_expenses", JSON.stringify(allExpenses));

  document.getElementById("addForm").reset();
  printAllExpenses();
});


function printAllExpenses() {
  const expenseList = document.querySelector("#expenseList");
  let allExpenses = JSON.parse(localStorage.getItem("all_expenses")) || [];
  expenseList.innerHTML = "";
  console.log(allExpenses);

  allExpenses.forEach((expense) => {
    let li = document.createElement("li");
    li.innerHTML = `${expense.amount} - ${expense.category} - ${expense.desc} `;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete Expense";
    deleteBtn.addEventListener("click", () => deleteExpense(expense.id));
    li.append(deleteBtn);
    li.append(" ");

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit Expense";
    editBtn.addEventListener("click", () => editExpense(expense.id));
    li.append(editBtn);

    expenseList.appendChild(li);
  });
}


function deleteExpense(id) {
  let allExpenses = JSON.parse(localStorage.getItem("all_expenses")) || [];
  let newArr = allExpenses.filter((expense) => expense.id !== id);
  localStorage.setItem("all_expenses", JSON.stringify(newArr));
  printAllExpenses();
}


function editExpense(id) {
  let allExpenses = JSON.parse(localStorage.getItem("all_expenses")) || [];
  let expenseToEdit = allExpenses.filter((expense) => expense.id === id)[0];
  console.log(expenseToEdit);

  const editForm = document.getElementById("editForm");
  const editAmount = document.getElementById("editamount");
  const editDesc = document.getElementById("editdesc");
  const editCategory = document.getElementById("editcategory");

  editAmount.value = expenseToEdit.amount;
  editDesc.value = expenseToEdit.desc;
  editCategory.value = expenseToEdit.category;
  editForm.style.display = "block";
  document.getElementById("editamount").focus();

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let amount = editAmount.value;
    let desc = editDesc.value;
    let category = editCategory.value;

    const newArr = allExpenses.map((expense) => {
      if (expense.id === id) return { id, amount, desc, category };
      else return expense;
    });

    localStorage.setItem("all_expenses", JSON.stringify(newArr));
    editForm.reset();
    editForm.style.display = "none";
    printAllExpenses();
  });
}


printAllExpenses();
