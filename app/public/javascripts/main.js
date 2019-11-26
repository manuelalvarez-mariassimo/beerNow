function startMap() {
  // Initialize the map
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15
        });

        // Center map with user location
        map.setCenter(user_location);

        // Add a marker for your user location
        const marker = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          title: "You are here."
        });

        showMarkers(map, user_location.lat, user_location.lng)

      },

      function() {
        console.log("Error in the geolocation service.");
      }
    );
  } else {
    console.log("Browser does not support geolocation.");
  }
}

startMap();

function showMarkers(map, lat, lng) {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=bar&key=AIzaSyD_zFC1JIj0EgKS8Fp0GZw3MiXR1wiDxEg`
    )
    .then(barsPayload => {

      barsPayload.data.results.forEach(results => {

        let marker = new google.maps.Marker({
          position: results.geometry.location,
          map: map,
          title: results.name,
          icon:'../images/icon-beer.png',
        });

        var infowindow = new google.maps.InfoWindow({
          content: results.name
        });

        marker.addListener("click", function() {
          infowindow.open(map, marker);
        });
      });
    })
    .catch(err => console.log(err));
}
