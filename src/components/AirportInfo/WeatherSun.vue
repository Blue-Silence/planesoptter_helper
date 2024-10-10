<template>

  <div :style="{ height: '100%' }">
    <el-card :style="{ height: '100%' }">

      <el-row justify="space-evenly" :style="{ height: '100%' }">
        <el-col :span="7">
          <Weather :coordinate="props.coordinate" @send-weather="send_weather" :useDemoData="props.useDemoData" />
        </el-col>
        <el-col :span="15">
          <SunInfo :coordinate="props.coordinate" />
        </el-col>
      </el-row>

    </el-card>
  </div>


</template>

<script setup>

import SunInfo from './WeatherSun/SunInfo.vue';
import Weather from './WeatherSun/Weather.vue';

const props = defineProps({
  coordinate: {
    type: Object,
    required: true,
  },
  useDemoData: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['send-weather']);
function send_weather(data) {
  emit("send-weather", data);
  console.log("Send weather again:", data)
}

</script>