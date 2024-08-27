<!-- frontend/src/components/WeatherForm.vue -->
<template>
  <div>
      <form @submit.prevent="submitForm">
          <input v-model="country" type="text" placeholder="Digite o nome do país" required />
          <input type="submit" value="Buscar Clima" />
      </form>
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <div v-if="weatherData">
          <h2>Clima em {{ weatherData.location }}</h2>
          <p><strong>Descrição:</strong> {{ weatherData.weather }}</p>
          <p><strong>Temperatura:</strong> {{ weatherData.temperature }}°C</p>
          <p><strong>Sensação Térmica:</strong> {{ weatherData.feels_like }}°C</p>
          <p><strong>Umidade:</strong> {{ weatherData.humidity }}%</p>
          <p><strong>Pressão:</strong> {{ weatherData.pressure }} hPa</p>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface WeatherData {
  location: string;
  weather: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

export default defineComponent({
  setup() {
      const country = ref<string>('');
      const weatherData = ref<WeatherData | null>(null);
      const errorMessage = ref<string>('');

      const submitForm = async () => {
          try {
              const response = await fetch('/api/weather', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ country: country.value }),
              });

              const data = await response.json();

              if (response.ok) {
                  weatherData.value = data;
                  errorMessage.value = '';
              } else {
                  errorMessage.value = data.error;
                  weatherData.value = null;
              }
          } catch (error: any) {
              errorMessage.value = `Ocorreu um erro: ${error.message}`;
              weatherData.value = null;
          }
      };

      return {
          country,
          weatherData,
          errorMessage,
          submitForm
      };
  }
});
</script>
