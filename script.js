const tempData = document.querySelector('.tempdata');
const cityName = document.querySelector('.cityname');
const humidityData = document.querySelector('.humiditydata');
const windData = document.querySelector('.winddata');
const main = document.querySelector('main');
const searchBtn = document.querySelector('.arrowicon');
const searchBar = document.querySelector('.searchbar');
const unitsBtn = document.querySelector('.unitsbtn');


async function getData(place, units) {
    await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=${units}&appid=b4cb66d12dd3678944954c55ddafe2d8`, {mode: 'cors'})
    .then(response => response.json())
    .then(function(data){
        if(data.cod == "404"){
            alert("City name not found.")
        }else{
            changeDom(data.name, data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].main,unitsBtn.dataset.unit)
        }
    })
    .catch(function(err){
        console.log(err)
    })
}

function changeDom(name, temp, humidity, wind, weather, unit){
    if (unit == "metric"){
        cityName.textContent = `${name}`;
        tempData.textContent = `${Math.round(temp)}ºC`;
        humidityData.textContent = `${humidity}%`;
        windData.textContent = `${wind} m/s`;
    };
    if (unit == "imperial"){
        cityName.textContent = `${name}`;
        tempData.textContent = `${Math.round(temp)}ºF`;
        humidityData.textContent = `${humidity}%`;
        windData.textContent = `${wind} mph`;
    };

    if (weather == "Rain"){
        main.style.backgroundImage = "url('images/rain.jpg')";
    }
    if (weather == "Clear"){
        main.style.backgroundImage = "url('images/sun.jpg')";
    }
    if (weather == "Snow"){
        main.style.backgroundImage = "url('images/snow.jpg')";
    }
    if (weather == "Clouds"){
        main.style.backgroundImage = "url('images/clouds.jpg')";
    }
}

function searchBtnClick(){
    if (searchBar.value == ""){
        alert("Please choose a city name.");
    }else{
        const currentUnitType = unitsBtn.dataset.unit
        getData(searchBar.value, currentUnitType);
    };
}

function changeUnit() {
    if (unitsBtn.dataset.unit == "metric"){
        unitsBtn.textContent = "Units: Imperial";
        unitsBtn.dataset.unit = "imperial";
        getData(cityName.textContent,"imperial");
    }else{
        unitsBtn.textContent = "Units: Metric";
        unitsBtn.dataset.unit = "metric";
        getData(cityName.textContent,"metric");
    }
}

searchBtn.addEventListener('click', searchBtnClick)
searchBar.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      searchBtn.click();
    }
});
unitsBtn.addEventListener('click', changeUnit);

getData("London", "metric")