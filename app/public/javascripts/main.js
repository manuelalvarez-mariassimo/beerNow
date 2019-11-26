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

        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.3895185,-3.7040151&radius=1500&type=restaurant&key=AIzaSyD_zFC1JIj0EgKS8Fp0GZw3MiXR1wiDxEg`)
          .then(results => {
            console.log(results.data);
          })
          .catch(err => console.log(err));
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

// function showMarkers(map) {
//   axios.get("http://localhost:3000/places-data").then(allPlaces => {
//     allPlaces.data.forEach(places => {
//       let marker = new google.maps.Marker({
//         position: {
//           lat: places.location.coordinates[0],
//           lng: places.location.coordinates[1]
//         },
//         map: map,
//         title: places.name,
//         draggable : true
//       });

//       var infowindow = new google.maps.InfoWindow({
//         content: `${places.name} - ${places.type} <br>At ${marker.position}`
//       });

//       marker.addListener("click", function() {
//         infowindow.open(map, marker);
//       });

//     });

//   });
// }
