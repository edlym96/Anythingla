$(document).ready(function(){
	
	let lat;
	let long;
	let settings;

	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
	   $("#error").text("Geolocation is not supported by this browser.");
	   $("#test-btn").attr('disabled', true)
	}

	function showPosition(position) {
	  lat = position.coords.latitude
	  long = position.coords.longitude
	  console.log(lat)
	  console.log(long)
	  settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://developers.zomato.com/api/v2.1/search?lat="+lat+"&lon="+long+"&radius=20000",
			"method": "GET",
			"headers": {
				"Accept": "application/json",
				"user-key": "df955f8b62ed3879394c22edb2dd71ac"
				}
		}	
	}

	function showError(error) {
	  switch(error.code) {
	    case error.PERMISSION_DENIED:
	      $("#error").text("User denied the request for Geolocation.")
	      break;
	    case error.POSITION_UNAVAILABLE:
	      $("#error").text("Location information is unavailable.")
	      break;
	    case error.TIMEOUT:
	      $("#error").text("The request to get user location timed out.")
	      break;
	    case error.UNKNOWN_ERROR:
	      $("#error").text("An unknown error occurred.")
	      break;
  		}

  		$("#test-btn").attr('disabled', true)
	}

	$('#test-btn').click(function(e){
		e.preventDefault()
		$.ajax(settings).done(function (response) {
			console.log(lat)
			console.log(long)
			console.log(settings["url"])
			selection = Math.floor(Math.random() * 10);
			restaurant = response["restaurants"][selection]["restaurant"]["name"]
			restaurant_url = response["restaurants"][selection]["restaurant"]["url"]
			$('#test-link').text(restaurant);
			$('#test-link').attr("href", restaurant_url)
			console.log(restaurant)
		});	
	});

});
