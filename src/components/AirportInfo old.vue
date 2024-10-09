<template>
    <el-container>
        <el-aside width="200px">
            <el-menu default-active="1" @select="(v)=>{current_page = v}" class="menu" style="height: 100%">
                <el-menu-item index="1">
                    <el-icon><icon-menu /></el-icon>
                    <span>Gereral</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon><icon-menu /></el-icon>
                    <span>Map</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon><icon-menu /></el-icon>
                    <span>Weather</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon><icon-menu /></el-icon>
                    <span>Flight Schedule</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <el-icon><icon-menu /></el-icon>
                    <span>Spot Guide</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main :style="{ height: '9000%' }">
            <div v-show="current_page==1">
                <AirportDetails v-if="airportCode" :airportCode="airportCode" @send-airport-detail="update_airport_info"/>
            </div>
            <div v-show="current_page==2">
                <Map v-if="airport_info && hourlyWeather" :airport="airport_info" />
            </div>
            <div v-show="current_page==3">
                <!-- <SunInfo v-if="airport_info" :coordinates="coordinate" /> -->
                <!-- <Weather v-if="airport_info" :coordinate="coordinate" /> -->
                <WeatherSun v-if="airport_info" :coordinate="coordinate" @send-weather="update_weather" :use-demo-data="false"/>
            </div>
            <div v-show="current_page==4">
                <FlightData v-if="airport_info && hourlyWeather" :icaoCode="airport_info.icao" :coordinate="coordinate" :hourlyWeather="hourlyWeather" :use-demo-data="true" />
            </div>
            <div v-show="current_page==5">
                <SpotGuide v-if="airport_info" :airport="airport_info" />
            </div>
        </el-main>
    </el-container>

</template>

<script setup>
import { computed, defineProps, ref, watch, useTemplateRef } from 'vue';
//import PlaceholderBoxes from './deprecated/PlaceholderBoxes.vue';
import AirportDetails from './AirportDetails.vue';
import FlightData from './FlightData.vue';
import SpotGuide from './SpotGuide.vue';
import WeatherSun from './WeatherSun.vue';
import Map from './Map.vue';

// 定义接收的 props
const props = defineProps({
  airportCode: {
    type: String,
    required: true,
  },
});

const current_page = ref(1);

const airport_info = ref(undefined)
const hourlyWeather = ref(undefined)

const coordinate = computed(()=>{
  return [airport_info.value.extraInfo.latitude_deg, airport_info.value.extraInfo.longitude_deg]
});

function update_airport_info(data) {
  airport_info.value = data;
  console.log("We get code:",airport_info.value.icao)
}

function update_weather(data) {
  hourlyWeather.value = data;
  console.log("We get weather:",hourlyWeather.value)
}

</script>


