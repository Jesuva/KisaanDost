function weather() {

    var location = document.getElementById("location");
    var apiKey = 'f536d4c3330c0a1391370d1443cee848';
    var url = 'https://api.forecast.io/forecast/';
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
       $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
         var celsius = (data.currently.temperature-32)*(5/9);
         var c = celsius.toPrecision(2);
        $('#temperature').html(c + '° C');
      });
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  
    
  }


  //full weather details
  let appId = '71f6779186cc32448b4c412eea65b982';
let units = 'metric'; 
let searchMethod; // q means searching as a string.

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
    });
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('images/clear.jpg')";
            des = "Do Irrigation Rain may not be there";
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = "url('images/cloudy.jpg')";
            des = "Keep track of your Irrigation system";
            break;

        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = "url('images/rain.jpg')";
            des = "Its Raining out keep track of water levels in your Farm";
            break;

        case 'Mist':
            document.body.style.backgroundImage = "url('images/mist.jpg')";
            des = " more possibilities of pest attacks due to mist visit your crops";
            break;    
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('images/storm.jpg')";
            des = "Possibility of storm clear irrigation paths and stay safe";
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = "url('images/snow.jpg')";
            des = "its cold out there Stay warm and visit crops";
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let idea = document.getElementById('idea');

    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
    windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' meter/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels: ' + resultFromServer.main.humidity +  '%';
    idea.innerHTML = des;
    

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm)
        preventDefault();
    
});

$('#goback').click(function(){
   location.replace("index.html");
})

//ajax for location details not used so far
$.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
      $('#country').html(location.country_name);
      $('#state').html(location.state);
      $('#city').html(location.city);
      $('#town').html(location.town);
      $('#latitude').html(location.latitude);
      $('#longitude').html(location.longitude);
    }
  });
  
  