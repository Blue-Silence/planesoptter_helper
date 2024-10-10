<template>
  <el-row>
    <el-col :span="24">
      <TrackMap v-if="props.flight_info.flight && props.flight_info.flight_status == 'active'"
        :icao="props.flight_info.flight.icao" />
      <h2 v-else>Flight status:{{ props.flight_info.flight_status }}</h2>
    </el-col>
  </el-row>
  <DetailTable :flight_info="props.flight_info" />
  <el-row>
    <el-col :span="24">
      <!-- <WeatherSun :coordinate="props.coordinate", :time="props.time" /> -->
      <WeatherSun :coordinate="props.coordinate" :flight_info="props.flight_info" />
    </el-col>
  </el-row>

</template>


<script setup>

import DetailTable from './FlightDetail/DetailTable.vue';
import TrackMap from './FlightDetail/TrackMap.vue';
import WeatherSun from './FlightDetail/WeatherSun.vue';

const props = defineProps({
  flight_info: {
    type: Object,
    required: true,
  },
  coordinate: {
    type: Object,
    required: true,
  },
});




</script>