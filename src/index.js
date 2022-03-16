
  let now = new Date();
  let date = now.getDate();
  
  //Date
  function formatDate(now) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[now.getDay()];
    let year = now.getFullYear();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    //diplay time and date
  let month = months[now.getMonth()];
    return `${day} ${date} ${month} ${year}`;
  }
  

  //display the weather 
  function displayWeather(response){
  let weatherTemp = document.querySelector("#temp");
  let weatherDes=document.querySelector("#description");
  let weatherHum= document.querySelector("#humidity");
  let weatherWin = document.querySelector("#wind");
  let weatherIcon=document.querySelector("#icon");
  let todaydate = document.querySelector("#date");

  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity=response.data.main.humidity;
  let wind=Math.round(response.data.wind.speed);
  temperaturecelsius = Math.round(response.data.main.temp);

  todaydate.innerHTML = formatDate(now);
  weatherTemp.innerHTML = `${temperature}`;
  weatherDes.innerHTML = `${description}`;  
  weatherHum.innerHTML=`Humidity:${humidity}%`;  
  weatherWin.innerHTML=`Wind speed:${wind} mph`;  
  weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
getForecast(response.data.coord);
  }
 //search for the weather of the city
 function search(event) {
    event.preventDefault();
    let apiKey = "5b3dc6fa036344ce1793b0213590a224";
    let cityInput = document.querySelector("#city-input");
    let cityElement = document.querySelector("#city");
    let city=cityInput.value;
    cityElement.innerHTML = cityInput.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(url).then(displayWeather)
  }
  let citychange = document.querySelector("#entercity");
  citychange.addEventListener("submit", search);

    //search for the current location
    function retrievePosition(position) {
      let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      axios.get(url).then(displayWeather);
      let cityElement = document.querySelector("#city");
      cityElement.innerHTML = "Current location";
     
    }
    //authorize to find the current location
    function currentPosition(event){
    event.preventDefault(event);
      navigator.geolocation.getCurrentPosition(retrievePosition);
    }
    
   let currentLocation=document.querySelector("#location-button");
    currentLocation.addEventListener("click",currentPosition);

    function displayFahrenheit(event){
      event.preventDefault(event);
      let temperaturefahrenheit = (temperaturecelsius * 9)/5+32;
      temperatureFarehnheit=document.querySelector("#temp");
      temperatureFarehnheit.innerHTML=Math.round(temperaturefahrenheit);
    }
    let fahrenheitLink=document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click",displayFahrenheit);

    function displayCelsius(event){
      event.preventDefault(event);
      temperatureCelsius=document.querySelector("#temp");
      temperatureCelsius.innerHTML=Math.round(temperaturecelsius);
    }
    let celsiusLink=document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click",displayCelsius);

    function displayForecast(response){
      console.log(response.data.daily);
      let displayforecast=document.querySelector("#forecast");
      let forecastHTML=``
      let forecast=response.data.daily;

      forecast.forEach(function(forecastday, index){
        if (index <5){
        forecastHTML=forecastHTML+` <div class="col- weather" ><div class="forecastdate">${formatDay(forecastday.dt)}</div>
      
        <div class="forecasttempmax">${Math.round(forecastday.temp.max)}C°</div>
        <div class="forecasttempmin">${Math.round(forecastday.temp.min)}C°</div>
        <div class="forecasticon"><img src="http://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png" alt"forecast icon"></div> </div></div></div>`;}
      })
     
      displayforecast.innerHTML=forecastHTML;
      
    }
    function getForecast(coordinates){
      console.log(coordinates);
      let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayForecast);
    }
    function formatDay(timestamp){
      let date=new Date(timestamp*1000);
      let day=date.getDay();
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[day];
    }