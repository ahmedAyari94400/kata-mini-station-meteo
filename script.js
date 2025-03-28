// A toi de jouer pour cette partie :-) Happy coding !

const cityInput = document.getElementById('cityInput');
const button = document.querySelector("button")
const city = document.getElementById("city");
const coordonates = document.getElementById("gps");

async function getNameCity(cityInput) {
    let response = await fetch("https://nominatim.openstreetmap.org/search?q=" +cityInput +"&format=json&addressdetails=1&limit=1");
    let data = await response.json(); 
    let lat = document.createElement("p");
    let lon = document.createElement("p");
    coordonates.appendChild(lat);
    coordonates.appendChild(lon)
    city.innerText = data[0].name;
    coordonates.innerText = "Coordonées GPS : " +  data[0].lat + ", " +data[0].lon;
    
    return data;
    
}

 async function getTemp(data) {
    let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude="+ data[0].lat +"&longitude="+data[0].lon +"&current=temperature_2m,precipitation,relative_humidity_2m");
     let dataMeteo = await response.json();
     console.log(dataMeteo.current.temperature_2m)
     let temp = document.getElementById("temperature");
     temp.innerText = dataMeteo.current.temperature_2m +"°C";



    
}
button.addEventListener("click",  async () => {
    let data = await getNameCity(cityInput.value);
    getTemp(data);
})

