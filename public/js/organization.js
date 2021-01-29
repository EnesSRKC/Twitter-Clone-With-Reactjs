let map, infoWindow;

function initMap() {
  var mapDiv = document.getElementById("organization-map");
  var sakaryaUniLocation = { lat: 40.742396, lng: 30.325244 };
  var mapOptions = {
    center: sakaryaUniLocation,
    zoom: 13,
  };

  map = new google.maps.Map(mapDiv, mapOptions);

  var marker = new google.maps.Marker({
    position: sakaryaUniLocation,
    map: map
  });


  google.maps.event.addListener(map, 'click', function( event ){
    var clickLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    //printLocationToInputs(clickLocation);
    marker.setMap(null);

    marker = new google.maps.Marker({
      position: clickLocation,
      map: map
    });
  });

  getMyLocationHandler(map);

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function getMyLocationHandler(map) {
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Bulunduğum konum";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}
/* 
function printLocationToInputs(location) {
  var latInput = document.getElementById("map-lat");
  var lngInput = document.getElementById("map-lng");

  latInput.value = location.lat;
  lngInput.value = location.lng;
}

 */
