<template>
  <div class="radar-container">
    <iframe :src="getRadarUrl(airport.icao)" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 定义 props
const props = defineProps({
  airport: {
    type: Object,
    required: true,
  },
});

// 方法
const getRadarUrl = (code) => {
  return `https://globe.adsbexchange.com/?airport=${code.toUpperCase()}&hideSidebar&hideButtons&zoom=10`;
};
</script>

<style scoped>
.radar-container {
  width: 100%;
  /* 根据需要调整宽度 */
  height: 100%;
  /* 根据需要调整高度 */
}
</style>