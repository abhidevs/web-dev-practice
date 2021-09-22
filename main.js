const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");

window.addEventListener("DOMContentLoaded", loadUsers);

myForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || emailInput.value === "") {
    msg.style.display = "block";
    msg.classList.add("error");
    msg.innerHTML = "Please fill all the fields";

    setTimeout(() => (msg.style.display = "none"), 3000);
  } else {
    const user = {
      name: nameInput.value,
      email: emailInput.value,
    };

    localStorage.setItem("userDetails" + user.email, JSON.stringify(user));
    addNewUser(user);

    // Clear the form
    nameInput.value = "";
    emailInput.value = "";
  }
}

// Read the localstorage data and show on frontend on page load
function loadUsers() {
  console.log(Object.keys(localStorage));
  Object.keys(localStorage).forEach((item) => {
    if (item.match(/userDetails/g)) {
      addNewUser(JSON.parse(localStorage.getItem(item)));
    }
  });
}

function addNewUser(details) {
  console.log(details);
  let userList = document.getElementById("users");
  let userInfoString = `${details.name} ${details.email} `;
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(userInfoString));

  const editBtn = document.createElement("input");
  editBtn.id = "edit";
  editBtn.type = "button";
  editBtn.value = "edit";
  editBtn.className = "delete";
  editBtn.style.border = "2px solid green";

  li.appendChild(editBtn);

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "delete";
  deleteBtn.className = "delete";
  deleteBtn.style.border = "2px solid red";

  li.appendChild(deleteBtn);

  console.log(li);
  userList.appendChild(li);
}
