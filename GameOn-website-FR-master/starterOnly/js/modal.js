// J'importe tous les éléments du DOM que j'utiliserai dans mon code, les boutons, les formulaires, etc...

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// J'ajoute un event listener sur tous les boutons en utilisant un forEach qui ajoutera sur chaque élément d'un array l'event click
modalBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    launchModal();
  })
);

function launchModal() {
  modalbg.style.display = "block";
}

closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});

function displayError(inputId, errorMessage) {
  const inputElement = document.getElementById(inputId);
  inputElement.parentElement.setAttribute("data-error", errorMessage);
  inputElement.parentElement.setAttribute("data-error-visible", "true");
  inputElement.classList.add("error-input");
}

// Function to remove the error message and styles for a specific input
function removeError(inputId) {
  const inputElement = document.getElementById(inputId);
  inputElement.parentElement.removeAttribute("data-error");
  inputElement.parentElement.removeAttribute("data-error-visible");
  inputElement.classList.remove("error-input");
}

// Function to reset error messages and styles for all inputs
function resetErrorStyles() {
  const errorElements = document.querySelectorAll("[data-error]");
  errorElements.forEach((element) => {
    element.removeAttribute("data-error");
    element.removeAttribute("data-error-visible");
  });

  const inputElements = document.querySelectorAll(".error-input");
  inputElements.forEach((element) => {
    element.classList.remove("error-input");
  });
}

function checkForm(e) {
  e.preventDefault();

  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const locationRadios = document.getElementsByName("location");
  const checkbox1 = document.getElementById("checkbox1");
  const checkbox2 = document.getElementById("checkbox2");
  const quantity = document.getElementById("quantity");
  let isValid = true;

  resetErrorStyles();

  if (firstName.value.trim() === "" || firstName.value.length < 2) {
    displayError("first", "Veuillez entrer un prénom valide.");
    isValid = false;
  }

  if (lastName.value.trim() === "" || lastName.value.length < 2) {
    displayError("last", "Veuillez entrer un nom valide.");
    isValid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email.value.trim())) {
    displayError("email", "Veuillez entrer un email valide.");
    isValid = false;
  }

  if (birthdate.value === "") {
    displayError("birthdate", "Veuillez sélectionner votre date de naissance.");
    isValid = false;
  }

  if (isNaN(quantity.value.trim()) || quantity.value.trim() === "") {
    displayError(
      "quantity",
      "Veuillez entrer un nombre valide pour la quantité."
    );
    isValid = false;
  }

  const selectedLocations = Array.from(locationRadios).some(
    (radio) => radio.checked
  );
  if (!selectedLocations) {
    displayError(
      "locationError",
      "Veuillez sélectionner au moins une location."
    );
    isValid = false;
  }

  if (!checkbox1.checked) {
    displayError("checkbox1", "Veuillez accepter les conditions générales.");
    isValid = false;
  }

  if (checkbox2.checked) {
    isValid = true;
  }

  if (isValid) {
    console.log("good");
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm(e);
});
