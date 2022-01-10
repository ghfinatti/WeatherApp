const tempData = document.querySelector('.tempdata');
const cityName = document.querySelector('.cityname');
const humidityData = document.querySelector('.humiditydata');
const windData = document.querySelector('.winddata');
const main = document.querySelector('main');
const searchBtn = document.querySelector('.arrowicon');
const searchBar = document.querySelector('.searchbar');

function getData(place, units) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=${units}&appid=b4cb66d12dd3678944954c55ddafe2d8`, {mode: 'cors'})
    .then(response => response.json())
    .then(function(data){
        if(data.cod == "404"){
            alert("City name not found.")
        }else{
            changeDom(data.name, data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].main)
        }
        console.log(data)
    })
    .catch(function(err){
        console.log(err)
    })
}

function changeDom(name, temp, humidity, wind, weather){
    cityName.textContent = `${name}`;
    tempData.textContent = `${Math.round(temp)} ºC`;
    humidityData.textContent = `${humidity}%`;
    windData.textContent = `${wind} km/h`;

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
    getData(searchBar.value,"metric");
}

getData("London","metric")

searchBtn.addEventListener('click', searchBtnClick)

searchBar.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      searchBtn.click();
    }
});