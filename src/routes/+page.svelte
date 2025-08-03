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

<main class="p-4 space-y-6">
  <h1 class="text-2xl font-bold">🌤️ Daily Checkup</h1>
  <div class="bg-gray-100 p-4 rounded-xl shadow">
    <p><strong>Weather:</strong> {weather}</p>
    <p><strong>Air Quality:</strong> {aqi}</p>
    <p><strong>Next Medicine Reminder:</strong> {nextReminder}</p>
  </div>

  <h2 class="text-xl font-semibold">💊 Medicine Tracker</h2>
  <div class="bg-green-100 p-4 rounded-xl shadow">
    <p>Medicine taken today? <strong>{medicineTaken ? '✅ Yes' : '❌ No'}</strong></p>
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={toggleMedicineTaken}>
      {medicineTaken ? 'Undo' : 'Mark as Taken'}
    </button>
  </div>
</main>

<style>
  main { max-width: 600px; margin: auto; }
</style>