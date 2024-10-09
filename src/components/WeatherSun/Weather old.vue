<template>
    <el-scrollbar height="400px">
      <p v-for="w in hourlyForecast" class="scrollbar-demo-item"> <WeatherCard :weather="w" /></p>
    </el-scrollbar>

    <div>
      <el-card>
        <h3>24-Hour Weather Forecast</h3>
        <el-table :data="hourlyForecast" height="600" style="width: 100%" fixed="true">
          <el-table-column prop="fxTime" label="Time" width="100%">
            <template v-slot="scope">
              <span>{{ formatTime(scope.row.fxTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Icon" width="100%">
            <template v-slot="scope">
                <i :class="`qi-${scope.row.icon}`" class="weather-icon"></i>
            </template>
          </el-table-column>
          <el-table-column prop="text" label="Condition" width="100%" />
          <el-table-column prop="windDir" label="Wind Direction" width="100%" />
        </el-table>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import 'qweather-icons/font/qweather-icons.css'; // Import QWeather icons
  
  import api_keys from '@/assets/api_keys.json';
import WeatherCard from '../Shared/WeatherCard.vue';
  
  const hourlyForecast = ref([]);
  const props = defineProps({
    coordinate: {
        type: Object,
        required: true
    }
    });
  
  const fetchWeatherData = async () => {
    const location = '116.41,39.92'; // Example coordinates (Beijing)
    const apiKey = api_keys["devapi.qweather.com"]; // Replace with your QWeather API Key
    //const location = `${props.coordinate[0].toFixed(2)},${props.coordinate[1].toFixed(2)}`; // Coordinate
    const url = `https://devapi.qweather.com/v7/grid-weather/24h?lang=en&location=${location}&key=${apiKey}`;
    
    try {
      const response = await axios.get(url);
      if (response.data.code === '200') {
        hourlyForecast.value = response.data.hourly;
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  const formatTime = (time) => {
    const date = new Date(time);
    //return date.toLocaleString();
    const month = date.getMonth() + 1;  // Months are zero-indexed in JS
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    return `${month}/${day} ${hour}:${minutes}`;
  };
  
  onMounted(() => {
    fetchWeatherData();
  });

  watch(props, ()=>fetchWeatherData());

  </script>
  
  <style scoped>
  .weather-icon {
    font-size: 24px;
    display: block;
    text-align: center;
  }
  </style>