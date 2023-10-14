// J'importe tous les éléments du DOM que j'utiliserai dans mon code, les boutons, les formulaires, etc...

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelector(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const bground = document.reserve;
function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// J'ajoute un event listener sur mon button qui va ouvrir mon modal
modalBtn.addEventListener("click", () => {
  launchModal();
});

// La function permettant d'ouvrir le modal et changer son display en block
function launchModal() {
  modalbg.style.display = "block";
}

// La function permettant de fermer le modal et changer son display en none
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});

// function permettant d'afficher l'erreur voulu et d'ajouter a l'input le data-error
function displayError(inputId, errorMessage) {
  const inputElement = document.getElementById(inputId);
  inputElement.parentElement.setAttribute("data-error", errorMessage);
  inputElement.parentElement.setAttribute("data-error-visible", "true");
  inputElement.classList.add("error-input");
}

// fonction qui va enlever l'erreur lorsque les conditions de l'input seront remplis
function removeError(inputId) {
  const inputElement = document.getElementById(inputId);
  inputElement.parentElement.removeAttribute("data-error");
  inputElement.parentElement.removeAttribute("data-error-visible");
  inputElement.classList.remove("error-input");
}

// reset le style des erreurs, enlever l'attribut et le status visible de l'erreur
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

// fonction verifiant tous les parametres des inputs
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

  if (
    firstName.value.trim().length < 2 ||
    !/^[A-Za-z]+$/.test(firstName.value.trim())
  ) {
    displayError(
      "first",
      "Veuillez entrer un prénom valide avec au moins 2 caractères alphabétiques."
    );
    isValid = false;
  }

  if (
    lastName.value.trim().length < 2 ||
    !/^[A-Za-z]+$/.test(lastName.value.trim())
  ) {
    displayError(
      "last",
      "Veuillez entrer un nom valide avec au moins 2 caractères alphabétiques."
    );
    isValid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (
    !emailPattern.test(email.value.trim()) ||
    email.value.trim().split("@").length !== 2
  ) {
    displayError("email", "Veuillez entrer une adresse email valide.");
    isValid = false;
  }
  if (birthdate.value === "") {
    displayError("birthdate", "Veuillez sélectionner votre date de naissance.");
    isValid = false;
  } else {
    const birthdateValue = new Date(birthdate.value);
    const currentDate = new Date();

    // Calculate the user's age
    const userAge = currentDate.getFullYear() - birthdateValue.getFullYear();
    const birthdateMonth = birthdateValue.getMonth();
    const currentMonth = currentDate.getMonth();
    const birthdateDay = birthdateValue.getDate();
    const currentDay = currentDate.getDate();

    if (
      userAge < 18 ||
      (userAge === 18 &&
        (birthdateMonth > currentMonth ||
          (birthdateMonth === currentMonth && birthdateDay > currentDay)))
    ) {
      displayError(
        "birthdate",
        "Vous devez avoir au moins 18 ans pour soumettre le formulaire."
      );
      isValid = false;
    }
  }

  if (
    isNaN(quantity.value.trim()) ||
    quantity.value.trim() === "" ||
    parseFloat(quantity.value.trim()) < 0
  ) {
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
    displaySuccessMessage();
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm(e);
});

// fonction affichant le message de succès si tous les paramètres du formulaire sont remplis
const displaySuccessMessage = () => {
  const successContainer = document.querySelector(".success-container");
  const btnClose = document.querySelector(".btn-close");
  const modalbg = document.querySelector(".bground");
  const formData = document.querySelectorAll(".formData");
  const reserveForm = document.querySelector("form[name='reserve']");
  successContainer.classList.remove("hidden");
  document.querySelector(".text-label").style.display = "none";
  formData.forEach((form) => {
    form.style.display = "none";
  });
  document.querySelector(".btn-submit").style.display = "none";
  btnClose.addEventListener("click", () => {
    successContainer.classList.add("hidden");
    formData.forEach((form) => {
      form.style.display = "block";
      form.value = "";
    });
    modalbg.style.display = "none";
    document.querySelector(".btn-submit").style.display = "block";
    reserveForm.reset();
  });
};
