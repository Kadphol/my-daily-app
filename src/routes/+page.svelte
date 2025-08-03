<script lang="ts">
  import { onMount } from 'svelte';
  import { getWeatherAndAQI, getNextReminder } from '../lib/api';
  import { checkMedicineTakenToday, toggleMedicineTaken } from '../lib/storage';

  let weather = '';
  let aqi = '';
  let medicineTaken = false;
  let nextReminder = '';

  onMount(async () => {
    const data = await getWeatherAndAQI();
    weather = data.weather;
    aqi = data.aqi;
    nextReminder = getNextReminder();
    medicineTaken = checkMedicineTakenToday();
  });
</script>

<main class="p-4 space-y-6 min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
      <p class="text-lg mb-2">Medicine taken today? <strong>{medicineTaken ? '✅ Yes' : '❌ No'}</strong></p>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg" on:click={toggleMedicineTaken}>
        {medicineTaken ? 'Undo' : 'Mark as Taken'}
      </button>
    </div>
  </section>
</main>

<style>
  main {
    max-width: 100%;
    padding: 1rem;
    font-family: system-ui, sans-serif;
  }
</style>