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
}
async function removePlace(placeId) {
    const places = await getPlaces();
    let index =  places.findIndex(reqPlace => reqPlace.id === placeId)
    places.splice(index, 1)
    localStorage.setItem(placesID, JSON.stringify(places))
}
async function addPlace( name, lat, lng, zoom) {
        const places = await getPlaces();
        let place = {
            id:_makeId(),
            name:name,
            lat:lat,
            lng:lng,
            zoom:zoom
        }
        places.push(place)
        localStorage.setItem(placesID, JSON.stringify(places))
}
async function getPlaceById(placeId) {
    const places = await getPlaces();
    let place =  places.find(reqPlace => reqPlace.id === placeId)
    if (place)
    {
        return place
    }
    console.error(`ID '${placeId}' not found`)
    throw (`wrongid `)
}
function _createPlace(name, lat, lng, zoom) {

}
function _createPlaces() {}


function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}