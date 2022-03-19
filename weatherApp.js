// Current weather for current coordinates

window.addEventListener('load', () => {
    var longtitude;
    var latitude;
    var APIkey = 'deed5ac6eb4b1794e9b2c0f0d9380fdc';
    var temperatureDescription = document.querySelector('.temperature-description');
    var temperatureDegree = document.querySelector('.temperature-degree');
    var locationCity = document.querySelector('.location-city');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longtitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const coordinatesApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${APIkey}&units=metric`;
            fetch(coordinatesApi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    temperature = data.main.temp;
                    weatherDescription = data.weather[0].description;
                    city = data.name;
                    // išsiunčiu miestą pagal kooridinates 5 dienų prognozės funkcijai
                    fetchWeatherForecast(city);
                    icon = data.weather[0].icon;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = weatherDescription;
                    locationCity.textContent = city;
                    document.getElementById("iconImg").innerHTML = `<img id="weatherIcon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
                });
        });
    }

});

// Current weather for chosen city

function fetchWeather(cityName) {
    APIkey = 'deed5ac6eb4b1794e9b2c0f0d9380fdc'
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + this.APIkey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
};

function displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;
    document.querySelector('.location-city').innerText = name;
    document.getElementById("iconImg").innerHTML = `<img id="weatherIcon" src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
    document.querySelector('.temperature-description').innerText = description;
    document.querySelector('.temperature-degree').innerText = temp;
}

function search() {
    this.fetchWeather(document.querySelector(".search-bar").value);
}

document.querySelector(".search-button").addEventListener("click", function() {
    search();
})
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        search();
    }
});

// Weather forecast for chosen city

function fetchWeatherForecast(cityName) {
    APIkey = 'deed5ac6eb4b1794e9b2c0f0d9380fdc'
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + this.APIkey)
        .then((response) => response.json())
        .then((data) => this.displayWeatherForecast(data))

};

function displayWeatherForecast(data) {
    console.log(data);
    const { icon, description } = data.list[8].weather[0];
    // Icons iš api
    const icon8 = data.list[8].weather[0].icon;
    const icon16 = data.list[16].weather[0].icon;
    const icon24 = data.list[24].weather[0].icon;
    const icon32 = data.list[32].weather[0].icon;
    const icon39 = data.list[39].weather[0].icon;
    document.getElementById("forecast-icon8").innerHTML = `<img id="weatherIcon" src="http://openweathermap.org/img/wn/${icon8}@2x.png">`;
    document.getElementById("forecast-icon16").innerHTML = `<img id="weatherIcon" src="http://openweathermap.org/img/wn/${icon16}@2x.png">`;
    document.getElementById("forecast-icon24").innerHTML = `<img id="weatherIcon" src="http://openweathermap.org/img/wn/${icon24}@2x.png">`;
    document.getElementById("forecast-icon32").innerHTML = `<img id="weatherIcon" src="http://openweathermap.org/img/wn/${icon32}@2x.png">`;
    document.getElementById("forecast-icon39").innerHTML = `<img id="weatherIcon" src="http://openweathermap.org/img/wn/${icon39}@2x.png">`;
    // Ateinančių dienų temperatūra iš api
    const temp8 = data.list[8].main.temp + " C";
    const temp16 = data.list[16].main.temp + " C";
    const temp24 = data.list[24].main.temp + " C";
    const temp32 = data.list[32].main.temp + " C";
    const temp39 = data.list[39].main.temp + " C";
    document.querySelector('.forecast-temp8').innerText = temp8;
    document.querySelector('.forecast-temp16').innerText = temp16;
    document.querySelector('.forecast-temp24').innerText = temp24;
    document.querySelector('.forecast-temp32').innerText = temp32;
    document.querySelector('.forecast-temp39').innerText = temp39;
}

function searchForecast() {
    this.fetchWeatherForecast(document.querySelector(".search-bar").value);
}

document.querySelector(".search-button").addEventListener("click", function() {
    searchForecast();
})
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        searchForecast();
    }
});

// Ateinančios penkios dienos
var d = new Date();
var day = d.getDate();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];

function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}

for (i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

document.getElementById("day1").innerHTML = weekday[CheckDay(1)];
document.getElementById("day2").innerHTML = weekday[CheckDay(2)];
document.getElementById("day3").innerHTML = weekday[CheckDay(3)];
document.getElementById("day4").innerHTML = weekday[CheckDay(4)];
document.getElementById("day5").innerHTML = weekday[CheckDay(5)];

// default miestas
fetchWeather("north pole")
fetchWeatherForecast("north pole")