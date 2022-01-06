function getData(place) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b4cb66d12dd3678944954c55ddafe2d8`, {mode: 'cors'})
    .then(response => response.json())
    .then(function(data){
        console.log(data)
    })
    .catch(function(err){
        console.log(err)
    })
}

