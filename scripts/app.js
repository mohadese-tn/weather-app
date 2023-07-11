let $=document;
const apiKey="e89afb162c8971e33565e06051e9348a";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let searchInput=$.querySelector('.search-input');
let searchBtn=$.querySelector(".search-btn");
let weatherImage=$.querySelector('.weather-image');
let weather=$.querySelector(".weather");
let error=$.querySelector(".error");

  
// -------weather DATA API
async function Myweather(city){
    const response= await fetch(apiUrl +city+ `&apiKey=${apiKey}`);
    // manage error
    if (response.status==404){
        error.style.display="block";
        weather.style.display="none";
        setTimeout(()=> {
            error.classList.remove('visuallyhidden');
        }, 20);
        weather.classList="weather visuallyhidden";
    }else{
        weather.style.display="block";
        error.style.display="none";
        
        setTimeout(()=> {
            weather.classList.remove('visuallyhidden');
        }, 20);

        error.classList="error visuallyhidden";

    }
    // get data
    let data=await response.json();
    console.log(data);
    // change weather data
    $.querySelector('.weather-city').innerHTML=data.name;
    $.querySelector('.weather-temp').innerHTML=Math.round(data.main.temp)+"°C";
    $.querySelector('.weather-humidity').innerHTML=Math.round(data.main.humidity)+"%";
    $.querySelector('.weather-wind').innerHTML=Math.round(data.wind.speed)+" km/h";
    // change weather image
    if (data.weather[0].main=="Clear"){
        weatherImage.src='./images/clear.png';
    }
    else if (data.weather[0].main=="Clouds"){
        weatherImage.src='./images/clouds.png';
    }
    else if (data.weather[0].main=="Drizzle"){
        weatherImage.src='./images/drizzle.png';
    }
    else if (data.weather[0].main=="Mist"){
        weatherImage.src='./images/mist.png';
    }
    else if (data.weather[0].main=="Rain"){
        weatherImage.src='./images/rain.png';
    }
    else if (data.weather[0].main=="Snow"){
        weatherImage.src='./images/snow.png';
    }
    weather.style.display='block';
}

// --------Input Handler
// search btn
searchBtn.addEventListener('click',()=>{
    Myweather(searchInput.value);  
})
// enter 
searchInput.addEventListener('keydown',(event)=>{
    // console.log(event);
    if(event.keyCode=='13'){
        Myweather(searchInput.value);  
    }
})
