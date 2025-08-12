interface AQIResponse {
	data: AQIData
	status: string
}

interface AQIData {
	city: string // 'Pathum Wan'
	state: string // 'Bangkok'
	country: string // 'Thailand'
	location: {
		type: 'Point'
		coordinates: Array<number>
	}
	current: {
		pollution: PollutionData
		weather: WeatherData
	}
}

type Unit = {
	p2: string //pm2.5
	p1: string //pm10
	o3: string //Ozone O3
	n2: string //Nitrogen dioxide NO2
	s2: string //Sulfur dioxide SO2
	co: string //Carbon monoxide CO
}

interface PollutionData {
	ts: string // timestamp
	aqius: number // AQI value based on US EPA standard
	mainus: keyof Unit // main pollutant for US AQI
	aqicn: number // AQI value based on China MEP standard
	maincn: keyof Unit // main pollutant for China AQI
}

interface WeatherData {
	ts: string // timestamp
	ic: string // weather icon code
	hu: number // humidity percentage
	pr: number // atmospheric pressure in hPa
	tp: number // temperature in Celsius
	wd: number // wind direction, as an angle of 360° (N=0, E=90, S=180, W=270)
	ws: number // wind speed (m/s)
	heat_index: number //apparent temperature in Celsius, calculated from temperature and relative humidity,
}
