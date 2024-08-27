<!-- frontend/src/views/Home.vue -->
<template>
    <div>
        <h1>Weather App</h1>
        <WeatherForm />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherForm from '../components/WeatherForm.vue';

export default defineComponent({
    components: {
        WeatherForm
    }
});
</script>
