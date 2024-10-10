<template>
  <!-- <div :style="{ height: '90000%', backgroundColor: '#f0f0ff' }"> -->
  <el-tabs type="border-card" :style="{ height: '100%' }">
    <el-tab-pane label="Radar Map" :style="{ height: '100%' }">
      <RadarMap :airport="props.airport" />
    </el-tab-pane>
    <!-- <el-tab-pane label="Aeronautical Chart"> foo </el-tab-pane> -->
    <el-tab-pane label="Satelite" :style="{ height: '100%' }">
      <SatelliteMap v-if="coordinate" :coordinate="coordinate" />
    </el-tab-pane>
    <!-- <el-tab-pane label="Task">Task</el-tab-pane> -->
  </el-tabs>
  <!-- </div> -->
</template>


<script setup>
import { computed, defineProps } from 'vue';
import RadarMap from './Map/RadarMap.vue';
import SatelliteMap from './Map/SatelliteMap.vue';

const props = defineProps({
  airport: {
    type: Object,
    required: true,
  },
});

const coordinate = computed(() => {
  var r = {
    "lat": props.airport.extraInfo.latitude_deg,
    "lng": props.airport.extraInfo.longitude_deg,
  };
  console.log("Location chooses:", r);
  return r;
});

</script>


<style></style>
