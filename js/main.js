"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Frida Ternström
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");



// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {

    errorList.innerHTML = "";                   //rensar i errors inför varje validering
    errors.length = 0;
    // Kontrollera formulärets obligatoriska fält
    if (fullnameInput.value === "") {               //om fältet för namn är tomt
        errors.push("Du måste ange ett namn");      //lägg till det här meddelandet i arrayen errors    
    }

    if (emailInput.value === "") {
        errors.push("Du måste ange en e-postadress");
    }

    if (phoneInput.value === "") {
        errors.push("Du måste ange ett telefonnummer");
    }
    // Visa eventuella felmeddelanden
    displayErrors();
    // Returnera resultatet (true eller false) av valideringen
    if (errors.length > 0) {                //om antalet errors är fler än 0 = false
        return false;
    }

    return true;                                //om allt går igenom
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden - rensar i validate

    // Skriv ut aktuella felmeddelanden till DOM
    errors.forEach(error => {
        const errorLi = document.createElement("li");       //skapar nytt li-element
        const errorText = document.createTextNode(error);   //fyller li med error-text

        errorLi.appendChild(errorText);                     //lägger text som barn till li
        errorList.appendChild(errorLi);                     //lägger error som barn till ul
    });

}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const nameValue = fullnameInput.value;              //skapar element med värdet inbyggt, för enkelhet
    const emailValue = emailInput.value;
    const phoneValue = phoneInput.value;
    const fontValue = fontSelect.value;

    //lägger till användarens inmatning för preview
    let user = {
        name: nameValue,                //hämtar värdet av användarens inmatning
        email: emailValue,
        phone: phoneValue,
        font: fontValue
    }
    // Uppdatera studentkortet
    previewFullname.textContent = nameValue;        //skriver ut värdena i förhandsvisningen
    previewEmail.textContent = emailValue;
    previewPhone.textContent = phoneValue;
    document.querySelectorAll(".card-info").forEach(cardValue => {      //loopar igenom elementen i .card-info för att lägga på rätt font
        cardValue.style.fontFamily = fontValue;
    });

    // Lägg till studentkortet i historiken
saveHistory(user);
    // Spara och uppdatera historiken
    loadHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory(user) {
    // Spara history i localStorage
history.unshift(user);          //lägger till inmatade uppgifter i historyarrayen

let userData = JSON.stringify(history);     //omvandlar datan i arrayen för att kunna lagra i local storage

localStorage.setItem("user", userData);    //sparar i local storage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare
form.addEventListener("submit", function (event) {       // När formuläret skickas:
    event.preventDefault();

    if (validateForm() === true) {                      // - validera inmatningen
        createStudentCard();                            // - skapa studentkort om valideringen lyckas
    }
});


// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);       //så körs clearForm

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);       //så körs deleteHistory

// När sidan laddas:
// - läs in och visa eventuell tidigare historik