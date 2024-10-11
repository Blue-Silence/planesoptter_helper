<template>
  <div :style="{ height: '100%' }">
    <el-card :style="{ height: '100%' }" :body-style="{ height: '100%' }" class="weather_card">
      <h2 :style="{ height: '5%' }">24-Hour Weather Forecast</h2>
      <el-scrollbar :style="{ height: '60%' }" class="scroll-container">
        <p v-for="w in hourlyForecast" class="scrollbar-item">
          <WeatherCard :weather="w" />
        </p>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, inject } from 'vue';
import axios from 'axios';
import 'qweather-icons/font/qweather-icons.css'; // Import QWeather icons

const api_keys = inject('api_keys');
import WeatherCard from '@/components/Shared/WeatherCard.vue';

const hourlyForecast = ref([]);
const props = defineProps({
  coordinate: {
    type: Object,
    required: true
  },
  useDemoData: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['send-weather']);


const fetchWeatherData = async () => {
  const location = props.useDemoData ? '116.41,39.92' : // Example coordinates (Beijing) 
    `${props.coordinate[1].toFixed(2)},${props.coordinate[0].toFixed(2)}`; // Coordinate
  console.log("We are using coordinate:", location);
  const apiKey = api_keys.value["devapi.qweather.com"]; // Replace with your QWeather API Key
  const url = `https://devapi.qweather.com/v7/grid-weather/24h?lang=en&location=${location}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.code === '200') {
      hourlyForecast.value = response.data.hourly;
      emit('send-weather', hourlyForecast.value);
      console.log("Send weather!")
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

onMounted(() => {
  fetchWeatherData();
});

watch(props, () => fetchWeatherData());

</script>

<style scoped>
.weather_card :deep(.el-card__body) {
  height: 100%;
}

.weather-icon {
  font-size: 24px;
  display: block;
  text-align: center;
}


.scrollbar-item {
  margin: 0;
  /* 消除外边距 */
  padding: 0px;
  /* 设置内边距 */
  border: 1px solid #ccc;
  /* 可选：为了可视化项目边界 */
}
</style>