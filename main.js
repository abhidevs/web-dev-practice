const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const msg = document.querySelector(".msg");

window.addEventListener("DOMContentLoaded", loadUsers);

myForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || emailInput.value === "" || phoneInput.value === "") {
    msg.style.display = "block";
    msg.classList.add("error");
    msg.innerHTML = "Please fill all the fields";

    setTimeout(() => (msg.style.display = "none"), 3000);
  } else {
    const user = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    axios
      .post(
        "https://crudcrud.com/api/9c57eee8501b48999f10394635b1f8c5/appointment",
        user
      )
      .then((res) => {
        console.log(res);
        addNewUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        msg.style.display = "block";
        msg.classList.add("error");
        msg.innerHTML = "Something went wrong";
        setTimeout(() => (msg.style.display = "none"), 3000);
      });

    // Clear the form
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
  }
}

// Read the data from crudcrud and show on frontend on page load
function loadUsers() {
  axios
    .get(
      "https://crudcrud.com/api/9c57eee8501b48999f10394635b1f8c5/appointment"
    )
    .then((res) => {
      console.log(res);
      res.data.forEach((item) => addNewUser(item));
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong while loading data");
    });
}

function addNewUser(details) {
  console.log(details);
  let userList = document.getElementById("users");
  let userInfoString = `${details.name} ${details.email} ${details.phone} `;
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(userInfoString));

  // Editing users and updating on crudcrud is not yet implemented
  const editBtn = document.createElement("input");
  editBtn.id = "edit";
  editBtn.type = "button";
  editBtn.value = "edit";
  editBtn.className = "delete";
  editBtn.style.border = "2px solid green";

  editBtn.addEventListener("click", () => {
    console.log(details);
    document.getElementById("name").value = details.name;
    document.getElementById("email").value = details.email;
    document.getElementById("phone").value = details.phone;
    li.remove();
  });

  li.appendChild(editBtn);
  li.append(" ");

  // Deleting users and removing from crudcrud is not yet implemented
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "delete";
  deleteBtn.className = "delete";
  deleteBtn.style.border = "2px solid red";

  deleteBtn.addEventListener("click", () => {
    localStorage.removeItem("userDetails" + details.email);
    li.remove();
  });

  li.appendChild(deleteBtn);
  li.id = "user-" + details.email;

  console.log(li);
  userList.appendChild(li);
}

function removeItemFromScreen(email) {
  const itemToBeRemoved = document.getElementById("user-" + email);
  if (itemToBeRemoved) itemToBeRemoved.remove();
}
