'use strict'
const placesID = "places";
export const placeService = {
    getPlaces,
    removePlace,
    addPlace,
    getPlaceById,
}
async function getPlaces() {
    return JSON.parse(localStorage.getItem(placesID)) || [];
    // let placesString = localStorage.getItem("places")
    // if (placesString)
    // {
    //     return JSON.parse(placesString);
    // }
}
async function removePlace(placeId) {
    debugger
    const places = await getPlaces();
    let index =  places.findIndex(reqPlace => reqPlace.id === placeId)
    console.log("index",index)
    places.splice(index, 1)
    localStorage.setItem(placesID, JSON.stringify(places))
}
async function addPlace( name, lat, lng, zoom) {
        const places = await getPlaces();
        let place = {
            id:_makeId(),
            name:name,
            latitude:lat,
            longitude:lng,
            zoom:zoom
        }
        debugger
        places.push(place)
        localStorage.setItem(placesID, JSON.stringify(places))
}
function getPlaceById(placeId) {
    let place =localStorage.getItem(placeId)
    if (place)
    {
        return place
    }
    console.error(`ID '${placeId}' not found`)
    throw (`wrongid `)
}
function _createPlace(name, lat, lng, zoom) {}
function _createPlaces() {}


function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}