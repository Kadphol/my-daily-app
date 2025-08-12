<script lang="ts">
	import { onMount } from 'svelte'
	import { getWeatherAndAQI, getNextReminder } from '../libs/api'
	import { checkMedicineTakenToday, toggleMedicineTaken } from '../libs/storage'
	import { supabase } from '../libs/supabase-client'

	let weather = ''
	let aqi = ''
	let medicineTaken = false
	let nextReminder = ''
	let user = null

	async function signInWithGoogle() {
		const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
		if (error) console.error('Error signing in:', error)
	}

	async function signOut() {
		await supabase.auth.signOut()
		user = null
	}

	onMount(async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession()
		user = session?.user || null

		supabase.auth.onAuthStateChange((_event, session) => {
			user = session?.user || null
		})

		if (user) {
			const data = await getWeatherAndAQI()
			weather = data.weather
			aqi = data.aqi
			nextReminder = getNextReminder()
			medicineTaken = checkMedicineTakenToday()
		}
	})
</script>

<main class="p-4 space-y-6 min-h-screen bg-gradient-to-b from-blue-50 to-white">
	{#if !user}
		<section class="text-center mt-20">
			<h1 class="text-3xl font-bold mb-4">Welcome to MedTrack</h1>
			<button
				class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg"
				on:click={signInWithGoogle}
			>
				Sign in with Google
			</button>
		</section>
	{:else}
		<section class="text-center">
			<h1 class="text-3xl font-bold text-blue-600 mb-2">🌤️ Daily Checkup</h1>
			<div class="bg-white p-4 rounded-2xl shadow-md">
				<p class="text-lg"><strong>Weather:</strong> {weather}</p>
				<p class="text-lg"><strong>Air Quality:</strong> {aqi}</p>
				<p class="text-lg"><strong>Next Medicine Reminder:</strong> {nextReminder}</p>
			</div>
		</section>

		<section class="text-center">
			<h2 class="text-2xl font-semibold text-green-600 mb-2">💊 Medicine Tracker</h2>
			<div class="bg-white p-4 rounded-2xl shadow-md">
				<p class="text-lg mb-2">
					Medicine taken today? <strong>{medicineTaken ? '✅ Yes' : '❌ No'}</strong>
				</p>
				<button
					class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg"
					on:click={toggleMedicineTaken}
				>
					{medicineTaken ? 'Undo' : 'Mark as Taken'}
				</button>
			</div>
		</section>

		<section class="text-center">
			<button
				class="mt-6 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
				on:click={signOut}
			>
				Sign Out
			</button>
		</section>
	{/if}
</main>

<style>
	main {
		max-width: 100%;
		padding: 1rem;
		font-family: system-ui, sans-serif;
	}
</style>
