var map;

function setPins(){
  var geocoder = new google.maps.Geocoder();

  //locations
	var firstPlace = "2201 Barton Springs Rd, Austin, TX 78746";
  var secondPlace = "5536 Burnet Rd, Austin, TX 78756"
 
  //add first marker
	geocoder.geocode({"address": firstPlace}, function(results, status){
		if (status === google.maps.GeocoderStatus.OK){
			// map.setCenter(results[0].geometry.location);
			console.log(typeof(results[0].geometry.location));
			var marker = new google.maps.Marker({
				map:map,
				position: results[0].geometry.location,
				animation: google.maps.Animation.DROP,
				title: "Barton Springs Pool"
			});

			marker.setMap(map);

		} else{
			alert('Error Loading Map!');
		}
	});

  //add seconds marker
  geocoder.geocode({"address": secondPlace}, function(results, status){
    if (status === google.maps.GeocoderStatus.OK){
      // map.setCenter(results[0].geometry.location);
      console.log(typeof(results[0].geometry.location));
      var marker = new google.maps.Marker({
        map:map,
        position: results[0].geometry.location,
        animation: google.maps.Animation.DROP,
        title: "Hey Cupcake"
      });

      marker.setMap(map);

    } else{
      alert('Error Loading Map!');
    }
  });
}


//create the map element
function initMap() {
  	map = new google.maps.Map(document.getElementById('map'), {
  	});

  	var infoWindow = new google.maps.InfoWindow({map:map});

  	if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(function(position){
  			var yourPosition = {
  				lat: position.coords.latitude,
  				lng: position.coords.longitude
  			};

  			infoWindow.setPosition(yourPosition);
  			infoWindow.setContent('You Are Here');
  			map.setCenter(yourPosition);
  			map.setZoom(10);
  		});
  	}
}

initMap();

setPins();
