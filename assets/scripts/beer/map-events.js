'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
// const authUi = require('../auth/ui')
const store = require('../store')

// const service = new google.maps.places.PlacesService(map)
// service.textSearch(request, callback)

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

let map = new google.maps.Map(document.getElementById('map'), {
  center: pyrmont,
  zoom: 15
})

let infowindow = new google.maps.InfoWindow()

function initMap() {
  const pyrmont = {lat: -33.867, lng: 151.195}

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  })

  infowindow = new google.maps.InfoWindow()
  const service = new google.maps.places.PlacesService(map)
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['store']
  }, callback)
}

function callback (results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (const i = 0; i < results.length; i++) {
      createMarker(results[i])
    }
  }
}

function createMarker(place) {
  const placeLoc = place.geometry.location;
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
