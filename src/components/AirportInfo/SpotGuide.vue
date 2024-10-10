<template>
  <div class="flex-container">
    <iframe
      :src="getUrl(airport)"
      width="100%"
      height="100%"
      frameborder="0"
      allowfullscreen
      sandbox="allow-same-origin allow-forms allow-scripts"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  airport: {
    type: Object,
    required: true,
  },
});


const getUrl = (airport) => {
  return `https://www.spotterguide.net/?s=${airport.icao}+${airport.iata}`;
}; 

</script>



<style>
.flex-container {
  display: flex;
  width: 100%;
  height: 100%; /* 或其他根据需求的高度 */
}

.flex-container iframe {
  flex: 1; /* 使 iframe 自适应填满父容器 */
  border: none; /* 去掉边框 */
}
</style>
