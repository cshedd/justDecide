$(document).ready(function(event) {
  $('.weatherDisplay').empty();
  var cityName = "Austin";
  var queryURL = "https://api.wunderground.com/api/2790bf0deb38766a/conditions/q/TX/Austin.json";
  
  $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
      console.log(response);
      $('.weatherDisplay').append("<div><p class='weatherStats'>" + response.current_observation.display_location.city + ", " + response.current_observation.temp_f + "\u2109" + ", " + response.current_observation.weather + "</p></div>");
  });
});
