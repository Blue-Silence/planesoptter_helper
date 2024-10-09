<template>
  
    <el-tabs type="border-card" tabPosition="left">
      <el-tab-pane label="General">
        <AirportDetails v-if="airportCode" :airportCode="airportCode" @send-airport-detail="update_airport_info"/>
      </el-tab-pane>
      <el-tab-pane label="Flight">
        <RadarMap v-if="airportCode" :airportCode="airportCode" />
      </el-tab-pane>
      <el-tab-pane label="Weather">
        <SunInfo v-if="airport_info" :coordinates="coordinate"></SunInfo>
      </el-tab-pane>
      <el-tab-pane label="Flight Schedule">
        <FlightData v-if="airport_info" :icaoCode="airport_info.icao" :use-demo-data="true"/>
      </el-tab-pane>
      <el-tab-pane label="Task">
        <div class="info-container">
          <!-- <PlaceholderBoxes /> -->
        </div>
      </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';
//import PlaceholderBoxes from './deprecated/PlaceholderBoxes.vue';
import RadarMap from './RadarMap.vue';
import AirportDetails from './AirportDetails.vue';
import SunInfo from './SunInfo.vue';
import FlightData from './FlightData.vue';

// 定义接收的 props
const props = defineProps({
  airportCode: {
    type: String,
    required: true,
  },
});

const airport_info = ref(undefined)
const coordinate = computed(()=>{
  return [airport_info.value.extraInfo.latitude_deg, airport_info.value.extraInfo.longitude_deg]
});

function update_airport_info(data) {
  airport_info.value = data;
  console.log("We get code:",airport_info.value.icao)
}

</script>

<style scoped>
.info-container {
  display: flex;
  margin-top: 20px;
}
</style>
