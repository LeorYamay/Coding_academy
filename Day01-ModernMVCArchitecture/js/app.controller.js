'use strict'
window.onInit = onInit

function onInit() {
// Add event listeners to the age slider and birth date input
document.getElementById("age").addEventListener("input", updateSliderAction);
document.getElementById("birthDate").addEventListener("blur", updateDateAction);
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

function updateDateAction(){
    let ageSlider = document.getElementById("age");
    let ageValueSpan = document.getElementById("ageValue");
    const birthDateInput = new Date(document.getElementById("birthDate").value);

    let currentDate = new Date();
    let diff =(currentDate.getFullYear() - birthDateInput.getFullYear());
    ageSlider.value = diff;

    // Update age value span
    ageValueSpan.textContent = ageSlider.value;
}
