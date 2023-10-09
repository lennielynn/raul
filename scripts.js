const cityTable = document.getElementById('weather-table')
const inputform = document.getElementById('weatherform');
const zipcode = document.getElementById('zip-code')
const city =document.getElementById('City')
const forecast = document.getElementById('forecast');
const degrees = document.getElementById('degrees','#176');
const time = document.getElementById('currentTime');
const date = document.getElementById('date');
const currentweatherinfo = document.querySelector('#weatherform')
const changeBackground = document.querySelector('#changeBackground')
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
newdate = month + "/" + day + "/" + year;
console.log(dateObj)




currentweatherinfo.addEventListener('submit',async (e)=>{
  e.preventDefault();
  const zip = zipcode.value
  const weatherData = await weatherApiCall(zip)
  updateWeatherInfo(weatherData)
  changeBackgroundImg(await weatherData)
})



async function weatherApiCall(zip) {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${apikey}`)
    if (res.ok) {
      const data =  await res.json()
      return data

          } else window.alert('Invalid Zipcode')
        }

function updateWeatherInfo(weatherData) {
  city.innerText = weatherData.name
  forecast.innerText =weatherData.weather[0].description
  degrees.innerText = weatherData.main.temp + "°F"
  time.innerText= formatAMPM(new Date())
  date.innerText=newdate
}

        

function formatAMPM(date) { ///////found this code block on google
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
console.log(formatAMPM(new Date))

const card = document.querySelector('#card')
  card.style.backgroundImage = "url('./images/clear.jpg')";

function changeBackgroundImg(weatherData){  
  console.log(weatherData.weather[0].main)
    if (weatherData.weather[0].main === 'Rain'){
      card.style.backgroundImage = "url('./images/rain.jpg')";

    } else if (weatherData.weather[0].main === 'Clouds'){
      card.style.backgroundImage = "url('./images/lightclouds.jpg')";

    } else if (weatherData.weather[0].main === 'Snow'){
      card.style.backgroundImage = "url('./images/snow.jpg')"

    } else if (weatherData.weather[0].main === 'Clear'){
      card.style.backgroundImage = "url('./images/clear.jpg')";}  
}




