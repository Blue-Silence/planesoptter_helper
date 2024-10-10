<template>
  <div>
    <h2>Track Map</h2>
    <iframe :src="getRadarUrl(airportCode)" width="100%" height="600vh" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  icao: {
    type: String,
    required: true,
  },
});

const getRadarUrl = (code) => {
  return `https://globe.adsbexchange.com/?icao=${props.icao.toUpperCase()}&hideSidebar&hideButtons&zoom=10`;
};
</script>