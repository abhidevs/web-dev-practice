const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");

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

    localStorage.setItem("user", JSON.stringify(user));

    // Clear the form
    nameInput.value = "";
    emailInput.value = "";
  }
}


// Read the localstorage data and show on frontend on page load
let storedUser = JSON.parse(localStorage.getItem('user'));
let userInfoString = `Existing user<br> name: ${storedUser.name}<br> email: ${storedUser.email}`;
let h4 = document.createElement('h4');
h4.innerHTML = userInfoString;
myForm.insertBefore(h4, myForm.firstChild);