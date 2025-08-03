export function checkMedicineTakenToday(): boolean {
	const today = new Date().toISOString().split('T')[0]
	return localStorage.getItem('medicine_' + today) === 'yes'
}

export function toggleMedicineTaken() {
	const today = new Date().toISOString().split('T')[0]
	const key = 'medicine_' + today
	if (localStorage.getItem(key) === 'yes') {
		localStorage.removeItem(key)
	} else {
		localStorage.setItem(key, 'yes')
	}
	location.reload()
}
