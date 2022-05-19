const weatherForm = document.querySelector('[data-js="change-location"]')
const inputSearch = document.querySelector('[data-js="input-search"]')
const weatherCardContainer = document.querySelector('[data-js="city-card"]')
const weatherCardImage = document.querySelector('[data-js="time"]')
const iconContainer = document.querySelector('[data-js="time-icon"]')
const cityNameContainer = document.querySelector('[data-js="city-name"')
const weatherTextContainer = document.querySelector('[data-js="weather-condition"]')
const cityTemperature = document.querySelector('[data-js="city-temperature"]')

const showOrHideWeatherCard = () => {
  if(weatherCardContainer.classList.contains('d-none')){
    weatherCardContainer.classList.remove('d-none')
  }
}

const showCardImage = IsDayTime => {
  const weatherCardUrl = {
    true:'./src/day.svg',
    false: './src/night.svg'
  }
  weatherCardImage.src = weatherCardUrl[IsDayTime]
}

const showWeatherIcon = WeatherIcon => 
  iconContainer.innerHTML = `<img src="./src/icons/${WeatherIcon}.svg">`

const showCityName = LocalizedName => 
  cityNameContainer.textContent = LocalizedName

const showWeatherText = WeatherText => 
  weatherTextContainer.textContent = WeatherText
 
const showTemperature = Value =>  cityTemperature.textContent = Value

const showCityWeather = async event => {
  event.preventDefault()
  
  const inputValue = inputSearch.value.trim()
  if(!inputValue){
    alert('Digite o nome da cidade')
    weatherForm.reset()
    return
  }
 
  const [cityData] = await getCityData(inputValue)
  if(!cityData){
    alert('Cidade não encontrada')
    weatherForm.reset()
    return
  }
  
  const { Key, LocalizedName } = cityData
  const [cityWeatherData] = await getCityWeather(Key)
  
  const { 
    WeatherText, 
    Temperature: {Metric: {Value}}, 
    IsDayTime, 
    WeatherIcon } = cityWeatherData
    
    showOrHideWeatherCard()
    showCardImage(IsDayTime)
    showCityName(LocalizedName)
    showWeatherText(WeatherText)
    showWeatherIcon(WeatherIcon)
    showTemperature(Value)
  
  weatherForm.reset() 
}

weatherForm.addEventListener('submit', showCityWeather)
