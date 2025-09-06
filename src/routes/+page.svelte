<script>
	let { data } = $props()
	let { colors } = $derived(data)
</script>

<main class="p-4 space-y-6 min-h-screen bg-gradient-to-b from-blue-50 to-white">
	<h1>Welcome to Supabase!</h1>
	<ul>
		{#each colors as color (color)}
			<li>{color.name}</li>
		{/each}
	</ul>
	<!-- {#if !user}
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
	{/if} -->
</main>

<style>
	main {
		max-width: 100%;
		padding: 1rem;
		font-family: system-ui, sans-serif;
	}
</style>
