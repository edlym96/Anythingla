$(document).ready(function(){

	lat = -1
	long = -1
	
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
	  x.innerHTML = "Geolocation is not supported by this browser.";
	}

	function showPosition(position) {
	  lat = position.coords.latitude
	  long = position.coords.longitude
	  console.log(lat)
	  console.log(long)
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

	var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://developers.zomato.com/api/v2.1/search?lat="+lat+"&lon="+long+"&radius=20000",
	"method": "GET",
	"headers": {
		"Accept": "application/json",
		"user-key": "df955f8b62ed3879394c22edb2dd71ac"
		}
	}

	$('#test-btn').click(function(e){
		e.preventDefault()
		$.ajax(settings).done(function (response) {
			selection = Math.floor(Math.random() * 10);
			restaurant = response["restaurants"][selection]["restaurant"]["name"]
			restaurant_url = response["restaurants"][selection]["restaurant"]["url"]
			$('#test-link').text(restaurant);
			$('#test-link').attr("href", restaurant_url)
			console.log(restaurant)
		});	
	});

});
