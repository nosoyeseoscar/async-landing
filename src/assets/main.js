const API = 'https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=la%20paz%2C%20mx&cnt=5&units=metric&lang=es'
var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
const baseDate = new Date()


/* Body Elements */
const cityLabel = null || document.getElementById('forecast-city')
const content = null || document.getElementById('content')

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '94e8e527b7msh5280cc180c1005dp1e0c76jsn525f57de0de3',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
    }
};

async function fetchData(urlAPI) {
    const response = await fetch(urlAPI, options)
    const data = await response.json()
    return data
}

(async () => {
    try {
        const forecast = await fetchData(API)
        const { city, list } = forecast
        cityLabel.innerText = `${city.name},${city.country}`
        let view = `
        ${list.map(day => {
            let currentDay = baseDate
            baseDate.setDate(baseDate.getDate() + 1)
            return `
                <div class="group relative">
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-lg text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            Para el ${currentDay.toLocaleDateString('es-MX', { weekday: 'long' })} 
                        </h3>
                    </div>
                    <div
                        class="w-full bg-orange-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:aspect-none p-3">
                        <h4>Temperatura Máxima: <strong>${day.temp.max}°C </strong></h4>
                        <h4>Se siente como: <strong>${day.feels_like.day}°C</strong></h4>
                        <h4>Clima: <strong>${day.weather[0].description}</strong></h4>
                    </div>
                </div>
                `
        }).slice(0, 4).join('')}
        `
        content.innerHTML = view
    } catch (error) {
        console.error(error)
    }
})()