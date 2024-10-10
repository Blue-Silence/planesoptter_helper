<template>
  <div class="info_container">
    <div v-show="props.current_page == 1">
      <AirportDetails v-if="airportCode" :airportCode="airportCode" @send-airport-detail="update_airport_info"
        style="height: '100%'" />
      <div v-else v-loading="true" style="height: '100%'"></div>
    </div>
    <div v-show="props.current_page == 2" v-loading="loading > 0">
      <Map v-if="airport_info && hourlyWeather" :airport="airport_info" />
    </div>
    <div v-show="props.current_page == 3" v-loading="loading > 0">
      <!-- <SunInfo v-if="airport_info" :coordinates="coordinate" /> -->
      <!-- <Weather v-if="airport_info" :coordinate="coordinate" /> -->
      <WeatherSun v-if="airport_info" :coordinate="coordinate" @send-weather="update_weather" :use-demo-data="false" />
    </div>
    <div v-show="props.current_page == 4" v-loading="loading > 0">
      <FlightData v-if="airport_info && hourlyWeather" :icaoCode="airport_info.icao" :coordinate="coordinate"
        :hourlyWeather="hourlyWeather" :use-demo-data="true" />
    </div>
    <div v-show="props.current_page == 5" v-loading="loading > 0">
      <SpotGuide v-if="airport_info" :airport="airport_info" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref, watch, useTemplateRef } from 'vue';
//import PlaceholderBoxes from './deprecated/PlaceholderBoxes.vue';
import AirportDetails from './AirportInfo/AirportDetails.vue';
import FlightData from './AirportInfo/FlightData.vue';
import SpotGuide from './AirportInfo/SpotGuide.vue';
import WeatherSun from './AirportInfo/WeatherSun.vue';
import Map from './AirportInfo/Map.vue';

// 定义接收的 props
const props = defineProps({
  airportCode: {
    type: String,
    required: true,
  },
  current_page: {
    type: Number,
    required: true,
  },
});

const airport_info = ref(undefined)
const hourlyWeather = ref(undefined)
const loading = ref(2)

const coordinate = computed(() => {
  return [airport_info.value.extraInfo.latitude_deg, airport_info.value.extraInfo.longitude_deg]
});

function update_airport_info(data) {
  airport_info.value = data;
  loading.value -= 1;
  console.log("AAA We get code:", airport_info.value.icao)
}

function update_weather(data) {
  hourlyWeather.value = data;
  loading.value -= 1;
  console.log("We get weather:", hourlyWeather.value)
}

watch(() => props.airportCode, () => {
  console.log("AAA We Get it! Clear!");
  loading.value = 2;
});

</script>

<style>
.info_container>* {
  height: 100%
}
</style>
