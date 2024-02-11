'use strict'

import { userService } from "./services/user.service.js"
import { placeService } from "./services/place.service.js"

window.onInit = onInit;
window.submitForm = submitForm;
window.selectedPrefs = selectedPrefs;
window.selectedMap = selectedMap;
window.downloadCSV = downloadCSV;
window.panToMyLocation = panToMyLocation;


var user;
var gMap;
var gMarkers=[];
function onInit() {
    document.getElementById("age").addEventListener("input", updateSliderAction);
    document.getElementById("birthDate").addEventListener("blur", updateDateAction);
    user = userService.getUser();
    if (user) {
        hidePrefs();
        setHomeStyleFromUser(user);
    }
    else {
        hideMap();
        // hideHome();
    }
    initMap();
}
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    let mapContainer = document.getElementById("map-container")
    gMap = new Map(mapContainer, {
        center: { lat: 29.5577, lng: 34.9519 },
        zoom: 14,
    });
    gMap.addListener('click', async ev => {
        //could be nice to get the name of the place or a place nearby as a suggestion for the user
        const name = prompt('Place name?', 'Place 1')
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()
        await placeService.addPlace(name, lat, lng, gMap.getZoom())
        await renderMarkers();
        await renderPlaces();
    })
    await renderPlaces();
    await renderMarkers();
}
async function renderPlaces() {
    const places = await placeService.getPlaces();
    const placeList = document.getElementById("place-list");
    placeList.innerHTML = "";
    if (places.length > 0) {
        places.map(place => {
            let li = document.createElement("li");
            let placeText = document.createTextNode(place.name)
            li.appendChild(placeText)
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "X";
            deleteButton.addEventListener("click", async function () {
                onRemovePlace(place.id)
                li.remove();
            });
            li.appendChild(deleteButton);
            let goButton = document.createElement("button");
            goButton.innerHTML = "GO";
            goButton.addEventListener("click", async function () {
                await onPanToPlace(place.id)
            })

            li.appendChild(goButton);
            placeList.appendChild(li);
        })
        const csvButton = document.getElementById("download-csv");
        csvButton.disabled = false;
    }
    else{
        const csvButton = document.getElementById("download-csv");
        csvButton.disabled = true;
    }

}
async function onPanToPlace(placeId) {
    const place = await placeService.getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}
async function panToMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const place = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    zoom: 18,
                };
                gMap.setCenter({ lat: place.lat, lng: place.lng });
                gMap.setZoom(place.zoom);
            },
            (error) => console.error(error))
    }
    else {
        alert("Geolocation is not supported by this browser, or you may not have allowed it.");
    }
}
async function renderMarkers() {
    const places = await placeService.getPlaces()
    // remove previous markers 
    gMarkers.forEach(marker => marker.setMap(null))
    // every place is creating a marker 
    gMarkers = places.map(place => {
        return new google.maps.Marker({
            position: place,
            map: gMap,
            title: place.name
        })
    })
}
async function onRemovePlace(placeId) {
    await placeService.removePlace(placeId);
    await renderMarkers();
    await renderPlaces();
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
    user = userService.getUser()
    if (user) {
        form.elements["email"].value = user.email;
        form.elements["age"].value = user.age;
        let ageValueSpan = document.getElementById("ageValue");
        ageValueSpan.textContent = user.age;
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

    // console.log("Email: " + email);
    // console.log("Age: " + age);
    // console.log("Text Color: " + txtColor);
    // console.log("Background Color: " + bgColor);
    // console.log("Birth Date: " + birthDate);
    // console.log("Birth Time: " + birthTime);
    hidePrefs()
    user = {
        email: email,
        txtColor: txtColor,
        bgColor: bgColor,
        age: age,
        birthDate: birthDate,
        birthTime: birthTime
    }
    let userJson = JSON.stringify(user)
    // console.log("user:", userJson);
    userService.setUser(userJson);
    setHomeStyleFromUser(user);
    showMap()
}


async function downloadCSV() {
    let places = await placeService.getPlaces();
    
    let header = Object.keys(places[0]).join(',') + '\n';
    let csvRows = places.map(obj=>Object.values(obj).join(',')+ '\n')
    let csvData = header + csvRows.join('');
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'places.csv';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

