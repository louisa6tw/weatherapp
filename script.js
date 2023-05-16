let latitude = 0;// Create the variable for latitude
let longitude = 0;// Create the variable for longitude

window.onload = function() { //when page loads
    const date = new Date();
    //output our date in M/D/Y
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    document.getElementById('date').innerHTML = dateString
    // Now, set the .date HTML text to our dateString
    if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(success) //get position n call success function

	} else { //if geolocation is not exist/deny permission
	  console.log("Geolocation is not available in your browser.");
	}

}

function success(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	// Print out the latitude and longitude to see if it works!
    console.log(latitude, longitude)
}
const btn = document.getElementById('getWeatherBtn');
btn.addEventListener("click", function(){

  const xhr = new XMLHttpRequest(); //defines the xmlhttp object
  xhr.open("GET",`http://localhost:3000/weather/${lat}/${lon}`); // open a get request to the website
  xhr.send(); //send the request

  xhr.onload = function(){ //once we received response
    //body will look like this: {temp: 53}, {temp: 53}
  const body = JSON.parse(xhr.responseText) //set body to the responses
  let temperature = body.temperature //parse temp from body response
  let weatherstatus = body.weatherstatus //parse weather status from body response
  document.getElementById("temperature").innerHTML = `Temperature: ${temperature} F`;
  document.getElementById('weatherStatus').innerHTML = `Weather Status: ${weatherstatus}`;

}

//---------------------------- 5-day forecast xhr2
const xhr2 = new XMLHttpRequest(); //defines the xmlhttp object
  xhr2.open("GET",`http://localhost:3000/5day/${lat}/${lon}`); 
  xhr2.send(); 

  xhr2.onload = function(){
    const body = JSON.parse(xhr.responseText) 
    let forecast = body.forecast;
    var forecastElements = document.getElementsByClassName("forecast");
    //forecast = [{mon: 53},{tues: 63}, {weds: 52}]
    for (let i =0; i<forecast.length; i++){
      forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp}°F`;
    }
  }

  var forecast = [["M", 52], ["Tu", 53], ["W", 54], ["Th", 55], ["F", 56]] 
  var forecastElements = document.getElementsByClassName("forecast");
  for (let i = 0; i < forecast.length; i++) { //for loop that goes from 0 index to length-1 index
      forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "\u00b0F"; 
    }
})
