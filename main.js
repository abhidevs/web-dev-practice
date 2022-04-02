const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const userIdInput = document.querySelector("#userId");
const msg = document.querySelector(".msg");

window.addEventListener("DOMContentLoaded", loadUsers);

myForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    phoneInput.value === ""
  ) {
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
    let userId = userIdInput.value;

    // When we click on the edit icon I am setting the hidden input's(userIdInput's) value to the _id of the user
    // So now if the userIdInput's value is not empty means we clicked edit button, so I am making axios GET or PUT request according to that
    if (userId === "") {
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
    } else {
      axios
        .put(
          `https://crudcrud.com/api/9c57eee8501b48999f10394635b1f8c5/appointment/${userId}`,
          user
        )
        .then((res) => addNewUser({ ...user, _id: userId }))
        .catch((err) => {
          console.error(err);
          msg.style.display = "block";
          msg.classList.add("error");
          msg.innerHTML = "Something went wrong";
          setTimeout(() => (msg.style.display = "none"), 3000);
        });
    }

    // Clear the form
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    userIdInput.value = "";
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
  const editBtn = document.createElement("button");
  editBtn.id = "edit";
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editBtn.className = "editBtn";

  editBtn.addEventListener("click", () => {
    console.log(details);
    document.getElementById("name").value = details.name;
    document.getElementById("email").value = details.email;
    document.getElementById("phone").value = details.phone;
    document.getElementById("userId").value = details._id;
    li.remove();
  });

  li.appendChild(editBtn);
  li.append(" ");

  // Deleting users and removing from crudcrud is not yet implemented
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteBtn.className = "deleteBtn";

  deleteBtn.addEventListener("click", () => {
    axios
      .delete(
        `https://crudcrud.com/api/9c57eee8501b48999f10394635b1f8c5/appointment/${details._id}`
      )
      .then((res) => li.remove())
      .catch((err) => {
        console.error(err);
        alert("Something went wrong while deleting user");
      });
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
