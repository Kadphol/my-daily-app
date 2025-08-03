const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'
const AQI_API_KEY = 'YOUR_IQAIR_API_KEY'

export async function getWeatherAndAQI() {
	try {
		const lat = 13.7563 // Example: Bangkok
		const lon = 100.5018

		const weatherRes = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
		)
		const weatherData = await weatherRes.json()
		const weather = `${weatherData.weather[0].description}, ${weatherData.main.temp}°C`

		const aqiRes = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${AQI_API_KEY}`)
		const aqiData = await aqiRes.json()
		const aqi = `AQI ${aqiData.data.aqi} (${aqiData.data.dominentpol.toUpperCase()})`

		return { weather, aqi }
	} catch (e) {
		console.error('API fetch error:', e)
		return {
			weather: 'Unavailable',
			aqi: 'Unavailable',
		}
	}
}
export function getNextReminder() {
	return 'Between 8:00 PM – 10:00 PM'
}
