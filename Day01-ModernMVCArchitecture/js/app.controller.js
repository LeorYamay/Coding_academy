'use strict'

import { getUser, setUser } from "./services/user.service.js"


window.onInit = onInit;
window.submitForm = submitForm;
window.selectedPrefs = selectedPrefs;
window.selectedMap = selectedMap;
var user;
function onInit() {
    document.getElementById("age").addEventListener("input", updateSliderAction);
    document.getElementById("birthDate").addEventListener("blur", updateDateAction);
    user = getUser();
    initMap();
    if (user) {
        hidePrefs();
        setHomeStyleFromUser(user);
    }
    else {
        hideMap();
        // hideHome();
    }
}
function initMap() {
    const apiKey = 'AIzaSyCdOo7wsvXdx7LdpHAP_ls6LNB5OasbG_U';
    const location = '29.5577,34.9519'; // Eilat
    const zoomLevel = 14;


    const embedUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${location}&zoom=${zoomLevel}`;

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', embedUrl);
    iframe.setAttribute('width', '600');
    iframe.setAttribute('height', '450');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('style', 'border:0;');

    document.getElementById('map-container').appendChild(iframe);
}
function setHomeStyleFromUser(user) {
    let home = document.querySelector(".home");
    home.style.color = user.txtColor;
    home.style.backgroundColor = user.bgColor;
}

function hideMap() {
    document.querySelector(".map").classList.add("hiddenSection");
}
function showMap() {
    document.querySelector(".map").classList.remove("hiddenSection");
}
function hideHome() {
    document.querySelector(".home").classList.add("hiddenSection");
}
function showMapHome() {
    document.querySelector(".home").classList.remove("hiddenSection");
}
function hidePrefs() {
    document.querySelector(".user-pref").classList.add("hiddenSection");
}
function showPrefs() {
    document.querySelector(".user-pref").classList.remove("hiddenSection");
}

function selectedPrefs() {
    showPrefs();
    hideMap();
    // hideHome();
    let form = document.getElementById("userForm");

    if (user) {
        form.elements["email"].value = user.email;
        form.elements["age"].value = user.age;
        form.elements["txtColor"].value = user.txtColor;
        form.elements["bgColor"].value = user.bgColor;
        form.elements["birthDate"].value = user.birthDate;
        form.elements["birthTime"].value = user.birthTime;
    }

}

function selectedMap() {
    showMap();
    hidePrefs();
}
function updateSliderAction() {
    const ageSlider = document.getElementById("age");
    let ageValueSpan = document.getElementById("ageValue");
    let birthDateInput = document.getElementById("birthDate");
    // Update age value span
    ageValueSpan.textContent = ageSlider.value;

    // Update birth date based on age value 
    let currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - ageSlider.value);
    let formattedDate = currentDate.toISOString().split('T')[0];
    birthDateInput.value = formattedDate;
}

function updateDateAction() {
    let ageSlider = document.getElementById("age");
    let ageValueSpan = document.getElementById("ageValue");
    const birthDateInput = new Date(document.getElementById("birthDate").value);

    let currentDate = new Date();
    let diff = (currentDate.getFullYear() - birthDateInput.getFullYear());
    ageSlider.value = diff;

    // Update age value span
    ageValueSpan.textContent = ageSlider.value;
}

function submitForm(event) {
    event.preventDefault();

    let form = document.getElementById("userForm");

    let email = form.elements["email"].value;
    let age = form.elements["age"].value;
    let txtColor = form.elements["txtColor"].value;
    let bgColor = form.elements["bgColor"].value;
    let birthDate = form.elements["birthDate"].value;
    let birthTime = form.elements["birthTime"].value;

    console.log("Email: " + email);
    console.log("Age: " + age);
    console.log("Text Color: " + txtColor);
    console.log("Background Color: " + bgColor);
    console.log("Birth Date: " + birthDate);
    console.log("Birth Time: " + birthTime);
    hidePrefs()
    var user = {
        email: email,
        txtColor: txtColor,
        bgColor: bgColor,
        age: age,
        birthDate: birthDate,
        birthTime: birthTime
    }
    let userJson = JSON.stringify(user)
    console.log("user:", userJson);
    setUser(userJson);
    setHomeStyleFromUser(user);
    showMap()
}
