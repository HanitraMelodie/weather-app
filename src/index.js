
  let now = new Date();
  let date = now.getDate();
  
  //Date
  function formatDate(now) {
    let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    let day = days[now.getDay()];
    let year = now.getFullYear();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  let month = months[now.getMonth()];
    return `Today is ${day} ${date} ${month} ${year}`;
  }
  let todaydate = document.querySelector("#date");
  todaydate.innerHTML = formatDate(now);
  let currentdate = document.querySelector("#currentdate");
  currentdate.innerHTML = formatDate(now);

  function displayWeather(response){
  let weatherTemp = document.querySelector("#temp");
  let weatherDes=document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  weatherTemp.innerHTML = `It is ${temperature} °C`;
  weatherDes.innerHTML = `${description}`;  

  }
 
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

  function showWeather(response){
    let weatherTemp = document.querySelector("#currenttemp");
    let weatherDes=document.querySelector("#currentdescription");
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    weatherTemp.innerHTML = `It is ${temperature} °C`;
    weatherDes.innerHTML = `${description}`;  
    }
   
    function retrievePosition(position) {
      let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      axios.get(url).then(showWeather);
    }
    navigator.geolocation.getCurrentPosition(retrievePosition);

    