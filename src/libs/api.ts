const AQI_API_KEY = import.meta.env.VITE_AQI_API_KEY

const UNIT: Unit = {
	//object containing units information
	p2: 'ugm3', //pm2.5
	p1: 'ugm3', //pm10
	o3: 'ppb', //Ozone O3
	n2: 'ppb', //Nitrogen dioxide NO2
	s2: 'ppb', //Sulfur dioxide SO2
	co: 'ppm', //Carbon monoxide CO
}

const MOCK_VALUE = {
	status: 'success',
	data: {
		city: 'Pathum Wan',
		state: 'Bangkok',
		country: 'Thailand',
		location: {
			type: 'Point',
			coordinates: [100.53649416504, 13.729830133162],
		},
		current: {
			pollution: {
				ts: '2025-08-12T16:00:00.000Z',
				aqius: 14,
				mainus: 'p2',
				aqicn: 4,
				maincn: 'p2',
			},
			weather: {
				ts: '2025-08-12T16:00:00.000Z',
				ic: '04n',
				hu: 82,
				pr: 1009,
				tp: 28,
				wd: 259,
				ws: 4.61,
				heat_index: 32,
			},
		},
	},
}

export async function getWeatherAndAQI() {
	try {
		// const aqiRes = await fetch(
		// 	`https://api.airvisual.com/v2/city?city=Pathum Wan&state=Bangkok&country=Thailand&key=${AQI_API_KEY}`
		// )
		// console.log(aqiRes)
		// const aqiData = await aqiRes.json()

		return { MOCK_VALUE }
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
