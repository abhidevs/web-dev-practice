const crudcrudApiId = "3df12880237d42c591e5831c8c6349f3";

document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  let amount = document.getElementById("examount").value;
  let desc = document.getElementById("exdesc").value;
  let category = document.getElementById("excategory").value;

  try {
    const res = await axios.post(
      `https://crudcrud.com/api/${crudcrudApiId}/expenses`,
      { amount, desc, category }
    );
    addExpenseToList(res.data);
  } catch (err) {
    alert(err);
    console.error(err);
  }

  document.getElementById("addForm").reset();
});

async function printAllExpenses() {
  try {
    const res = await axios.get(
      `https://crudcrud.com/api/${crudcrudApiId}/expenses`
    );
    res.data.forEach((expense) => addExpenseToList(expense));
  } catch (err) {
    alert(err);
    console.error(err);
  }
}

function addExpenseToList(expense) {
  const expenseList = document.querySelector("#expenseList");
  let li = document.createElement("li");
  li.id = expense._id;
  li.innerHTML = `${expense.amount} - ${expense.category} - ${expense.desc} `;

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete Expense";
  deleteBtn.addEventListener("click", () => deleteExpense(expense._id));
  li.append(deleteBtn);
  li.append(" ");

  let editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit Expense";
  editBtn.addEventListener("click", () => editExpense(expense));
  li.append(editBtn);

  expenseList.appendChild(li);
}

async function deleteExpense(id) {
  try {
    await axios.delete(
      `https://crudcrud.com/api/${crudcrudApiId}/expenses/${id}`
    );
    removeExpenseFromList(id);
  } catch (err) {
    alert(err);
    console.error(err);
  }
}

function removeExpenseFromList(id) {
  const expense = document.getElementById(`${id}`);
  if (expense) expense.remove();
}

function editExpense(expense) {
  removeExpenseFromList(expense._id);

  const editForm = document.getElementById("editForm");
  const editAmount = document.getElementById("editamount");
  const editDesc = document.getElementById("editdesc");
  const editCategory = document.getElementById("editcategory");

  editAmount.value = expense.amount;
  editDesc.value = expense.desc;
  editCategory.value = expense.category;
  editForm.style.display = "block";
  document.getElementById("editamount").focus();

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let amount = editAmount.value;
    let desc = editDesc.value;
    let category = editCategory.value;
    const updatedExpense = { amount, desc, category };

    try {
      await axios.put(
        `https://crudcrud.com/api/${crudcrudApiId}/expenses/${expense._id}`,
        updatedExpense
      );
      addExpenseToList({ ...updatedExpense, _id: expense._id });
    } catch (err) {
      alert(err);
      console.error(err);
    }

    editForm.reset();
    editForm.style.display = "none";
  });
}

printAllExpenses();
