const apiKey = 'lokaCHeJmtjclvf2Z9cAiXZNpp52hTX0'

const getCityUrl = cityname => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityname}&language=pt-br`
const getCityWeatherUrl = cityKey =>  `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&language=pt-br` 

const fetchData = async func => {
  try{
      const response = await fetch(func)
      if(!response.ok){
          throw new Error('Não foi possível obter os dados')
      } 
      
      return response.json()

  } catch ({name, message}){
      alert(`${ name}: ${message }`)
  }
}

const getCityData = cityName => fetchData(getCityUrl(cityName))
const getCityWeather = cityKey => fetchData(getCityWeatherUrl(cityKey))
      