<template>
  <div>
    <el-card>
      <h3>Weather and Solar Psition</h3>
      <el-row>
        <el-col :span="10">
          <WeatherCard v-if="props.flight_info.weather" :weather="props.flight_info.weather" :style="{height : '200px'}"/>
          <h3 v-else> Unavailable </h3>
        </el-col>
        <el-col :span="10">
          <div v-if="solar">
            <el-descriptions :column="1" border label-position="left" label-width="150px">
              <el-descriptions-item label="Solar Azimuth">
                {{ solar.azimuth }}
              </el-descriptions-item>

              <el-descriptions-item label="Solar Altitude">
                {{ solar.altitude }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <h3 v-else> Unavailable </h3>
        </el-col>
      </el-row>


    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  coordinate: {
    type: Object,
    required: true
  },
  flight_info: {
    type: Object,
    required: true
  }
});


import WeatherCard from '@/components/Shared/WeatherCard.vue';

import SunCalc from 'suncalc';
const solar = computed(() =>
  props.flight_info.related_local_time ?
    SunCalc.getPosition(new Date(props.flight_info.related_local_time), props.coordinate[0], props.coordinate[1])
    : null
);


</script>

<style scoped>
h3 {
  margin-bottom: 20px;
}
</style>