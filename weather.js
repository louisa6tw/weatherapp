const express = require('express');
const request = require("request");
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = "a45f6b3bd4b91b5103823ae9e57f8b8c";


app.get('/weather/:lat/:lon', (req, res) => {
	
  var lat = req.params.lat;
  var lon = req.params.lon;
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
  
	request(url, (error, response, body)=>{

		// Printing the error if occurred
		if(error){ 
			console.log(error)
		}else {
		console.log(response.statusCode);// Printing status code
		
		body = JSON.parse(body); 
		let weatherStatus = body.weather[0].main ;
		res.send({"temp" : body.main.temp, "weatherStatus" : weatherStatus});
		console.log(body.main.temp); // Printing body
	}
	});
  
});



//--------------forecaset
app.get('/5day/:lat/:lon', (req, res) => {
	var lat = req.params.lat;
	var lon = req.params.lon;	
  
  var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
  
	request(url, (error, response, body)=>{
		if(error){ 
			console.log(error)
		}else {
		console.log(response.statusCode);// Printing status code
		body = JSON.parse(body);
		//console.log(body.main.temp);

		todaysDate = new Date().getDay(); //get today's date,return a num 0-6
		const week =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
		let forecast = [];

		for(let i=0; i < 5; i++){//0 1 2 3 4
			let tempSum = 0; //sum of all temp for the day
			let count = 0; //num of datapoints for a day
			for (let dataPoint of body.list){ //iterates throguh each datapoint
				let date = new Date(dataPoint.dt*1000); //convert seconds to miliseconds
				if(date.getDay() === todaysDate){ //if the day of week(0-6) matches today
					count++;
					tempSum += dataPoint.main.temp; //add to the running total of temps for the day
				}
			}
			let day = {"dayName": week[todaysDate],"temp": Math.round(tempSum/count)};
			forecast.push(day); //adds the JSON datapoint to our forecast
			todaysDate = (todaysDate+1)%7;
		}
		res.send({forecast});
	}
	});

});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
